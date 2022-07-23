import {Good} from '@entities/good/model/types';
import {api} from '@shared/api';
import {useQuery} from '@tanstack/react-query';
import {useCallback, useState} from 'react';

import {
	GoodsColumn,
	GoodsFilterCondition,
	GoodsFilterValue,
	GoodsTableFilter,
} from '../model/types';

export const useGoodsTable = () => {
	const [filterOptions, setFilterOptions] = useState<GoodsTableFilter>({
		column: null,
		condition: null,
		value: '',
	});

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

	const {data, isLoading, isError} = useQuery<Good[]>(
		['goods', filterOptions],
		() => api.getGoods({filterBy: filterOptions})
	);

	return {
		goods: data || [],
		isLoading,
		isError,
		onFilterColumnChange,
		onFilterConditionChange,
		onFilterValueChange,
		filterOptions,
	};
};
