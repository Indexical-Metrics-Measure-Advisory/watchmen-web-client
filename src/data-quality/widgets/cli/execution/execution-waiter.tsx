import {ExecutionCommandLine, ExecutionContainer, ExecutionPrompt, ExecutionPromptFlicker} from './widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_CMD_PROMPT} from '../../../../basic-widgets/constants';
import React, {useEffect, useRef, useState} from 'react';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {useCliEventBus} from '../events/cli-event-bus';

export const ExecutionWaiter = () => {
	const {on, off} = useCliEventBus();
	// noinspection TypeScriptValidateTypes
	const ref = useRef<HTMLDivElement>(null);
	const [executing, setExecuting] = useState(false);
	useEffect(() => {
		const onExecuteCommand = () => setExecuting(true);
		on(CliEventTypes.EXECUTE_COMMAND, onExecuteCommand);
		return () => {
			off(CliEventTypes.EXECUTE_COMMAND, onExecuteCommand);
		};
	}, [on, off]);
	useEffect(() => {
		const onCommandExecuted = () => setExecuting(false);
		on(CliEventTypes.COMMAND_EXECUTED, onCommandExecuted);
		return () => {
			off(CliEventTypes.COMMAND_EXECUTED, onCommandExecuted);
		};
	}, [on, off]);
	useEffect(() => {
		ref.current?.scrollIntoView({behavior: 'smooth'});
	}, [executing]);

	if (executing) {
		return null;
	}

	return <ExecutionContainer ref={ref}>
		<ExecutionPrompt>
			<FontAwesomeIcon icon={ICON_CMD_PROMPT}/>
		</ExecutionPrompt>
		<ExecutionCommandLine>
			<ExecutionPromptFlicker/>
		</ExecutionCommandLine>
	</ExecutionContainer>;
};
