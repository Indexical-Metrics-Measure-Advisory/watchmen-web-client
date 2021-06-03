import {
	ExecutionCommandLine,
	ExecutionContainer,
	ExecutionLockButton,
	ExecutionPrompt,
	ExecutionResult,
	ExecutionTimeContainer,
	ExecutionTimeLabel,
	ExecutionTimeLine
} from './widgets';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_CMD_PROMPT, ICON_LOADING, ICON_LOCK, ICON_UNLOCK} from '../../../../basic-widgets/constants';
import React from 'react';
import {useForceUpdate} from '../../../../basic-widgets/utils';
import {ExecutionContent} from '../types';

const ExecutionOperators = (props: {
	content: ExecutionContent;
}) => {
	const {content} = props;

	const forceUpdate = useForceUpdate();
	const onLockClicked = () => {
		content.locked = !content.locked;
		forceUpdate();
	};

	const {time: executeAt, locked} = content;
	const executeTime = executeAt ? (executeAt.isToday() ? executeAt.format('HH:mm:ss') : executeAt.fromNow()) : '';

	return <ExecutionTimeContainer>
		<ExecutionTimeLine/>
		<ExecutionTimeLabel>{executeTime}</ExecutionTimeLabel>
		<ExecutionLockButton onClick={onLockClicked}>
			<FontAwesomeIcon icon={locked ? ICON_UNLOCK : ICON_LOCK}/>
		</ExecutionLockButton>
	</ExecutionTimeContainer>;
};

export const ExecutionDelegate = (props: {
	content: ExecutionContent;
	commandLine: ((props: any) => React.ReactNode) | React.ReactNode;
	result?: ((props: any) => React.ReactNode) | React.ReactNode;
}) => {
	const {content, commandLine, result} = props;

	return <ExecutionContainer>
		<ExecutionPrompt>
			<FontAwesomeIcon icon={ICON_CMD_PROMPT}/>
		</ExecutionPrompt>
		<ExecutionCommandLine>
			{commandLine}
		</ExecutionCommandLine>
		<ExecutionOperators content={content}/>
		{result
			? <ExecutionResult>
				{result}
			</ExecutionResult>
			: <ExecutionResult>
				<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
			</ExecutionResult>}
	</ExecutionContainer>;
};
