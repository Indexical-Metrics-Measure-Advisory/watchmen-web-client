import React from 'react';
import {FullWidthPage} from '../../basic-widgets/page';
import {FullWidthPageHeaderContainer, PageTitle} from '../../basic-widgets/page-header';
import {CLIWrapper} from '../widgets/cli';
import {Execution} from './execution';
import {Command, CommandPublishedBehaviorType, HelpCommand} from '../command/types';
import {PipelineCmd} from './pipeline/commands';
import {TopicCmd} from './topic/commands';
import {HelpCommandDescription, HelpCommandName} from '../widgets/cli/execution/widgets';

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
		<HelpCommandDescription>Show pipeline command help.jkhalksjdfklajhsdfhlkajhskdnalvdknqe9eurhtiej afvajibdfgbeqkljrbglkjandklfbaklsdbjfklbaslkdfblkasdjvnlkasdnjfjklasuhetrlqhwieobfaslkdjnvlkasjdflkjashdfiouqheifnavsdkjanbslkdvjbakljsbjdoiqweuhrioqbuvabsdkljbvaskdfasn iuhaslkdfblkasjbdfklabsjdfasdf1</HelpCommandDescription>
	</>,
	whole: <>
		<HelpCommandName>-- pipeline</HelpCommandName>
		<HelpCommandDescription>Show pipeline command help.</HelpCommandDescription>
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