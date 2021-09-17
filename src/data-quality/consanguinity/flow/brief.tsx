import React from 'react';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {HelpCommandDescription, HelpCommandName} from '../../widgets/cli/execution/widgets';
import {CONSANGUINITY_HELP_COMMAND} from '../index';
import {FlowHelpCmd} from './help';

export const FlowBrief = () => {
	const {fire} = useCliEventBus();

	const onFlowHelpClicked = () => {
		fire(CliEventTypes.EXECUTE_COMMAND, [CONSANGUINITY_HELP_COMMAND, FlowHelpCmd]);
	};

	return <>
		<HelpCommandName onClick={onFlowHelpClicked}>-- flow</HelpCommandName>
		<HelpCommandDescription>Show flow command help.</HelpCommandDescription>
	</>;
};