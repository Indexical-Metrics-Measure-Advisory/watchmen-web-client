import {DataPanel} from '../data-panel';
import React from 'react';
import {DataPanels} from '../types';
import {useLayout} from '../data-panel/use-layout';
import {DEFAULT_LAYOUTS} from '../constants';

export const DailyPanel = () => {
	const {layout} = useLayout(DataPanels.DAILY);

	return <DataPanel which={DataPanels.DAILY} title="Daily"
	                  layout={layout} defaultLayout={DEFAULT_LAYOUTS[DataPanels.DAILY]}/>;
};