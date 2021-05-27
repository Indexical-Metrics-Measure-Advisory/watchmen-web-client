import {
	ExecutionCommandLine,
	ExecutionCommandResult,
	ExecutionContainer,
	ExecutionPrompt,
	ExecutionPromptFlicker
} from './widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_CMD_PROMPT} from '../../../basic-widgets/constants';
import React, {useEffect, useState} from 'react';

export const ExecutionWaiter = () => {
	return <ExecutionContainer>
		<ExecutionPrompt>
			<FontAwesomeIcon icon={ICON_CMD_PROMPT}/>
		</ExecutionPrompt>
		<ExecutionCommandLine>
			<ExecutionPromptFlicker/>
		</ExecutionCommandLine>
	</ExecutionContainer>;
}
export const ExecutionDelegate = (props: {
	commandLine: ((props: any) => React.ReactNode) | React.ReactNode;
	computeResult: () => Promise<((props: any) => React.ReactNode) | React.ReactNode>;
}) => {
	const {commandLine, computeResult} = props;

	const [result, setResult] = useState<any>(null);
	useEffect(() => {
		(async () => {
			const result = await computeResult();
			setResult(result);
		})();
	}, []);

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
			: null}
	</ExecutionContainer>;
};