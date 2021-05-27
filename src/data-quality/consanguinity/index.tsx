import React from 'react';
import {FullWidthPage} from '../../basic-widgets/page';
import {FullWidthPageHeaderContainer, PageTitle} from '../../basic-widgets/page-header';
import {CLI} from '../widgets/cli';
import {ExecutionCommand} from '../widgets/cli/types';
import {ConsanguinityEventBusProvider, useConsanguinityEventBus} from './consanguinity-event-bus';
import {Executions} from './executions';
import {ConsanguinityEventTypes} from './consanguinity-event-bus-types';
import {CONSANGUINITY_COMMANDS} from './commands';

const CLIWrapper = () => {
	const {fire} = useConsanguinityEventBus();
	const onExecuteCommand = (command: ExecutionCommand) => {
		fire(ConsanguinityEventTypes.EXECUTE_COMMAND, command);
	};

	return <CLI greeting="This channel is for working on consanguinity."
	            shortcuts={CONSANGUINITY_COMMANDS}
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