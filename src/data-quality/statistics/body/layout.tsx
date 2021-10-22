import {Fragment, useEffect, useState} from 'react';
import {DEFAULT_LAYOUTS} from '../constants';
import {useStatisticsEventBus} from '../statistics-event-bus';
import {StatisticsEventTypes} from '../statistics-event-bus-types';
import {DataPanelLayouts, DataPanelResize, DataPanels} from '../types';

const computeLayouts = (layout: DataPanelLayouts, which: DataPanels, how: DataPanelResize): DataPanelLayouts => {
	layout = JSON.parse(JSON.stringify(layout));

	if (which === DataPanels.DAILY) {
		switch (how) {
			case DataPanelResize.MINIMIZE:
				layout[DataPanels.DAILY].spanColumn = 1;
				layout[DataPanels.WEEKLY].column = 2;
				layout[DataPanels.WEEKLY].spanColumn = 3;
				layout[DataPanels.FREE_WALK].column = 2;
				layout[DataPanels.FREE_WALK].spanColumn = 3;
				break;
			case DataPanelResize.MAXIMIZE:
				layout[DataPanels.DAILY].spanColumn = 3;
				layout[DataPanels.WEEKLY].column = 4;
				layout[DataPanels.WEEKLY].spanColumn = 1;
				layout[DataPanels.WEEKLY].spanRow = 2;
				layout[DataPanels.FREE_WALK].column = 4;
				layout[DataPanels.FREE_WALK].spanColumn = 1;
				layout[DataPanels.FREE_WALK].row = 3;
				layout[DataPanels.FREE_WALK].spanRow = 2;
				break;
			case DataPanelResize.RESTORE:
				layout[DataPanels.DAILY].spanColumn = 2;
				layout[DataPanels.DAILY].spanRow = 4;
				layout[DataPanels.WEEKLY].column = 3;
				layout[DataPanels.WEEKLY].spanColumn = 2;
				layout[DataPanels.FREE_WALK].column = 3;
				layout[DataPanels.FREE_WALK].spanColumn = 2;
				break;
		}
		return layout;
	}

	if (which === DataPanels.WEEKLY) {
		switch (how) {
			case DataPanelResize.MINIMIZE:
				layout[DataPanels.WEEKLY].spanRow = 1;
				layout[DataPanels.FREE_WALK].row = 2;
				layout[DataPanels.FREE_WALK].spanRow = 3;
				break;
			case DataPanelResize.MAXIMIZE:
				layout[DataPanels.DAILY].spanColumn = 1;
				layout[DataPanels.WEEKLY].column = 2;
				layout[DataPanels.WEEKLY].spanColumn = 3;
				layout[DataPanels.WEEKLY].spanRow = 3;
				layout[DataPanels.FREE_WALK].column = 2;
				layout[DataPanels.FREE_WALK].spanColumn = 3;
				layout[DataPanels.FREE_WALK].row = 4;
				layout[DataPanels.FREE_WALK].spanRow = 1;
				break;
			case DataPanelResize.RESTORE:
				layout = JSON.parse(JSON.stringify(DEFAULT_LAYOUTS));
				break;
		}
		return layout;
	}

	if (which === DataPanels.FREE_WALK) {
		switch (how) {
			case DataPanelResize.MINIMIZE:
				layout[DataPanels.WEEKLY].spanRow = 3;
				layout[DataPanels.FREE_WALK].row = 4;
				layout[DataPanels.FREE_WALK].spanRow = 1;
				break;
			case DataPanelResize.MAXIMIZE:
				layout[DataPanels.DAILY].spanColumn = 1;
				layout[DataPanels.WEEKLY].column = 2;
				layout[DataPanels.WEEKLY].spanColumn = 3;
				layout[DataPanels.WEEKLY].spanRow = 1;
				layout[DataPanels.FREE_WALK].column = 2;
				layout[DataPanels.FREE_WALK].spanColumn = 3;
				layout[DataPanels.FREE_WALK].row = 2;
				layout[DataPanels.FREE_WALK].spanRow = 3;
				break;
			case DataPanelResize.RESTORE:
				layout = JSON.parse(JSON.stringify(DEFAULT_LAYOUTS));
				break;
		}
		return layout;
	}

	throw new Error(`Source data panel[${which}] is not supported.`);
};

export const BodyLayout = () => {
	const {on, off, fire} = useStatisticsEventBus();
	const [state, setState] = useState<DataPanelLayouts>(DEFAULT_LAYOUTS);
	useEffect(() => {
		const onResizePanel = (which: DataPanels, how: DataPanelResize) => {
			const newLayout = computeLayouts(state, which, how);
			setState(newLayout);
			fire(StatisticsEventTypes.PANEL_RESIZED, newLayout);
		};
		on(StatisticsEventTypes.RESIZE_PANEL, onResizePanel);
		return () => {
			off(StatisticsEventTypes.RESIZE_PANEL, onResizePanel);
		};
	}, [on, off, fire, state]);

	return <Fragment/>;
};