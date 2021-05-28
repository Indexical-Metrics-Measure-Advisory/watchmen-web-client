import {
	ExecutionCommandLine,
	ExecutionResult,
	ExecutionContainer,
	ExecutionPrompt,
	ExecutionTimeContainer,
	ExecutionTimeLabel,
	ExecutionTimeLine
} from './widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_CMD_PROMPT, ICON_LOADING} from '../../../../basic-widgets/constants';
import React from 'react';
import {Dayjs} from 'dayjs';

export const ExecutionDelegate = (props: {
	commandLine: ((props: any) => React.ReactNode) | React.ReactNode;
	executeAt: Dayjs;
	result?: ((props: any) => React.ReactNode) | React.ReactNode;
}) => {
	const {commandLine, executeAt, result} = props;

	const executeTime = executeAt ? (executeAt.isToday() ? executeAt.format('HH:mm:ss') : executeAt.fromNow()) : '';

	return <ExecutionContainer>
		<ExecutionPrompt>
			<FontAwesomeIcon icon={ICON_CMD_PROMPT}/>
		</ExecutionPrompt>
		<ExecutionCommandLine>
			{commandLine}
		</ExecutionCommandLine>
		<ExecutionTimeContainer>
			<ExecutionTimeLine/>
			<ExecutionTimeLabel>{executeTime}</ExecutionTimeLabel>
		</ExecutionTimeContainer>
		{result
			? <ExecutionResult>
				{result}
			</ExecutionResult>
			: <ExecutionResult>
				<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
			</ExecutionResult>}
	</ExecutionContainer>;
};
