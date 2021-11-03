export enum IndicatorsEventTypes {
	DO_CREATE_INDICATOR = 'do-create-indicator',
}

export interface IndicatorsEventBus {
	fire(type: IndicatorsEventTypes.DO_CREATE_INDICATOR): this;
	on(type: IndicatorsEventTypes.DO_CREATE_INDICATOR, listener: () => void): this;
	off(type: IndicatorsEventTypes.DO_CREATE_INDICATOR, listener: () => void): this;

	// fire(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, searchText: string, pageNumber: number): this;
	// on(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, listener: (searchText: string, pageNumber: number) => void): this;
	// off(type: IndicatorsEventTypes.DO_SEARCH_INDICATOR, listener: (searchText: string, pageNumber: number) => void): this;
	//
	// fire(type: IndicatorsEventTypes.INDICATOR_SEARCHED, page: IndicatorsPage, searchText: string): this;
	// on(type: IndicatorsEventTypes.INDICATOR_SEARCHED, listener: (page: IndicatorsPage, searchText: string) => void): this;
	// off(type: IndicatorsEventTypes.INDICATOR_SEARCHED, listener: (page: IndicatorsPage, searchText: string) => void): this;
}