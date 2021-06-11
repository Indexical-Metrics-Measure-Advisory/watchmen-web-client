import {useStatisticsEventBus} from '../statistics-event-bus';
import {useEffect, useState} from 'react';
import {DataPanelLayout, DataPanelLayouts, DataPanels} from '../types';
import {DEFAULT_LAYOUTS} from '../constants';
import {StatisticsEventTypes} from '../statistics-event-bus-types';

export const useLayout = (which: DataPanels) => {
	const {on, off} = useStatisticsEventBus();
	const [layout, setLayout] = useState<DataPanelLayout>(DEFAULT_LAYOUTS[which]);
	useEffect(() => {
		const onPanelResized = (layouts: DataPanelLayouts) => {
			setLayout(layouts[which]);
		};
		on(StatisticsEventTypes.PANEL_RESIZED, onPanelResized);
		return () => {
			off(StatisticsEventTypes.PANEL_RESIZED, onPanelResized);
		};
	}, [on, off, which]);

	return {layout};
};