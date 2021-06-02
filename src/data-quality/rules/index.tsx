import React from 'react';
import {FullWidthPage} from '../../basic-widgets/page';
import {FullWidthPageHeaderContainer, PageTitle} from '../../basic-widgets/page-header';
import {CLIWrapper} from '../widgets/cli';
import {Execution} from './execution';
import {Command} from '../command/types';
import {createHelpCmd} from '../command';

export const RULES_COMMANDS: Array<Command> = [];

export const RULES_HELP_COMMAND = createHelpCmd([]);

const DataQualityMonitorRulesIndex = () => {
	return <FullWidthPage>
		<FullWidthPageHeaderContainer>
			<PageTitle>Monitor Rules</PageTitle>
		</FullWidthPageHeaderContainer>
		<CLIWrapper greeting="This channel is for working on monitor rules."
		            commands={RULES_COMMANDS}
		            helpCommand={RULES_HELP_COMMAND}
		            execution={Execution}/>
	</FullWidthPage>;
};

export default DataQualityMonitorRulesIndex;