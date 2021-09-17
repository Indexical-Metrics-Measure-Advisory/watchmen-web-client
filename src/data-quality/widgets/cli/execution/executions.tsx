import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {Command} from '../../../command/types';
import {useCliEventBus} from '../events/cli-event-bus';
import {CliEventTypes} from '../events/cli-event-bus-types';
import {ExecutionContent} from '../types';
import {ExecutionWaiter} from './execution-waiter';

export const Executions = (props: {
	execution: (props: { content: ExecutionContent }) => JSX.Element;
}) => {
	const {execution: Execution} = props;

	const {on, off} = useCliEventBus();
	const [executionContents, setExecutionContents] = useState<Array<ExecutionContent>>([]);
	useEffect(() => {
		const onExecuteCommand = (commands: Array<Command>) => {
			setExecutionContents(executionContents => {
				if (executionContents.length >= 30) {
					let removed = false;
					return [
						...executionContents.filter(content => {
							if (!removed && !content.locked) {
								removed = true;
								return false;
							}
							return true;
						}),
						{id: v4(), commands, time: dayjs(), locked: false}
					];
				} else {
					return [
						...executionContents,
						{id: v4(), commands, time: dayjs(), locked: false}
					];
				}
			});
		};
		const onClearScreen = () => setExecutionContents(executionContents => executionContents.filter(content => content.locked));
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