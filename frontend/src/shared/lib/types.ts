export interface WithPagination<T> {
	data: T;
	page: number;
	pageSize: number;
	totalPages: number;
	totalElements: number;
}
