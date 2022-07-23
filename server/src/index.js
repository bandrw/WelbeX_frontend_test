const express = require('express');
const cors = require('cors');

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
				? good[column].includes(value)
				: good[column] === value;
		}
		if (condition === 'less') return (good) => good[column] < value;
		if (condition === 'more') return (good) => good[column] > value;
};

const parseGoodsQuery = ({sortBy, filterBy}) => {
	if (sortBy !== undefined && !['name', 'count', 'distance'].includes(sortBy)) {
		return {isError: true, code: 400, msg: 'Invalid sort method'};
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

	return {isError: false, query: {sortBy, filterBy: parsedFilterBy}};
};

app.get('/goods', (req, res) => {
	let data = [
		{id: 0, date: 1658425002840, name: 'Wheat', count: 476, distance: 9512 },
		{id: 1, date: 1658425011393, name: 'Oat', count: 655, distance: 2703 },
		{id: 2, date: 1658425006253, name: 'Rice', count: 964, distance: 1070 },
		{id: 3, date: 1658425003833, name: 'Maize', count: 123, distance: 78 },
		{id: 4, date: 1658425011542, name: 'Corn', count: 498, distance: 2230 },
		{id: 5, date: 1658425011129, name: 'Packaged', count: 772, distance: 2320 },
		{id: 6, date: 1658425002763, name: 'Cereal', count: 470, distance: 9634 },
		{id: 7, date: 1658425009363, name: 'Beef', count: 145, distance: 6263 },
		{id: 8, date: 1658425010107, name: 'Yogurt', count: 426, distance: 1568 },
		{id: 9, date: 1658425007253, name: 'Berries', count: 634, distance: 1611 },
		{id: 10, date: 1658425009566, name: 'Beer', count: 140, distance: 404 },
		{id: 11, date: 1658425010448, name: 'Formula', count: 99, distance: 9992 },
		{id: 12, date: 1658425004734, name: 'Soybean', count: 832, distance: 6143 },
		{id: 13, date: 1658425011108, name: 'Beans', count: 557, distance: 9265 },
		{id: 14, date: 1658425011199, name: 'Potatoes', count: 695, distance: 451 },
		{id: 15, date: 1658425008896, name: 'Sorghum', count: 735, distance: 1220 },
		{id: 16, date: 1658425003559, name: 'Nuts', count: 882, distance: 346 },
		{id: 17, date: 1658425009286, name: 'Shellfish', count: 891, distance: 8223 },
		{id: 18, date: 1658425005205, name: 'Chocolate', count: 575, distance: 359 },
		{id: 19, date: 1658425002897, name: 'Apples', count: 183, distance: 6333 },
		{id: 20, date: 1658425003333, name: 'Cucumbers', count: 260, distance: 9377 },
		{id: 21, date: 1658425010409, name: 'Leaf', count: 679, distance: 883 },
		{id: 22, date: 1658425009021, name: 'Vegetables', count: 719, distance: 9545 },
	];

	const {isError, msg, code, query} = parseGoodsQuery(req.query);
	if (isError) {
		res.status(code);
		res.send({msg});
		return;
	}
	const {sortBy, filterBy} = query;

	if (filterBy !== undefined) {
		data = data.filter(getFilterGoodsMethod(filterBy));
	}
	if (sortBy !== undefined) {
		data.sort(sortGoodsMethods[sortBy]);
	}

	res.send(data);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
