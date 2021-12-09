export enum InspectionChartsEventTypes {
	TOGGLE_TIME_GROUPING_CHART = 'toggle-time-grouping-chart',
	TOGGLE_BUCKET_ON_CHART = 'toggle-bucket-on-chart',
	TOGGLE_BOTH_CHART = 'toggle-both-chart'
}

export interface InspectionChartsEventBus {
	fire(type: InspectionChartsEventTypes.TOGGLE_TIME_GROUPING_CHART, visible: boolean): this;
	on(type: InspectionChartsEventTypes.TOGGLE_TIME_GROUPING_CHART, listener: (visible: boolean) => void): this;
	off(type: InspectionChartsEventTypes.TOGGLE_TIME_GROUPING_CHART, listener: (visible: boolean) => void): this;

	fire(type: InspectionChartsEventTypes.TOGGLE_BUCKET_ON_CHART, visible: boolean): this;
	on(type: InspectionChartsEventTypes.TOGGLE_BUCKET_ON_CHART, listener: (visible: boolean) => void): this;
	off(type: InspectionChartsEventTypes.TOGGLE_BUCKET_ON_CHART, listener: (visible: boolean) => void): this;

	fire(type: InspectionChartsEventTypes.TOGGLE_BOTH_CHART, visible: boolean): this;
	on(type: InspectionChartsEventTypes.TOGGLE_BOTH_CHART, listener: (visible: boolean) => void): this;
	off(type: InspectionChartsEventTypes.TOGGLE_BOTH_CHART, listener: (visible: boolean) => void): this;
}