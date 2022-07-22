import {Good} from '@entities/good/model/types';
import {api} from '@shared/api';
import {useQuery} from '@tanstack/react-query';

export const useGoodsTable = () => {
	const {data, isLoading, isError} = useQuery<Good[]>(['goods'], () =>
		api.getGoods()
	);

	return {goods: data || [], isLoading, isError};
};
