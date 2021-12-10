import {Inspection} from '@/services/data/tuples/inspection-types';
import {ChartUsage} from './types';

export enum InspectionChartsEventTypes {
	TOGGLE_CHART = 'toggle-chart',
}

export interface InspectionChartsEventBus {
	fire(type: InspectionChartsEventTypes.TOGGLE_CHART, inspection: Inspection, usage: ChartUsage, visible: boolean): this;
	on(type: InspectionChartsEventTypes.TOGGLE_CHART, listener: (inspection: Inspection, usage: ChartUsage, visible: boolean) => void): this;
	off(type: InspectionChartsEventTypes.TOGGLE_CHART, listener: (inspection: Inspection, usage: ChartUsage, visible: boolean) => void): this;
}