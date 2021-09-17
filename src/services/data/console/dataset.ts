export interface DataSetPage<T> {
	data: Array<T>;
	itemCount: number;
	pageNumber: number;
	pageSize: number;
	pageCount: number;
}
