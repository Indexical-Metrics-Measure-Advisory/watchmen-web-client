import {SubjectDataSetColumn} from '@/services/data/tuples/subject-types';

export enum ColumnEventTypes {
	ALIAS_CHANGED = 'alias-changed',
	CONTENT_CHANGED = 'content-changed'
}

export interface ColumnEventBus {
	fire(type: ColumnEventTypes.ALIAS_CHANGED, column: SubjectDataSetColumn): this;
	on(type: ColumnEventTypes.ALIAS_CHANGED, listener: (column: SubjectDataSetColumn) => void): this;
	off(type: ColumnEventTypes.ALIAS_CHANGED, listener: (column: SubjectDataSetColumn) => void): this;

	fire(type: ColumnEventTypes.CONTENT_CHANGED, column: SubjectDataSetColumn): this;
	on(type: ColumnEventTypes.CONTENT_CHANGED, listener: (column: SubjectDataSetColumn) => void): this;
	off(type: ColumnEventTypes.CONTENT_CHANGED, listener: (column: SubjectDataSetColumn) => void): this;
}