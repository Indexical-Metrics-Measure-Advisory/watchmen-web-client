import {useConsanguinityEventBus} from './consanguinity-event-bus';
import {useEffect, useState} from 'react';
import {ExecutionCommand, ExecutionContent} from '../widgets/cli/types';
import {ConsanguinityEventTypes} from './consanguinity-event-bus-types';
import {v4} from 'uuid';
import {Execution} from './execution';
import {ExecutionWaiter} from '../widgets/cli/execution-delegate';

export const Executions = () => {
	const {on, off} = useConsanguinityEventBus();

	const [executionContents, setExecutionContents] = useState<Array<ExecutionContent>>([]);
	useEffect(() => {
		const onExecuteCommand = (command: ExecutionCommand) => {
			setExecutionContents(executionContents => [...executionContents, {id: v4(), command}]);
		};
		on(ConsanguinityEventTypes.EXECUTE_COMMAND, onExecuteCommand);
		return () => {
			off(ConsanguinityEventTypes.EXECUTE_COMMAND, onExecuteCommand);
		};
	}, [on, off]);

	return <>
		{executionContents.map(content => {
			return <Execution content={content} key={content.id}/>;
		})}
		<ExecutionWaiter/>
	</>;
};