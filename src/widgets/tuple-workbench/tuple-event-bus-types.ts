import {TuplePage} from '@/services/data/query/tuple-page';
import {Enum, EnumId} from '@/services/data/tuples/enum-types';
import {QueryEnum} from '@/services/data/tuples/query-enum-types';
import {QueryTuple, QueryTupleForHolder, Tuple} from '@/services/data/tuples/tuple-types';

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

	SAVE_TUPLE = 'save-tuple',

	DO_SEARCH_TUPLE = 'do-search-tuple',
	TUPLE_SEARCHED = 'tuple-searched',

	ASK_ENUMS = 'ask-enums',
	ASK_ENUM_DATA = 'ask-enum-data'
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

	fire(type: TupleEventTypes.ASK_TUPLE_STATE, onStateGot: (state: TupleState) => void): this;
	on(type: TupleEventTypes.ASK_TUPLE_STATE, listener: (onStateGot: (state: TupleState) => void) => void): this;
	off(type: TupleEventTypes.ASK_TUPLE_STATE, listener: (onStateGot: (state: TupleState) => void) => void): this;

	fire(type: TupleEventTypes.TUPLE_EDIT_DONE): this;
	on(type: TupleEventTypes.TUPLE_EDIT_DONE, listener: () => void): this;
	off(type: TupleEventTypes.TUPLE_EDIT_DONE, listener: () => void): this;

	fire<T extends Tuple>(type: TupleEventTypes.SAVE_TUPLE, tuple: T, onSaved: (tuple: T, saved: boolean) => void): this;
	on<T extends Tuple>(type: TupleEventTypes.SAVE_TUPLE, listener: (tuple: T, onSaved: (tuple: T, saved: boolean) => void) => void): this;
	off<T extends Tuple>(type: TupleEventTypes.SAVE_TUPLE, listener: (tuple: T, onSaved: (tuple: T, saved: boolean) => void) => void): this;

	fire(type: TupleEventTypes.DO_SEARCH_TUPLE, searchText: string, pageNumber: number): this;
	on(type: TupleEventTypes.DO_SEARCH_TUPLE, listener: (searchText: string, pageNumber: number) => void): this;
	off(type: TupleEventTypes.DO_SEARCH_TUPLE, listener: (searchText: string, pageNumber: number) => void): this;

	fire<T extends QueryTuple>(type: TupleEventTypes.TUPLE_SEARCHED, page: TuplePage<T>, searchText: string): this;
	on<T extends QueryTuple>(type: TupleEventTypes.TUPLE_SEARCHED, listener: (page: TuplePage<T>, searchText: string) => void): this;
	off<T extends QueryTuple>(type: TupleEventTypes.TUPLE_SEARCHED, listener: (page: TuplePage<T>, searchText: string) => void): this;

	fire(type: TupleEventTypes.ASK_ENUMS, onData: (enums: Array<QueryEnum>) => void): this;
	on(type: TupleEventTypes.ASK_ENUMS, listener: (onData: (enums: Array<QueryEnum>) => void) => void): this;
	off(type: TupleEventTypes.ASK_ENUMS, listener: (onData: (enums: Array<QueryEnum>) => void) => void): this;

	fire(type: TupleEventTypes.ASK_ENUM_DATA, enumId: EnumId, onData: (enumeration?: Enum) => void): this;
	on(type: TupleEventTypes.ASK_ENUM_DATA, listener: (enumId: EnumId, onData: (enumeration?: Enum) => void) => void): this;
	off(type: TupleEventTypes.ASK_ENUM_DATA, listener: (enumId: EnumId, onData: (enumeration?: Enum) => void) => void): this;
}