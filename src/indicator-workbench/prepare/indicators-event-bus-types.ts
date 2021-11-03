export enum IndicatorsEventTypes {
	INDICATOR_DETECTED = 'indicator-detected',

	DO_SEARCH_INDICATOR = 'do-search-indicator',
	INDICATOR_SEARCHED = 'indicator-searched'
}

export interface IndicatorsEventBus {
	// fire(type: IndicatorsEventTypes.INDICATOR_DETECTED, indicators: Array<Indicator>): this;
	// on(type: IndicatorsEventTypes.INDICATOR_DETECTED, listener: (indicators: Array<Indicator>) => void): this;
	// off(type: IndicatorsEventTypes.INDICATOR_DETECTED, listener: (indicators: Array<Indicator>) => void): this;
	//
	// fire(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, searchText: string, pageNumber: number): this;
	// on(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, listener: (searchText: string, pageNumber: number) => void): this;
	// off(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, listener: (searchText: string, pageNumber: number) => void): this;
	//
	// fire(type: IndicatorsEventTypes.INDICATOR_SEARCHED, page: IndicatorsPage, searchText: string): this;
	// on(type: IndicatorsEventTypes.INDICATOR_SEARCHED, listener: (page: IndicatorsPage, searchText: string) => void): this;
	// off(type: IndicatorsEventTypes.INDICATOR_SEARCHED, listener: (page: IndicatorsPage, searchText: string) => void): this;
}