import React from 'react';
import {FullWidthPage} from '../../basic-widgets/page';
import {FullWidthPageHeaderContainer, PageTitle} from '../../basic-widgets/page-header';
import {CLIWrapper} from '../widgets/cli';
import {Execution} from './execution';
import {Command, CommandPublishedBehaviorType, HelpCommand} from '../command/types';
import {PipelineCmd} from './pipeline/commands';
import {TopicCmd} from './topic/commands';
import {
	HelpCommandDescription,
	HelpCommandExample,
	HelpCommandName,
	LeadHelpCommandName
} from '../widgets/cli/execution/widgets';

export const CONSANGUINITY_COMMANDS: Array<Readonly<Command>> = [PipelineCmd, TopicCmd];
export const PipelineHelpCmd: HelpCommand = {
	label: 'Pipeline',
	command: 'pipeline',
	reminder: 'Press "enter" to view help',
	trails: [],
	executableOnNoTrail: true,
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	brief: <>
		<HelpCommandName>-- pipeline</HelpCommandName>
		<HelpCommandDescription>Show pipeline command help.</HelpCommandDescription>
	</>,
	whole: <>
		<LeadHelpCommandName>/pipeline</LeadHelpCommandName>
		<HelpCommandName>-- list</HelpCommandName>
		<HelpCommandDescription>List all pipelines.</HelpCommandDescription>
		<HelpCommandName>-- of "pipeline id or name" [in|out] [topic] </HelpCommandName>
		<HelpCommandDescription>
			<span>List related topics/factors by given id or full qualified name.</span>
			<span>Examples:</span>
			<HelpCommandExample>/pipeline of 861904759133</HelpCommandExample>
			<span>List factors used in pipeline which id is 861904759133.</span>
			<HelpCommandExample>/pipeline of 'Hello World'</HelpCommandExample>
			<span>List factors used in pipeline which name is "Hello World". Single or double quote is supported when name has whitespace.</span>
			<HelpCommandExample>/pipeline of 'Hello World' in</HelpCommandExample>
			<span>List factors which are read by pipeline "Hello World".</span>
			<HelpCommandExample>/pipeline of 'Hello World' out</HelpCommandExample>
			<span>List factors which are write by pipeline "Hello World".</span>
			<HelpCommandExample>/pipeline of 'Hello World' in topic</HelpCommandExample>
			<span>List topics which are read by pipeline "Hello World".</span>
		</HelpCommandDescription>
		<HelpCommandName>-- "id or part of name"</HelpCommandName>
		<HelpCommandDescription>Find pipeline by given id or text.</HelpCommandDescription>
	</>
};
export const TopicHelpCmd: HelpCommand = {
	label: 'Topic',
	command: 'topic',
	reminder: 'Press "enter" to view help',
	trails: [],
	executableOnNoTrail: true,
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	brief: <>
		<HelpCommandName>-- topic</HelpCommandName>
		<HelpCommandDescription>Show topic command help.</HelpCommandDescription>
	</>,
	whole: <>
		<HelpCommandName>-- topic</HelpCommandName>
		<HelpCommandDescription>Show topic command help.</HelpCommandDescription>
	</>
};

const DataQualityConsanguinityIndex = () => {
	return <FullWidthPage>
		<FullWidthPageHeaderContainer>
			<PageTitle>Consanguinity</PageTitle>
		</FullWidthPageHeaderContainer>
		<CLIWrapper greeting="This channel is for working on consanguinity."
		            commands={CONSANGUINITY_COMMANDS}
		            helpCommands={[PipelineHelpCmd, TopicHelpCmd]}
		            execution={Execution}/>
	</FullWidthPage>;
};

export default DataQualityConsanguinityIndex;