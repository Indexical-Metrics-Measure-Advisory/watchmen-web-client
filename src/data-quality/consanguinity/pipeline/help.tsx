import React from 'react';
import {CommandPublishedBehaviorType, HelpCommand} from '../../command/types';
import {
	HelpCommandDescription,
	HelpCommandExample,
	HelpCommandName,
	LeadHelpCommandName
} from '../../widgets/cli/execution/widgets';
import {PipelineBrief} from './brief';

export const PipelineHelpCmd: HelpCommand = {
	label: 'Pipeline',
	command: 'pipeline',
	reminder: 'Press "enter" to view help',
	trails: [],
	executableOnNoTrail: true,
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	brief: <PipelineBrief/>,
	whole: <>
		<LeadHelpCommandName>/pipeline</LeadHelpCommandName>
		<HelpCommandName>-- list [noname|enabled|disabled|valid|invalid]</HelpCommandName>
		<HelpCommandDescription>
			<span>List all pipelines, with restriction or not.</span>
			<span>Examples:</span>
			<HelpCommandExample>/pipeline list</HelpCommandExample>
			<span>List all pipelines.</span>
			<HelpCommandExample>/pipeline list noname</HelpCommandExample>
			<span>List all noname pipelines.</span>
		</HelpCommandDescription>
		<HelpCommandName>-- view "pipeline id or name"</HelpCommandName>
		<HelpCommandDescription>
			<span>View detail information of pipeline by given id or full qualified name.</span>
			<span>Examples:</span>
			<HelpCommandExample>/pipeline view 861904759133</HelpCommandExample>
			<span>View pipeline which id is 861904759133.</span>
			<HelpCommandExample>/pipeline view 'Hello World'</HelpCommandExample>
			<span>View pipeline which name is "Hello World". Single or double quote is supported when name has whitespace.</span>
		</HelpCommandDescription>
		<HelpCommandName>-- "id or part of name"</HelpCommandName>
		<HelpCommandDescription>Find pipeline by given id or text.</HelpCommandDescription>
		<HelpCommandName>-- inspect</HelpCommandName>
		<HelpCommandDescription>Inspect issue on all pipelines.</HelpCommandDescription>
	</>
};