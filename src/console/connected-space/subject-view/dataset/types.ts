import { DataSetPage } from '../../../../services/console/dataset';
import { SubjectDataSetColumn } from '../../../../services/tuples/subject-types';

export enum ColumnSortBy {
	NONE = 'none',
	ASC = 'asc',
	DESC = 'desc'
}

export interface ColumnDef {
	fixed: boolean;
	width: number;
	index: number;
}

export interface DataColumnDef extends ColumnDef {
	name: string;
	column: SubjectDataSetColumn;
	sort: ColumnSortBy;
}

export interface SequenceColumnDef extends ColumnDef {
}

export interface ColumnDefs {
	fixed: Array<DataColumnDef>;
	data: Array<DataColumnDef>;
}

export type SubjectDataPage = DataSetPage<Array<any>>;

export interface DataSetState extends SubjectDataPage {
	loaded: boolean;
	columnDefs: ColumnDefs;
}

