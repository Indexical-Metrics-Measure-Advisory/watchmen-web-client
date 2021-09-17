import React from 'react';
import {CommandPublishedBehaviorType, HelpCommand} from '../../command/types';
import {
	HelpCommandDescription,
	HelpCommandExample,
	HelpCommandName,
	LeadHelpCommandName
} from '../../widgets/cli/execution/widgets';
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
		<HelpCommandName>-- [factor]</HelpCommandName>
		<HelpCommandDescription>
			<span>Show graphics of relationship between pipelines, topics, factors which are defined pipelines.</span>
			<span>Examples:</span>
			<HelpCommandExample>/graph</HelpCommandExample>
			<span>Show graphics between pipelines and topics.</span>
			<HelpCommandExample>/graph factor</HelpCommandExample>
			<span>Show graphics between pipelines, topics and factors.</span>
		</HelpCommandDescription>
	</>
};