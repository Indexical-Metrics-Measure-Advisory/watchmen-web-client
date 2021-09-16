import {ColumnDefs, DataPage} from '@/dataset-grid/types';

export enum SubjectDataSetEventTypes {
	COLUMN_DEFS_READY = 'column-defs-ready',

	ASK_COLUMN_DEFS = 'ask-column-defs',
	REPLY_COLUMN_DEFS = 'reply-column-defs',

	PAGE_LOADED = 'page-loaded',
	PAGE_CHANGE = 'page-change'
}

export interface SubjectDataSetEventBus {
	fire(type: SubjectDataSetEventTypes.COLUMN_DEFS_READY, columnDefs: ColumnDefs): this;
	on(type: SubjectDataSetEventTypes.COLUMN_DEFS_READY, listener: (columnDefs: ColumnDefs) => void): this;
	off(type: SubjectDataSetEventTypes.COLUMN_DEFS_READY, listener: (columnDefs: ColumnDefs) => void): this;

	fire(type: SubjectDataSetEventTypes.ASK_COLUMN_DEFS): this;
	on(type: SubjectDataSetEventTypes.ASK_COLUMN_DEFS, listener: () => void): this;
	off(type: SubjectDataSetEventTypes.ASK_COLUMN_DEFS, listener: () => void): this;

	fire(type: SubjectDataSetEventTypes.REPLY_COLUMN_DEFS, columnDefs: ColumnDefs): this;
	once(type: SubjectDataSetEventTypes.REPLY_COLUMN_DEFS, listener: (columnDefs: ColumnDefs) => void): this;

	fire(type: SubjectDataSetEventTypes.PAGE_LOADED, page: DataPage, columnDefs: ColumnDefs): this;
	on(type: SubjectDataSetEventTypes.PAGE_LOADED, listener: (page: DataPage, columnDefs: ColumnDefs) => void): this;
	off(type: SubjectDataSetEventTypes.PAGE_LOADED, listener: (page: DataPage, columnDefs: ColumnDefs) => void): this;

	fire(type: SubjectDataSetEventTypes.PAGE_CHANGE, pageNumber: number, columnDefs: ColumnDefs): this;
	on(type: SubjectDataSetEventTypes.PAGE_CHANGE, listener: (pageNumber: number, columnDefs: ColumnDefs) => void): this;
	off(type: SubjectDataSetEventTypes.PAGE_CHANGE, listener: (pageNumber: number, columnDefs: ColumnDefs) => void): this;
}