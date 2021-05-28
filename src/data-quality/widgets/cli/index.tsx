import {Greeting} from '../greeting';
import React, {ReactNode} from 'react';
import {CLIContainer, CommandArea, CommandLine, CommandLineSeparator, WorkingArea} from './widgets';
import {Command, ExecutionContent} from './types';
import {CliEventBusProvider} from './events/cli-event-bus';
import {Executions} from './execution/executions';
import {Shortcuts} from './shortcuts';
import {CLITrailButtons} from './cli-trail-buttons';
import {Workbench} from './workbench';

const CLI = (props: {
	greeting: string;
	commands: Array<Command>;
	executions: ((props: any) => ReactNode) | ReactNode
}) => {
	const {greeting, commands, executions} = props;

	return <CLIContainer>
		<WorkingArea>
			<Greeting>{greeting}</Greeting>
			{executions}
		</WorkingArea>
		<CommandArea>
			<CommandLine>
				<Shortcuts commands={commands}/>
				<CommandLineSeparator/>
				<Workbench commands={commands}/>
				<CommandLineSeparator/>
				<CLITrailButtons/>
			</CommandLine>
		</CommandArea>
	</CLIContainer>;
};

export const CLIWrapper = (props: {
	greeting: string;
	commands: Array<Command>;
	execution: (props: { content: ExecutionContent }) => JSX.Element;
}) => {
	const {greeting, commands, execution} = props;
	return <CliEventBusProvider>
		<CLI greeting={greeting} commands={commands} executions={<Executions execution={execution}/>}/>
	</CliEventBusProvider>;
};
