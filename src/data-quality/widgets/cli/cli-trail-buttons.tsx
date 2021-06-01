import {CommandLineButton, CommandLineButtons} from './widgets';
import {TooltipAlignment} from '../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_HELP} from '../../../basic-widgets/constants';
import React from 'react';
import {useCliEventBus} from './events/cli-event-bus';
import {Command} from '../../command/types';
import {CliEventTypes} from './events/cli-event-bus-types';

export const CLITrailButtons = (props: { helpCommand: Command }) => {
	const {helpCommand} = props;

	const {fire} = useCliEventBus();
	const onHelpClicked = () => {
		fire(CliEventTypes.EXECUTE_COMMAND, [helpCommand], '');
	};

	return <CommandLineButtons>
		<CommandLineButton tooltip={{alignment: TooltipAlignment.RIGHT, offsetX: 5, label: 'Help'}}
		                   onClick={onHelpClicked}>
			<FontAwesomeIcon icon={ICON_HELP}/>
		</CommandLineButton>
	</CommandLineButtons>;
};