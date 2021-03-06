import React from 'react';
import {FullWidthPage} from '../../basic-widgets/page';
import {FullWidthPageHeaderContainer, PageTitle} from '../../basic-widgets/page-header';
import {CLIWrapper} from '../widgets/cli';
import {Execution} from './execution';
import {Command} from '../command/types';
import {createHelpCmd} from '../command';

export const RULES_COMMANDS: Array<Command> = [];

export const RULES_HELP_COMMAND = createHelpCmd([]);

const DataQualityEndUserIndex = () => {
	return <FullWidthPage>
		<FullWidthPageHeaderContainer>
			<PageTitle>End User's Console</PageTitle>
		</FullWidthPageHeaderContainer>
		<CLIWrapper greeting="This channel is for working on end user's console, spaces, reports, groups, users."
		            commands={RULES_COMMANDS}
		            helpCommand={RULES_HELP_COMMAND}
		            execution={Execution}/>
	</FullWidthPage>;
};

export default DataQualityEndUserIndex;