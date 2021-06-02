import React from 'react';
import {FullWidthPage} from '../../basic-widgets/page';
import {FullWidthPageHeaderContainer, PageTitle} from '../../basic-widgets/page-header';
import {CLIWrapper} from '../widgets/cli';
import {Execution} from './execution';
import {Command} from '../command/types';
import {PipelineCmd} from './pipeline/commands';
import {TopicCmd} from './topic/commands';
import {createHelpCmd} from '../command';
import {PipelineHelpCmd} from './pipeline/help';
import {TopicHelpCmd} from './topic/help';

export const CONSANGUINITY_COMMANDS: Array<Readonly<Command>> = [PipelineCmd, TopicCmd];

export const CONSANGUINITY_HELP_COMMAND = createHelpCmd([PipelineHelpCmd, TopicHelpCmd]);

const DataQualityConsanguinityIndex = () => {
	return <FullWidthPage>
		<FullWidthPageHeaderContainer>
			<PageTitle>Consanguinity</PageTitle>
		</FullWidthPageHeaderContainer>
		<CLIWrapper greeting="This channel is for working on consanguinity."
		            commands={CONSANGUINITY_COMMANDS}
		            helpCommand={CONSANGUINITY_HELP_COMMAND}
		            execution={Execution}/>
	</FullWidthPage>;
};

export default DataQualityConsanguinityIndex;