import {DataPanel} from '../data-panel';
import React from 'react';
import {DataPanels} from '../types';
import {useLayout} from '../data-panel/use-layout';
import {DEFAULT_LAYOUTS} from '../constants';

export const FreeWalkPanel = () => {
	const {layout} = useLayout(DataPanels.FREE_WALK);

	return <DataPanel which={DataPanels.FREE_WALK} title="Free Walk"
	                  layout={layout} defaultLayout={DEFAULT_LAYOUTS[DataPanels.FREE_WALK]}/>;
};