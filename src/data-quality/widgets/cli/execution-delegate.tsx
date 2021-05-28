import {ExecutionCommandLine, ExecutionCommandResult, ExecutionContainer, ExecutionPrompt} from './widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_CMD_PROMPT, ICON_LOADING} from '../../../basic-widgets/constants';
import React from 'react';

export const ExecutionDelegate = (props: {
	commandLine: ((props: any) => React.ReactNode) | React.ReactNode;
	result?: ((props: any) => React.ReactNode) | React.ReactNode;
}) => {
	const {commandLine, result} = props;

	return <ExecutionContainer>
		<ExecutionPrompt>
			<FontAwesomeIcon icon={ICON_CMD_PROMPT}/>
		</ExecutionPrompt>
		<ExecutionCommandLine>
			{commandLine}
		</ExecutionCommandLine>
		{result
			? <ExecutionCommandResult>
				{result}
			</ExecutionCommandResult>
			: <ExecutionCommandResult>
				<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
			</ExecutionCommandResult>}
	</ExecutionContainer>;
};
