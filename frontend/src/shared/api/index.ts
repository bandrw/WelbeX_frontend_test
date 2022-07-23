import {Good} from '@entities/good/model/types';
import {GoodsTableFilter} from '@features/goods-table/model/types';
import axios, {AxiosInstance, AxiosResponse} from 'axios';

interface GetGoodsOptions {
	filterBy: GoodsTableFilter;
}

class Api {
	private readonly apiInstance: AxiosInstance;

	constructor() {
		this.apiInstance = axios.create({
			baseURL: 'http://localhost:3000',
		});
	}

	private async get<R>(url: string, params?: Record<string, unknown>) {
		const {data} = await this.apiInstance.get<never, AxiosResponse<R>>(url, {
			params,
		});
		return data;
	}

	async getGoods(options?: GetGoodsOptions): Promise<Good[]> {
		const filterBy =
			options !== undefined &&
			options.filterBy !== undefined &&
			options.filterBy.condition !== null &&
			options.filterBy.column !== null
				? options.filterBy
				: undefined;

		return this.get<Good[]>('/goods', {
			filterBy: JSON.stringify(filterBy),
		});
	}
}

export const api = new Api();
