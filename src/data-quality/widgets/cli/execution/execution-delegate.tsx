import {ICON_CMD_PROMPT, ICON_LOADING, ICON_LOCK, ICON_UNLOCK} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ReactNode} from 'react';
import {ExecutionContent} from '../types';
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
	commandLine: ((props: any) => ReactNode) | ReactNode;
	result?: ((props: any) => ReactNode) | ReactNode;
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
