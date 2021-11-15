import {QueryTupleForHolder} from '@/services/data/tuples/tuple-types';

export enum PickerDropdownPosition {
	TOP = 'top',
	BOTTOM = 'bottom'
}

export enum PickerSearchState {
	READY = 'ready',
	SEARCHING = 'searching',
	DONE = 'done'
}

export enum TupleItemPickerEventTypes {
	SEARCH_STARTED = 'search-started',
	SEARCH_DONE = 'search-done',
	// search state is available between started and done, otherwise can be ignored.
	CHANGE_SEARCH_STATE = 'change-search-state',

	CHANGE_DROPDOWN_POSITION = 'change-dropdown-position',

	ITEM_ADDED = 'item-added',
	ITEM_REMOVED = 'item-removed',
}

export interface TupleItemPickerEventBus {
	fire(type: TupleItemPickerEventTypes.SEARCH_STARTED): this;
	on(type: TupleItemPickerEventTypes.SEARCH_STARTED, listener: () => void): this;
	off(type: TupleItemPickerEventTypes.SEARCH_STARTED, listener: () => void): this;

	fire(type: TupleItemPickerEventTypes.SEARCH_DONE): this;
	on(type: TupleItemPickerEventTypes.SEARCH_DONE, listener: () => void): this;
	off(type: TupleItemPickerEventTypes.SEARCH_DONE, listener: () => void): this;

	fire<QTH extends QueryTupleForHolder>(type: TupleItemPickerEventTypes.CHANGE_SEARCH_STATE, state: PickerSearchState, candidates: Array<QTH>): this;
	on<QTH extends QueryTupleForHolder>(type: TupleItemPickerEventTypes.CHANGE_SEARCH_STATE, listener: (state: PickerSearchState, candidates: Array<QTH>) => void): this;
	off<QTH extends QueryTupleForHolder>(type: TupleItemPickerEventTypes.CHANGE_SEARCH_STATE, listener: (state: PickerSearchState, candidates: Array<QTH>) => void): this;

	fire(type: TupleItemPickerEventTypes.CHANGE_DROPDOWN_POSITION, dropdownPosition: PickerDropdownPosition): this;
	on(type: TupleItemPickerEventTypes.CHANGE_DROPDOWN_POSITION, listener: (dropdownPosition: PickerDropdownPosition) => void): this;
	off(type: TupleItemPickerEventTypes.CHANGE_DROPDOWN_POSITION, listener: (dropdownPosition: PickerDropdownPosition) => void): this;

	fire(type: TupleItemPickerEventTypes.ITEM_ADDED): this;
	on(type: TupleItemPickerEventTypes.ITEM_ADDED, listener: () => void): this;
	off(type: TupleItemPickerEventTypes.ITEM_ADDED, listener: () => void): this;

	fire(type: TupleItemPickerEventTypes.ITEM_REMOVED): this;
	on(type: TupleItemPickerEventTypes.ITEM_REMOVED, listener: () => void): this;
	off(type: TupleItemPickerEventTypes.ITEM_REMOVED, listener: () => void): this;
}