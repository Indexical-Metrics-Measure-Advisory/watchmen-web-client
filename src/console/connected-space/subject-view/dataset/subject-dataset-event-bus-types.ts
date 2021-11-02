import {ColumnDefs, DataPage} from '@/widgets/dataset-grid/types';

export enum SubjectDataSetEventTypes {
	COLUMN_DEFS_READY = 'column-defs-ready',

	ASK_COLUMN_DEFS = 'ask-column-defs',

	PAGE_LOADED = 'page-loaded',
	PAGE_CHANGE = 'page-change'
}

export interface SubjectDataSetEventBus {
	fire(type: SubjectDataSetEventTypes.COLUMN_DEFS_READY, columnDefs: ColumnDefs): this;
	on(type: SubjectDataSetEventTypes.COLUMN_DEFS_READY, listener: (columnDefs: ColumnDefs) => void): this;
	off(type: SubjectDataSetEventTypes.COLUMN_DEFS_READY, listener: (columnDefs: ColumnDefs) => void): this;

	fire(type: SubjectDataSetEventTypes.ASK_COLUMN_DEFS, onData: (columnDefs: ColumnDefs) => void): this;
	on(type: SubjectDataSetEventTypes.ASK_COLUMN_DEFS, listener: (onData: (columnDefs: ColumnDefs) => void) => void): this;
	off(type: SubjectDataSetEventTypes.ASK_COLUMN_DEFS, listener: (onData: (columnDefs: ColumnDefs) => void) => void): this;

	fire(type: SubjectDataSetEventTypes.PAGE_LOADED, page: DataPage, columnDefs: ColumnDefs): this;
	on(type: SubjectDataSetEventTypes.PAGE_LOADED, listener: (page: DataPage, columnDefs: ColumnDefs) => void): this;
	off(type: SubjectDataSetEventTypes.PAGE_LOADED, listener: (page: DataPage, columnDefs: ColumnDefs) => void): this;

	fire(type: SubjectDataSetEventTypes.PAGE_CHANGE, pageNumber: number, columnDefs: ColumnDefs): this;
	on(type: SubjectDataSetEventTypes.PAGE_CHANGE, listener: (pageNumber: number, columnDefs: ColumnDefs) => void): this;
	off(type: SubjectDataSetEventTypes.PAGE_CHANGE, listener: (pageNumber: number, columnDefs: ColumnDefs) => void): this;
}