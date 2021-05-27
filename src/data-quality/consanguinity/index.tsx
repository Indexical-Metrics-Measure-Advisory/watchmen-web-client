import React from 'react';
import {FullWidthPage} from '../../basic-widgets/page';
import {FullWidthPageHeaderContainer, PageTitle} from '../../basic-widgets/page-header';
import {CLI} from '../widgets/cli';
import {ICON_PIPELINE, ICON_TOPIC} from '../../basic-widgets/constants';
import {CommandShortcut, ExecutionCommand} from '../widgets/cli/types';
import {ConsanguinityEventBusProvider, useConsanguinityEventBus} from './consanguinity-event-bus';
import {Executions} from './executions';
import {ConsanguinityEventTypes} from './consanguinity-event-bus-types';
import {CMD_PIPELINE, CMD_TOPIC} from './commands';

const SHORTCUTS: Array<CommandShortcut> = [
	{
		label: 'Find Pipeline',
		command: CMD_PIPELINE,
		icon: ICON_PIPELINE,
		reminder: 'A text to match name, or "list" to list all',
		standalone: true
	},
	{
		label: 'Find Topic',
		command: CMD_TOPIC,
		icon: ICON_TOPIC,
		reminder: 'A text to match name, or "list" to list all.',
		standalone: true
	}
];

const CLIWrapper = () => {
	const {fire} = useConsanguinityEventBus();
	const onExecuteCommand = (command: ExecutionCommand) => {
		fire(ConsanguinityEventTypes.EXECUTE_COMMAND, command);
	};

	return <CLI greeting="This channel is for working on consanguinity."
	            shortcuts={SHORTCUTS}
	            executeCommand={onExecuteCommand}
	            executions={<Executions/>}
	/>;
};

const DataQualityConsanguinityIndex = () => {
	return <FullWidthPage>
		<FullWidthPageHeaderContainer>
			<PageTitle>Consanguinity</PageTitle>
		</FullWidthPageHeaderContainer>
		<ConsanguinityEventBusProvider>
			<CLIWrapper/>
		</ConsanguinityEventBusProvider>
	</FullWidthPage>;
};

export default DataQualityConsanguinityIndex;