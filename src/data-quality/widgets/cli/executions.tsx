import {useCliEventBus} from './cli-event-bus';
import {useEffect, useState} from 'react';
import {ExecutionCommand, ExecutionContent} from './types';
import {v4} from 'uuid';
import {CliEventTypes} from './cli-event-bus-types';
import {ExecutionWaiter} from './execution-waiter';

export const Executions = (props: {
	execution: (props: { content: ExecutionContent }) => JSX.Element;
}) => {
	const {execution: Execution} = props;

	const {on, off} = useCliEventBus();
	const [executionContents, setExecutionContents] = useState<Array<ExecutionContent>>([]);
	useEffect(() => {
		const onExecuteCommand = (command: ExecutionCommand) => {
			setExecutionContents(executionContents => [...executionContents, {id: v4(), command}]);
		};
		on(CliEventTypes.EXECUTE_COMMAND, onExecuteCommand);
		return () => {
			off(CliEventTypes.EXECUTE_COMMAND, onExecuteCommand);
		};
	}, [on, off]);

	return <>
		{executionContents.map(content => {
			return <Execution content={content} key={content.id}/>;
		})}
		<ExecutionWaiter/>
	</>;
};