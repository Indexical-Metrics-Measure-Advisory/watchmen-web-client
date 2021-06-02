import {useCliEventBus} from '../events/cli-event-bus';
import {useEffect, useState} from 'react';
import {ExecutionContent} from '../types';
import {v4} from 'uuid';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {ExecutionWaiter} from './execution-waiter';
import dayjs from 'dayjs';
import {Command} from '../../../command/types';

export const Executions = (props: {
	execution: (props: { content: ExecutionContent }) => JSX.Element;
}) => {
	const {execution: Execution} = props;

	const {on, off} = useCliEventBus();
	const [executionContents, setExecutionContents] = useState<Array<ExecutionContent>>([]);
	useEffect(() => {
		const onExecuteCommand = (commands: Array<Command>) => {
			setExecutionContents(executionContents => {
				return [
					...executionContents,
					{id: v4(), commands, time: dayjs(), locked: false}
				].slice(-50);
			});
		};
		const onClearScreen = () => setExecutionContents([]);
		on(CliEventTypes.EXECUTE_COMMAND, onExecuteCommand);
		on(CliEventTypes.CLEAR_SCREEN, onClearScreen);
		return () => {
			off(CliEventTypes.EXECUTE_COMMAND, onExecuteCommand);
			off(CliEventTypes.CLEAR_SCREEN, onClearScreen);
		};
	}, [on, off]);

	return <>
		{executionContents.map(content => {
			return <Execution content={content} key={content.id}/>;
		})}
		<ExecutionWaiter/>
	</>;
};