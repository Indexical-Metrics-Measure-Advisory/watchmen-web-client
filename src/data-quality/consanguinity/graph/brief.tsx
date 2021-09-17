import React from 'react';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {HelpCommandDescription, HelpCommandName} from '../../widgets/cli/execution/widgets';
import {CONSANGUINITY_HELP_COMMAND} from '../index';
import {GraphHelpCmd} from './help';

export const GraphBrief = () => {
	const {fire} = useCliEventBus();

	const onGraphHelpClicked = () => {
		fire(CliEventTypes.EXECUTE_COMMAND, [CONSANGUINITY_HELP_COMMAND, GraphHelpCmd]);
	};

	return <>
		<HelpCommandName onClick={onGraphHelpClicked}>-- graph</HelpCommandName>
		<HelpCommandDescription>Show graph command help.</HelpCommandDescription>
	</>;
};