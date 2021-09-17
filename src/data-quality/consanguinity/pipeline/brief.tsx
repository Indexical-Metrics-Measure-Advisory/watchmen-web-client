import React from 'react';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {HelpCommandDescription, HelpCommandName} from '../../widgets/cli/execution/widgets';
import {CONSANGUINITY_HELP_COMMAND} from '../index';
import {PipelineHelpCmd} from './help';

export const PipelineBrief = () => {
	const {fire} = useCliEventBus();

	const onPipelineHelpClicked = () => {
		fire(CliEventTypes.EXECUTE_COMMAND, [CONSANGUINITY_HELP_COMMAND, PipelineHelpCmd]);
	};

	return <>
		<HelpCommandName onClick={onPipelineHelpClicked}>-- pipeline</HelpCommandName>
		<HelpCommandDescription>Show pipeline command help.</HelpCommandDescription>
	</>;
};