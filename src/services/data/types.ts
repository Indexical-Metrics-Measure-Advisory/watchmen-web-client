export type RowOf<T> = Array<T>;
export type RowOfAny = RowOf<string | number | boolean | null | undefined>;

export interface Page<T extends any> {
	data: Array<T>;
	itemCount: number;
	pageNumber: number;
	pageSize: number;
	pageCount: number;
}

export type DateTime = string;
export type Token = string;