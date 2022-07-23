import {Good} from '@entities/good/model/types';
import {api} from '@shared/api';
import {WithPagination} from '@shared/lib/types';
import {useQuery} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';

import {
	GoodsColumn,
	GoodsFilterCondition,
	GoodsFilterValue,
	GoodsSortMethod,
	GoodsTableFilter,
} from '../model/types';

export const useGoodsTable = () => {
	const [filterOptions, setFilterOptions] = useState<GoodsTableFilter>({
		column: null,
		condition: null,
		value: '',
	});

	const [sortMethod, setSortMethod] = useState<GoodsSortMethod>(null);

	const [paginationOptions, setPaginationOptions] = useState({
		page: 1,
		pageSize: 10,
	});

	const setPage = useCallback((page: number) => {
		setPaginationOptions((prevState) => ({
			...prevState,
			page,
		}));
	}, []);

	const setPageSize = useCallback((pageSize: number) => {
		setPaginationOptions((prevState) => ({...prevState, pageSize}));
	}, []);

	const onFilterColumnChange = useCallback((column: GoodsColumn) => {
		setFilterOptions((prevState) => ({
			...prevState,
			value:
				column === 'count' && typeof prevState.value === 'string'
					? Number(prevState.value)
					: prevState.value,
			column,
		}));
	}, []);

	const onFilterConditionChange = useCallback(
		(condition: GoodsFilterCondition) => {
			setFilterOptions((prevState) => ({
				...prevState,
				condition,
			}));
		},
		[]
	);

	const onFilterValueChange = useCallback((value: GoodsFilterValue) => {
		setFilterOptions((prevState) => ({
			...prevState,
			value,
		}));
	}, []);

	const onSortChange = useCallback((method: GoodsSortMethod) => {
		setSortMethod(method);
	}, []);

	const {data, isLoading, isError} = useQuery<WithPagination<Good[]>>(
		['goods', filterOptions, sortMethod, paginationOptions],
		() =>
			api.getGoods({
				filterBy: filterOptions,
				sortBy: sortMethod,
				page: paginationOptions.page,
				pageSize: paginationOptions.pageSize,
			})
	);

	useEffect(() => {
		if (data !== undefined && data.totalPages < paginationOptions.page)
			setPage(data.totalPages === 0 ? 1 : data.totalPages);
	}, [data, paginationOptions.page, setPage]);

	return {
		goods: data?.data || [],
		page: paginationOptions.page,
		pageSize: paginationOptions.pageSize,
		totalPages: data?.totalPages || 1,
		totalElements: data?.totalElements || 1,
		setPage,
		setPageSize,
		isLoading,
		isError,
		onFilterColumnChange,
		onFilterConditionChange,
		onFilterValueChange,
		filterOptions,
		sortMethod,
		onSortChange,
	};
};
