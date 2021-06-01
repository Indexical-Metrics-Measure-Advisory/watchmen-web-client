import {CommandPublishedBehaviorType, HelpCommand} from '../../command/types';
import {HelpCommandDescription, HelpCommandName, LeadHelpCommandName} from '../../widgets/cli/execution/widgets';
import React from 'react';
import {TopicBrief} from './brief';

export const TopicHelpCmd: HelpCommand = {
	label: 'Topic',
	command: 'topic',
	reminder: 'Press "enter" to view help',
	trails: [],
	executableOnNoTrail: true,
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	brief: <TopicBrief/>,
	whole: <>
		<LeadHelpCommandName>/topic</LeadHelpCommandName>
		<HelpCommandName>-- list</HelpCommandName>
		<HelpCommandDescription>
			<span>List all topics.</span>
		</HelpCommandDescription>
	</>
};