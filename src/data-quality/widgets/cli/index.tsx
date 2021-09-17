import React, {ReactNode} from 'react';
import {ClearCmd} from '../../command';
import {Command} from '../../command/types';
import {Greeting} from '../greeting';
import {CLITrailButtons} from './cli-trail-buttons';
import {CliEventBusProvider} from './events/cli-event-bus';
import {Executions} from './execution/executions';
import {HintBar} from './hint-bar';
import {ExecutionContent} from './types';
import {CLIContainer, CommandArea, CommandLine, CommandLineSeparator, WorkingArea} from './widgets';
import {Workbench} from './workbench';

const CLI = (props: {
	greeting: string;
	commands: Array<Command>;
	helpCommand: Command;
	executions: ((props: any) => ReactNode) | ReactNode
}) => {
	const {greeting, commands, helpCommand, executions} = props;

	const availableCommands = [...commands, ClearCmd, helpCommand];

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
				<CLITrailButtons helpCommand={helpCommand}/>
			</CommandLine>
		</CommandArea>
	</CLIContainer>;
};

export const CLIWrapper = (props: {
	greeting: string;
	commands: Array<Command>;
	helpCommand: Command;
	execution: (props: { content: ExecutionContent }) => JSX.Element;
}) => {
	const {greeting, commands, helpCommand, execution} = props;

	return <CliEventBusProvider>
		<CLI greeting={greeting} commands={commands} helpCommand={helpCommand}
		     executions={<Executions execution={execution}/>}/>
	</CliEventBusProvider>;
};
export {matchCommand} from './utils';