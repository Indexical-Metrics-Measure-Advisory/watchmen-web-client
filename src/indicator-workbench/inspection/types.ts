export enum ColumnType {
	TEXT = 'text',
	NUMERIC = 'numeric',
	TIME = 'time'
}

export interface Column {
	name: string;
	type: ColumnType;
	width?: number;
}

export type Columns = Array<Column>;