import {DataPanelLayouts, DataPanelResize, DataPanels} from './types';

export enum StatisticsEventTypes {
	RESIZE_PANEL = 'resize-panel',
	PANEL_RESIZED = 'panel-resized'
}

export interface StatisticsEventBus {
	fire(type: StatisticsEventTypes.RESIZE_PANEL, which: DataPanels, how: DataPanelResize): this;
	on(type: StatisticsEventTypes.RESIZE_PANEL, listener: (which: DataPanels, how: DataPanelResize) => void): this;
	off(type: StatisticsEventTypes.RESIZE_PANEL, listener: (which: DataPanels, how: DataPanelResize) => void): this;

	fire(type: StatisticsEventTypes.PANEL_RESIZED, layouts: DataPanelLayouts): this;
	on(type: StatisticsEventTypes.PANEL_RESIZED, listener: (layouts: DataPanelLayouts) => void): this;
	off(type: StatisticsEventTypes.PANEL_RESIZED, listener: (layouts: DataPanelLayouts) => void): this;
}