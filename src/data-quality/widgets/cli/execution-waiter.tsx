import {ExecutionCommandLine, ExecutionContainer, ExecutionPrompt, ExecutionPromptFlicker} from './widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_CMD_PROMPT} from '../../../basic-widgets/constants';
import React from 'react';

export const ExecutionWaiter = () => {
	return <ExecutionContainer>
		<ExecutionPrompt>
			<FontAwesomeIcon icon={ICON_CMD_PROMPT}/>
		</ExecutionPrompt>
		<ExecutionCommandLine>
			<ExecutionPromptFlicker/>
		</ExecutionCommandLine>
	</ExecutionContainer>;
};
