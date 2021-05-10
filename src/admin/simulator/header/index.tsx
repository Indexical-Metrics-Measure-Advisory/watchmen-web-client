import React from 'react';
import {PageHeaderHolder} from '../../../basic-widgets/page-header';
import {HeaderFromPipelineButton} from './header-from-pipeline-button';
import {HeaderFromTopicButton} from './header-from-topic-button';
import {PageHeaderButtons} from '../../../basic-widgets/page-header-buttons';
import {Header} from '../../pipelines/catalog/widgets';
import {SimulatorHeaderTitle} from './title';

export const SimulatorHeader = () => {
	return <Header>
		<PageHeaderHolder>
			<SimulatorHeaderTitle/>
			<PageHeaderButtons>
				<HeaderFromPipelineButton/>
				<HeaderFromTopicButton/>
			</PageHeaderButtons>
		</PageHeaderHolder>
	</Header>;
};
