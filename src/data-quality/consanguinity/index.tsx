import {FullWidthPage} from '@/widgets/basic/page';
import {FullWidthPageHeaderContainer, PageTitle} from '@/widgets/basic/page-header';
import React from 'react';
import {createHelpCmd} from '../command';
import {Command} from '../command/types';
import {CLIWrapper} from '../widgets/cli';
import {Execution} from './execution';
import {FlowCmd} from './flow/commands';
import {FlowHelpCmd} from './flow/help';
import {GraphCmd} from './graph/commands';
import {GraphHelpCmd} from './graph/help';
import {PipelineCmd} from './pipeline/commands';
import {PipelineHelpCmd} from './pipeline/help';
import {TopicCmd} from './topic/commands';
import {TopicHelpCmd} from './topic/help';

export const CONSANGUINITY_COMMANDS: Array<Command> = [PipelineCmd, TopicCmd, FlowCmd, GraphCmd];

export const CONSANGUINITY_HELP_COMMAND = createHelpCmd([PipelineHelpCmd, TopicHelpCmd, FlowHelpCmd, GraphHelpCmd]);

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