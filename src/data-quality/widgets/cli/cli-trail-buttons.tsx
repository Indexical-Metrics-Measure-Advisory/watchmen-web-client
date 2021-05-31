import {CommandLineButton, CommandLineButtons} from './widgets';
import {TooltipAlignment} from '../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_HELP} from '../../../basic-widgets/constants';
import React from 'react';

export const CLITrailButtons = () => {
	const onHelpClicked = () => {
		// TODO execute help command
	};

	return <CommandLineButtons>
		<CommandLineButton tooltip={{alignment: TooltipAlignment.RIGHT, offsetX: 5, label: 'Help'}}
		                   onClick={onHelpClicked}>
			<FontAwesomeIcon icon={ICON_HELP}/>
		</CommandLineButton>
	</CommandLineButtons>;
};