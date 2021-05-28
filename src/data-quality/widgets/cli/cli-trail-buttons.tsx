import {CommandLineButton, CommandLineButtons} from './widgets';
import {ButtonInk, TooltipAlignment} from '../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_HELP, ICON_SEND} from '../../../basic-widgets/constants';
import React, {useEffect, useState} from 'react';
import {useCliEventBus} from './events/cli-event-bus';
import {CliEventTypes} from './events/cli-event-bus-types';

export const CLITrailButtons = () => {
	const {on, off, fire} = useCliEventBus();
	const [solvable, setSolvable] = useState(false);
	useEffect(() => {
		const onCommandSolvableChange = (solvable: boolean) => setSolvable(solvable);
		on(CliEventTypes.COMMAND_SOLVABLE_CHANGED, onCommandSolvableChange);
		return () => {
			off(CliEventTypes.COMMAND_SOLVABLE_CHANGED, onCommandSolvableChange);
		};
	}, [on, off]);

	const onSendCommandClicked = () => {
		fire(CliEventTypes.SEND_COMMAND);
	};
	const onHelpClicked = () => {
		// TODO help command
	};

	return <CommandLineButtons>
		<CommandLineButton
			tooltip={{alignment: TooltipAlignment.RIGHT, offsetX: 5, label: 'Send Command'}}
			disabled={!solvable}
			ink={solvable ? ButtonInk.SUCCESS : ButtonInk.WAIVE}
			onClick={onSendCommandClicked}>
			<FontAwesomeIcon icon={ICON_SEND}/>
		</CommandLineButton>
		<CommandLineButton tooltip={{alignment: TooltipAlignment.RIGHT, offsetX: 5, label: 'Help'}}
		                   onClick={onHelpClicked}>
			<FontAwesomeIcon icon={ICON_HELP}/>
		</CommandLineButton>
	</CommandLineButtons>;
};