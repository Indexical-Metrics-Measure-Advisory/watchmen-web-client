import {Indicator, IndicatorsPage} from '@/services/data/indicators/types';

export enum IndicatorsState {
	NONE = 'none',
	CHANGED = 'changed',
	SAVING = 'saving',
	SAVED = 'saved'
}

export enum IndicatorsEventTypes {
	DO_CREATE_INDICATOR = 'do-create-indicator',
	INDICATOR_CREATED = 'indicator-created',

	DO_EDIT_INDICATOR = 'do-edit-indicator',
	INDICATOR_LOADED = 'indicator-loaded',
	INDICATOR_EDIT_DONE = 'indicator-edit-done',
	CHANGE_INDICATOR_STATE = 'change-indicator-state',
	ASK_INDICATOR_STATE = 'ask-indicator-state',
	REPLY_INDICATOR_STATE = 'reply-indicator-state',

	DO_SAVE_INDICATOR = 'do-save-indicator',
	INDICATOR_SAVED = 'indicator-saved',

	DO_SEARCH_INDICATOR = 'do-search-indicator',
	INDICATOR_SEARCHED = 'indicator-searched'
}

export interface IndicatorsEventBus {
	fire(type: IndicatorsEventTypes.DO_CREATE_INDICATOR): this;
	on(type: IndicatorsEventTypes.DO_CREATE_INDICATOR, listener: () => void): this;
	off(type: IndicatorsEventTypes.DO_CREATE_INDICATOR, listener: () => void): this;

	fire(type: IndicatorsEventTypes.INDICATOR_CREATED, indicator: Indicator): this;
	on(type: IndicatorsEventTypes.INDICATOR_CREATED, listener: (indicator: Indicator) => void): this;
	off(type: IndicatorsEventTypes.INDICATOR_CREATED, listener: (indicator: Indicator) => void): this;

	fire(type: IndicatorsEventTypes.DO_EDIT_INDICATOR, indicator: Indicator): this;
	on(type: IndicatorsEventTypes.DO_EDIT_INDICATOR, listener: (indicator: Indicator) => void): this;
	off(type: IndicatorsEventTypes.DO_EDIT_INDICATOR, listener: (indicator: Indicator) => void): this;

	fire(type: IndicatorsEventTypes.INDICATOR_LOADED, indicator: Indicator): this;
	on(type: IndicatorsEventTypes.INDICATOR_LOADED, listener: (indicator: Indicator) => void): this;
	off(type: IndicatorsEventTypes.INDICATOR_LOADED, listener: (indicator: Indicator) => void): this;

	fire(type: IndicatorsEventTypes.CHANGE_INDICATOR_STATE, state: IndicatorsState): this;
	on(type: IndicatorsEventTypes.CHANGE_INDICATOR_STATE, listener: (state: IndicatorsState) => void): this;
	off(type: IndicatorsEventTypes.CHANGE_INDICATOR_STATE, listener: (state: IndicatorsState) => void): this;

	fire(type: IndicatorsEventTypes.ASK_INDICATOR_STATE): this;
	on(type: IndicatorsEventTypes.ASK_INDICATOR_STATE, listener: () => void): this;
	off(type: IndicatorsEventTypes.ASK_INDICATOR_STATE, listener: () => void): this;

	fire(type: IndicatorsEventTypes.REPLY_INDICATOR_STATE, state: IndicatorsState): this;
	once(type: IndicatorsEventTypes.REPLY_INDICATOR_STATE, listener: (state: IndicatorsState) => void): this;

	fire(type: IndicatorsEventTypes.INDICATOR_EDIT_DONE): this;
	on(type: IndicatorsEventTypes.INDICATOR_EDIT_DONE, listener: () => void): this;
	off(type: IndicatorsEventTypes.INDICATOR_EDIT_DONE, listener: () => void): this;

	fire(type: IndicatorsEventTypes.DO_SAVE_INDICATOR, indicator: Indicator): this;
	on(type: IndicatorsEventTypes.DO_SAVE_INDICATOR, listener: (indicator: Indicator) => void): this;
	off(type: IndicatorsEventTypes.DO_SAVE_INDICATOR, listener: (indicator: Indicator) => void): this;

	fire(type: IndicatorsEventTypes.INDICATOR_SAVED, indicator: Indicator, saved: boolean): this;
	once(type: IndicatorsEventTypes.INDICATOR_SAVED, listener: (indicator: Indicator, saved: boolean) => void): this;

	fire(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, searchText: string, pageNumber: number): this;
	on(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, listener: (searchText: string, pageNumber: number) => void): this;
	off(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, listener: (searchText: string, pageNumber: number) => void): this;

	fire(type: IndicatorsEventTypes.INDICATOR_SEARCHED, page: IndicatorsPage, searchText: string): this;
	on(type: IndicatorsEventTypes.INDICATOR_SEARCHED, listener: (page: IndicatorsPage, searchText: string) => void): this;
	off(type: IndicatorsEventTypes.INDICATOR_SEARCHED, listener: (page: IndicatorsPage, searchText: string) => void): this;
}