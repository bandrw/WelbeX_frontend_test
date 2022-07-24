const express = require('express');
const cors = require('cors');
const {getGoods} = require('./db');

const app = express();
const port = 3000;

app.use(cors());

const sortGoodsMethods = {
	name: (a, b) => a.name > b.name ? 1 : -1,
	count: (a, b) => a.count - b.count,
	distance: (a, b) => a.distance - b.distance,
};

const getFilterGoodsMethod = ({column, condition, value}) => {
		if (condition === 'equal') return (good) => good[column] === value;
		if (condition === 'contains') {
			return (good) => typeof value === 'string' && typeof good[column] === 'string'
				? good[column].trim().toLowerCase().includes(value.trim().toLowerCase())
				: good[column] === value;
		}
		if (condition === 'less') return (good) => good[column] < value;
		if (condition === 'more') return (good) => good[column] > value;
};

const parseGoodsQuery = ({sortBy, reverseSort, filterBy, page, pageSize}) => {
	if (sortBy !== undefined && !['name', 'count', 'distance'].includes(sortBy)) {
		return {isError: true, code: 400, msg: 'Invalid sort method'};
	}
	if (reverseSort !== undefined && !['true', 'false'].includes(reverseSort)) {
		return {isError: true, code: 400, msg: 'Invalid reverseSort value'};
	}

	let parsedFilterBy;
	try {
		if (filterBy !== undefined) {
			parsedFilterBy = JSON.parse(filterBy);
			if (
				!['name', 'count', 'distance'].includes(parsedFilterBy.column) ||
				!['equal', 'contains', 'less', 'more'].includes(parsedFilterBy.condition) ||
				parsedFilterBy.value === undefined ||
				!['string', 'number'].includes(typeof parsedFilterBy.value)
			) {
				return {isError: true, code: 400, msg: 'Invalid filterBy'};
			}
		}
	} catch {
		return {isError: true, code: 400, msg: 'Invalid filterBy'};
	}

	let parsedPage;
	let parsedPageSize;

	if (page !== undefined) {
		parsedPage = Number(page);
		if (isNaN(parsedPage) || parsedPage <= 0)
			return {isError: true, code: 400, msg: 'Invalid page'};
	}
	if (pageSize !== undefined) {
		parsedPageSize = Number(pageSize);
		if (isNaN(parsedPageSize) || parsedPageSize <= 0)
			return {isError: true, code: 400, msg: 'Invalid pageSize'};
	}

	return {
		isError: false,
		query: {
			sortBy,
			reverseSort: reverseSort === 'true',
			filterBy: parsedFilterBy,
			page: parsedPage,
			pageSize: parsedPageSize,
		},
	};
};

app.get('/goods', async (req, res) => {
	let data;

	try {
		data = await getGoods();
	} catch (e) {
		res.status(500);
		res.send({msg: String(e)});
		return;
	}

	const {isError, msg, code, query} = parseGoodsQuery(req.query);
	if (isError) {
		res.status(code);
		res.send({msg});
		return;
	}
	const {sortBy, reverseSort, filterBy, page = 1, pageSize = 10} = query;

	if (filterBy !== undefined) {
		data = data.filter(getFilterGoodsMethod(filterBy));
	}
	if (sortBy !== undefined) {
		if (reverseSort) {
			data.sort((a, b) => sortGoodsMethods[sortBy](b, a));
		} else {
			data.sort(sortGoodsMethods[sortBy]);
		}
	}

	const pagedData = data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

	res.send({
		data: pagedData,
		page,
		pageSize: pagedData.length,
		totalPages: Math.floor(data.length / pageSize) + (data.length % 10 !== 0 ? 1 : 0),
		totalElements: data.length,
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
