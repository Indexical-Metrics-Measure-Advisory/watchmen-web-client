import React from 'react';
import {CommandPublishedBehaviorType, HelpCommand} from '../../command/types';
import {
	HelpCommandDescription,
	HelpCommandExample,
	HelpCommandName,
	LeadHelpCommandName
} from '../../widgets/cli/execution/widgets';
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
		<HelpCommandName>-- list [sys|biz] [raw|distinct|aggregate|time|ratio]</HelpCommandName>
		<HelpCommandDescription>
			<span>List all topics.</span>
			<span>Examples:</span>
			<HelpCommandExample>/topic list</HelpCommandExample>
			<span>List all topics.</span>
			<HelpCommandExample>/topic list sys</HelpCommandExample>
			<span>List all system topics.</span>
		</HelpCommandDescription>
		<HelpCommandName>-- view "topic id or name"</HelpCommandName>
		<HelpCommandDescription>
			<span>View detail information of topic by given id or full qualified name.</span>
			<span>Examples:</span>
			<HelpCommandExample>/topic view 861904759132</HelpCommandExample>
			<span>View topic which id is 861904759132.</span>
			<HelpCommandExample>/topic view 'Hello World'</HelpCommandExample>
			<span>View topic which name is "Hello World". Single or double quote is supported when name has whitespace.</span>
		</HelpCommandDescription>
		<HelpCommandName>-- "id or part of name"</HelpCommandName>
		<HelpCommandDescription>Find topic by given id or text.</HelpCommandDescription>
	</>
};