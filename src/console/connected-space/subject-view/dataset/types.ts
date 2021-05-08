import {DataSetPage} from '../../../../services/console/dataset';
import {SubjectDataSetColumn} from '../../../../services/tuples/subject-types';

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

export type SubjectDataPage = DataSetPage<Array<string | number | boolean | null | undefined>>;

export interface DataSetState extends SubjectDataPage {
	loaded: boolean;
	columnDefs: ColumnDefs;
}

export interface TableSelection {
	inFixTable: boolean;
	row: number;
	rowTop: number;
	rowHeight: number;

	column: number;
	columnLeft: number;
	columnWidth: number;
	columnHeight: number;

	verticalScroll: number;
	horizontalScroll: number;
}

export interface SelectionRef {
	selection: () => TableSelection;
}

export interface DragColumnState {
	left: number;
	height: number;
	startRowIndex: number;
	endRowIndex: number;
	firstRowOffsetY: number;
	movementX: number;
}

