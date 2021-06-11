import {DataPanel} from '../data-panel';
import React from 'react';
import {DataPanels} from '../types';
import {useLayout} from '../data-panel/use-layout';
import {DEFAULT_LAYOUTS} from '../constants';

export const WeeklyPanel = () => {
	const {layout} = useLayout(DataPanels.WEEKLY);

	return <DataPanel which={DataPanels.WEEKLY} title="Weekly"
	                  layout={layout} defaultLayout={DEFAULT_LAYOUTS[DataPanels.WEEKLY]}/>;
};