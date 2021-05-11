import React from 'react';
import {PageHeaderHolder} from '../../../basic-widgets/page-header';
import {Header, HeaderTitle} from '../../pipelines/catalog/widgets';

export const SimulatorHeader = () => {
	return <Header>
		<PageHeaderHolder>
			<HeaderTitle>Pipeline Simulator</HeaderTitle>
		</PageHeaderHolder>
	</Header>;
};
