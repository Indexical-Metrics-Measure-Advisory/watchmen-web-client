import React from 'react';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {HelpCommandDescription, HelpCommandName} from '../../widgets/cli/execution/widgets';
import {CONSANGUINITY_HELP_COMMAND} from '../index';
import {TopicHelpCmd} from './help';

export const TopicBrief = () => {
	const {fire} = useCliEventBus();

	const onTopicHelpClicked = () => {
		fire(CliEventTypes.EXECUTE_COMMAND, [CONSANGUINITY_HELP_COMMAND, TopicHelpCmd]);
	};

	return <>
		<HelpCommandName onClick={onTopicHelpClicked}>-- topic</HelpCommandName>
		<HelpCommandDescription>Show topic command help.</HelpCommandDescription>
	</>;
};