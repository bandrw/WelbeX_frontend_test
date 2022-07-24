import {Good} from '@entities/good/model/types';
import {
	GoodsSortMethod,
	GoodsTableFilter,
} from '@features/goods-table/model/types';
import {WithPagination} from '@shared/lib/types';
import axios, {AxiosInstance, AxiosResponse} from 'axios';

interface GetGoodsOptions {
	filterBy?: GoodsTableFilter;
	sortBy?: GoodsSortMethod;
	page?: number;
	pageSize?: number;
	reverseSort?: boolean;
}

class Api {
	private readonly apiInstance: AxiosInstance;

	constructor() {
		this.apiInstance = axios.create({
			baseURL: '/',
		});
	}

	private async get<R>(url: string, params?: Record<string, unknown>) {
		const {data} = await this.apiInstance.get<never, AxiosResponse<R>>(url, {
			params,
		});
		return data;
	}

	async getGoods(options?: GetGoodsOptions): Promise<WithPagination<Good[]>> {
		const filterBy =
			options !== undefined &&
			options.filterBy !== undefined &&
			options.filterBy.condition !== null &&
			options.filterBy.column !== null
				? JSON.stringify(options.filterBy)
				: undefined;

		return this.get<WithPagination<Good[]>>('/api/goods', {
			filterBy,
			sortBy: options?.sortBy,
			page: options?.page,
			pageSize: options?.pageSize,
			reverseSort: options?.reverseSort ? 'true' : undefined,
		});
	}
}

export const api = new Api();
