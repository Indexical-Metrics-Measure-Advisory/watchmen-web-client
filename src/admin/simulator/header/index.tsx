import React from 'react';
import {PageHeaderHolder} from '../../../basic-widgets/page-header';
import {Header} from '../../pipelines/catalog/widgets';
import {SimulatorHeaderTitle} from './title';

export const SimulatorHeader = () => {
	return <Header>
		<PageHeaderHolder>
			<SimulatorHeaderTitle/>
		</PageHeaderHolder>
	</Header>;
};
