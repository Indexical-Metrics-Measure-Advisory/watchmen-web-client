import {PrepareStep} from './types';

export enum IndicatorsEventTypes {
	SWITCH_STEP = 'switch-step',
}

export interface IndicatorsEventBus {
	fire(type: IndicatorsEventTypes.SWITCH_STEP, step: PrepareStep): this;
	on(type: IndicatorsEventTypes.SWITCH_STEP, listener: (step: PrepareStep) => void): this;
	off(type: IndicatorsEventTypes.SWITCH_STEP, listener: (step: PrepareStep) => void): this;

	// fire(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, searchText: string, pageNumber: number): this;
	// on(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, listener: (searchText: string, pageNumber: number) => void): this;
	// off(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, listener: (searchText: string, pageNumber: number) => void): this;
	//
	// fire(type: IndicatorsEventTypes.INDICATOR_SEARCHED, page: IndicatorsPage, searchText: string): this;
	// on(type: IndicatorsEventTypes.INDICATOR_SEARCHED, listener: (page: IndicatorsPage, searchText: string) => void): this;
	// off(type: IndicatorsEventTypes.INDICATOR_SEARCHED, listener: (page: IndicatorsPage, searchText: string) => void): this;
}