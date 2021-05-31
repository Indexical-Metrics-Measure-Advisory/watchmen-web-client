import {Greeting} from '../greeting';
import React, {ReactNode} from 'react';
import {CLIContainer, CommandArea, CommandLine, CommandLineSeparator, WorkingArea} from './widgets';
import {ExecutionContent} from './types';
import {CliEventBusProvider} from './events/cli-event-bus';
import {Executions} from './execution/executions';
import {CLITrailButtons} from './cli-trail-buttons';
import {Workbench} from './workbench';
import {HintBar} from './hint-bar';
import {ClearCmd, createHelpCmd} from '../../command';
import {Command} from '../../command/types';

const CLI = (props: {
	greeting: string;
	commands: Array<Command>;
	helpCommands: Array<Command>;
	executions: ((props: any) => ReactNode) | ReactNode
}) => {
	const {greeting, commands, helpCommands, executions} = props;

	const availableCommands = [...commands, ClearCmd, createHelpCmd(helpCommands)];

	return <CLIContainer>
		<WorkingArea>
			<Greeting>{greeting}</Greeting>
			{executions}
		</WorkingArea>
		<CommandArea>
			<CommandLine>
				<HintBar commands={availableCommands}/>
				<Workbench commands={availableCommands}/>
				<CommandLineSeparator/>
				<CLITrailButtons/>
			</CommandLine>
		</CommandArea>
	</CLIContainer>;
};

export const CLIWrapper = (props: {
	greeting: string;
	commands: Array<Command>;
	helpCommands: Array<Command>;
	execution: (props: { content: ExecutionContent }) => JSX.Element;
}) => {
	const {greeting, commands, helpCommands, execution} = props;
	return <CliEventBusProvider>
		<CLI greeting={greeting} commands={commands} helpCommands={helpCommands}
		     executions={<Executions execution={execution}/>}/>
	</CliEventBusProvider>;
};
