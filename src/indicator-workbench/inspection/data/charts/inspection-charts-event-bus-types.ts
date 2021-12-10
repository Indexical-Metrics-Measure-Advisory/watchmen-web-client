import {Inspection} from '@/services/data/tuples/inspection-types';
import {ChartUsage} from './types';

export enum InspectionChartsEventTypes {
	TOGGLE_PANEL = 'toggle-panel',
	TOGGLE_CHART = 'toggle-chart',

	ASK_USAGE_USED = 'ask-usage-used'
}

export interface InspectionChartsEventBus {
	fire(type: InspectionChartsEventTypes.TOGGLE_PANEL, visible: boolean): this;
	on(type: InspectionChartsEventTypes.TOGGLE_PANEL, listener: (visible: boolean) => void): this;
	off(type: InspectionChartsEventTypes.TOGGLE_PANEL, listener: (visible: boolean) => void): this;

	fire(type: InspectionChartsEventTypes.TOGGLE_CHART, inspection: Inspection, usage: ChartUsage, visible: boolean): this;
	on(type: InspectionChartsEventTypes.TOGGLE_CHART, listener: (inspection: Inspection, usage: ChartUsage, visible: boolean) => void): this;
	off(type: InspectionChartsEventTypes.TOGGLE_CHART, listener: (inspection: Inspection, usage: ChartUsage, visible: boolean) => void): this;

	fire(type: InspectionChartsEventTypes.ASK_USAGE_USED, usage: ChartUsage, onData: (used: boolean) => void): this;
	on(type: InspectionChartsEventTypes.ASK_USAGE_USED, listener: (usage: ChartUsage, onData: (used: boolean) => void) => void): this;
	off(type: InspectionChartsEventTypes.ASK_USAGE_USED, listener: (usage: ChartUsage, onData: (used: boolean) => void) => void): this;
}