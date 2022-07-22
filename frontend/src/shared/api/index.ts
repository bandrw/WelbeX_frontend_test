import {Good} from '@entities/good/model/types';
import axios, {AxiosInstance, AxiosResponse} from 'axios';

class Api {
	private readonly apiInstance: AxiosInstance;

	constructor() {
		this.apiInstance = axios.create({
			baseURL: 'http://localhost:3000',
		});
	}

	private async get<R>(url: string) {
		const {data} = await this.apiInstance.get<never, AxiosResponse<R>>(url);
		return data;
	}

	async getGoods(): Promise<Good[]> {
		return this.get<Good[]>('/goods');
	}
}

export const api = new Api();
