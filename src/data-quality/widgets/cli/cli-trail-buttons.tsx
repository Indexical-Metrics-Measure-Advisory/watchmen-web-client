import {ICON_CLEAR_SCREEN, ICON_HELP} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Command} from '../../command/types';
import {useCliEventBus} from './events/cli-event-bus';
import {CliEventTypes} from './events/cli-event-bus-types';
import {CommandLineButton, CommandLineButtons} from './widgets';

export const CLITrailButtons = (props: { helpCommand: Command }) => {
	const {helpCommand} = props;

	const {fire} = useCliEventBus();
	const onClearScreenClicked = () => fire(CliEventTypes.CLEAR_SCREEN);
	const onHelpClicked = () => fire(CliEventTypes.EXECUTE_COMMAND, [helpCommand], '');

	return <CommandLineButtons>
		<CommandLineButton tooltip={{alignment: TooltipAlignment.CENTER, label: 'Clear Screen'}}
		                   onClick={onClearScreenClicked}>
			<FontAwesomeIcon icon={ICON_CLEAR_SCREEN}/>
		</CommandLineButton>
		<CommandLineButton tooltip={{alignment: TooltipAlignment.RIGHT, offsetX: 5, label: 'Help'}}
		                   onClick={onHelpClicked}>
			<FontAwesomeIcon icon={ICON_HELP}/>
		</CommandLineButton>
	</CommandLineButtons>;
};