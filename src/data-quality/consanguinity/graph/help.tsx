import {CommandPublishedBehaviorType, HelpCommand} from '../../command/types';
import {
	HelpCommandDescription,
	HelpCommandExample,
	HelpCommandName,
	LeadHelpCommandName
} from '../../widgets/cli/execution/widgets';
import React from 'react';
import {GraphBrief} from './brief';

export const GraphHelpCmd: HelpCommand = {
	label: 'Graph',
	command: 'graph',
	reminder: 'Press "enter" to view help',
	trails: [],
	executableOnNoTrail: true,
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	brief: <GraphBrief/>,
	whole: <>
		<LeadHelpCommandName>/graph</LeadHelpCommandName>
		<HelpCommandName>-- [start "topic id or name"] [stop "topic id or name"]</HelpCommandName>
		<HelpCommandDescription>
			<span>List data flow of given endpoints.</span>
			<span>Examples:</span>
			<HelpCommandExample>/flow</HelpCommandExample>
			<span>List all data flow.</span>
			<HelpCommandExample>/flow start "Hello World"</HelpCommandExample>
			<span>List data flow which starts from topic "Hello World". Single or double quote is supported when name has whitespace.</span>
			<HelpCommandExample>/flow stop "Hello World"</HelpCommandExample>
			<span>List data flow which stops by topic "Hello World".</span>
			<HelpCommandExample>/flow start "Hello World" stop 861904759132</HelpCommandExample>
			<span>List data flow which starts from topic "Hello World" and stops by topic 861904759132.</span>
		</HelpCommandDescription>
	</>
};