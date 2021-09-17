import React, {Fragment, useEffect, useState} from 'react';
import {v4} from 'uuid';
import {CMD_HELP} from '../../../command';
import {HelpCommand} from '../../../command/types';
import {useCliEventBus} from '../events/cli-event-bus';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {ExecutionContent} from '../types';
import {ExecutionDelegate} from './execution-delegate';
import {ExecutionCommandLineArgument, ExecutionCommandLinePrimary, HelpTable} from './widgets';

export const isHelpExecution = (content: ExecutionContent) => {
	const {commands} = content;
	return commands.length >= 1 && commands[0].command === CMD_HELP;
};

export const HelpExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;
	const {commands} = content;

	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	useEffect(() => {
		const {commands} = content;
		if (commands.length === 1) {
			setResult(<HelpTable>
				{commands[0].trails.map(trail => <Fragment key={v4()}>{(trail as HelpCommand).brief}</Fragment>)}
			</HelpTable>);
		} else if (commands.length > 1) {
			setResult(<HelpTable>
				{(commands[1] as HelpCommand).whole}
			</HelpTable>);
		}
		fire(CliEventTypes.COMMAND_EXECUTED);
	}, [fire, content]);

	return <ExecutionDelegate content={content}
	                          commandLine={<>
		                          <ExecutionCommandLinePrimary>/help</ExecutionCommandLinePrimary>
		                          {commands.length > 1
			                          ?
			                          <ExecutionCommandLineArgument>{commands[1].command}</ExecutionCommandLineArgument>
			                          : null}
	                          </>}
	                          result={result}/>;
};