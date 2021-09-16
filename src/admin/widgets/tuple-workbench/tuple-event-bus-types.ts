import {DataPage} from '@/services/query/data-page';
import {QueryTuple, QueryTupleForHolder, Tuple} from '@/services/tuples/tuple-types';

export enum TupleState {
	NONE = 'none',
	CHANGED = 'changed',
	SAVING = 'saving',
	SAVED = 'saved'
}

export type HoldByTuple = { [key in string]?: Array<QueryTupleForHolder> }

export enum TupleEventTypes {
	DO_CREATE_TUPLE = 'do-create-tuple',
	TUPLE_CREATED = 'tuple-created',

	DO_EDIT_TUPLE = 'do-edit-tuple',
	TUPLE_LOADED = 'tuple-loaded',
	TUPLE_EDIT_DONE = 'tuple-edit-done',
	CHANGE_TUPLE_STATE = 'change-tuple-state',
	ASK_TUPLE_STATE = 'ask-tuple-state',
	REPLY_TUPLE_STATE = 'reply-tuple-state',

	DO_SAVE_TUPLE = 'do-save-tuple',
	TUPLE_SAVED = 'tuple-saved',

	DO_SEARCH_TUPLE = 'do-search-tuple',
	TUPLE_SEARCHED = 'tuple-searched'
}

export interface TupleEventBus {
	fire(type: TupleEventTypes.DO_CREATE_TUPLE): this;

	on(type: TupleEventTypes.DO_CREATE_TUPLE, listener: () => void): this;

	off(type: TupleEventTypes.DO_CREATE_TUPLE, listener: () => void): this;

	fire<T extends Tuple, HBT extends HoldByTuple>(type: TupleEventTypes.TUPLE_CREATED, tuple: T, codes?: HBT): this;

	on<T extends Tuple, HBT extends HoldByTuple>(type: TupleEventTypes.TUPLE_CREATED, listener: (tuple: T, codes?: HBT) => void): this;

	off<T extends Tuple, HBT extends HoldByTuple>(type: TupleEventTypes.TUPLE_CREATED, listener: (tuple: T, codes?: HBT) => void): this;

	fire<T extends QueryTuple>(type: TupleEventTypes.DO_EDIT_TUPLE, tuple: T): this;

	on<T extends QueryTuple>(type: TupleEventTypes.DO_EDIT_TUPLE, listener: (tuple: T) => void): this;

	off<T extends QueryTuple>(type: TupleEventTypes.DO_EDIT_TUPLE, listener: (tuple: T) => void): this;

	fire<T extends Tuple, HBT extends HoldByTuple>(type: TupleEventTypes.TUPLE_LOADED, tuple: T, codes?: HBT): this;

	on<T extends Tuple, HBT extends HoldByTuple>(type: TupleEventTypes.TUPLE_LOADED, listener: (tuple: T, codes?: HBT) => void): this;

	off<T extends Tuple, HBT extends HoldByTuple>(type: TupleEventTypes.TUPLE_LOADED, listener: (tuple: T, codes?: HBT) => void): this;

	fire(type: TupleEventTypes.CHANGE_TUPLE_STATE, state: TupleState): this;

	on(type: TupleEventTypes.CHANGE_TUPLE_STATE, listener: (state: TupleState) => void): this;

	off(type: TupleEventTypes.CHANGE_TUPLE_STATE, listener: (state: TupleState) => void): this;

	fire(type: TupleEventTypes.ASK_TUPLE_STATE): this;

	on(type: TupleEventTypes.ASK_TUPLE_STATE, listener: () => void): this;

	off(type: TupleEventTypes.ASK_TUPLE_STATE, listener: () => void): this;

	fire(type: TupleEventTypes.REPLY_TUPLE_STATE, state: TupleState): this;

	once(type: TupleEventTypes.REPLY_TUPLE_STATE, listener: (state: TupleState) => void): this;

	off(type: TupleEventTypes.REPLY_TUPLE_STATE, listener: (state: TupleState) => void): this;

	fire(type: TupleEventTypes.TUPLE_EDIT_DONE): this;

	on(type: TupleEventTypes.TUPLE_EDIT_DONE, listener: () => void): this;

	off(type: TupleEventTypes.TUPLE_EDIT_DONE, listener: () => void): this;

	fire<T extends Tuple>(type: TupleEventTypes.DO_SAVE_TUPLE, tuple: T): this;

	on<T extends Tuple>(type: TupleEventTypes.DO_SAVE_TUPLE, listener: (tuple: T) => void): this;

	off<T extends Tuple>(type: TupleEventTypes.DO_SAVE_TUPLE, listener: (tuple: T) => void): this;

	fire<T extends Tuple>(type: TupleEventTypes.TUPLE_SAVED, tuple: T, saved: boolean): this;

	once<T extends Tuple>(type: TupleEventTypes.TUPLE_SAVED, listener: (tuple: T, saved: boolean) => void): this;

	off<T extends Tuple>(type: TupleEventTypes.TUPLE_SAVED, listener: (tuple: T, saved: boolean) => void): this;

	fire(type: TupleEventTypes.DO_SEARCH_TUPLE, searchText: string, pageNumber: number): this;

	on(type: TupleEventTypes.DO_SEARCH_TUPLE, listener: (searchText: string, pageNumber: number) => void): this;

	off(type: TupleEventTypes.DO_SEARCH_TUPLE, listener: (searchText: string, pageNumber: number) => void): this;

	fire<T extends QueryTuple>(type: TupleEventTypes.TUPLE_SEARCHED, page: DataPage<T>, searchText: string): this;

	on<T extends QueryTuple>(type: TupleEventTypes.TUPLE_SEARCHED, listener: (page: DataPage<T>, searchText: string) => void): this;

	off<T extends QueryTuple>(type: TupleEventTypes.TUPLE_SEARCHED, listener: (page: DataPage<T>, searchText: string) => void): this;
}