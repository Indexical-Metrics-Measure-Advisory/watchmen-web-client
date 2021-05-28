import {ExecutionContent} from '../widgets/cli/types';
import {CMD_ARGUMENT_LIST, CMD_PIPELINE} from './commands';
import {
	ExecutionCommandArgument,
	ExecutionCommandPrimary,
	ExecutionResultClickableItem,
	ExecutionResultItemTable
} from '../widgets/cli/widgets';
import {DemoPipelines} from '../../services/mock/pipeline/mock-data-pipelines';
import {getPipelineName} from '../utils';
import {ExecutionDelegate} from '../widgets/cli/execution-delegate';
import React, {useEffect, useState} from 'react';
import {useConsanguinityEventBus} from './consanguinity-event-bus';
import {ConsanguinityEventTypes} from './consanguinity-event-bus-types';

const ignore = (content: ExecutionContent) => {
	if (content.command.length < 2) {
		return true;
	}
	if (content.command[0].command !== CMD_PIPELINE) {
		return true;
	}
	if (content.command[1].text?.trim()?.toLowerCase() !== CMD_ARGUMENT_LIST) {
		return true;
	}
};

export const PipelineList = (props: { content: ExecutionContent }) => {
	const {content} = props;

	const {fire} = useConsanguinityEventBus();
	const [result, setResult] = useState<any>();
	useEffect(() => {
		if (ignore(content)) {
			return;
		}
		const computeResult = () => {
			const pipelines = DemoPipelines;
			return <ExecutionResultItemTable>
				{pipelines.map((pipeline, index) => {
					return <ExecutionResultClickableItem key={pipeline.pipelineId}>
						{index + 1}. {getPipelineName(pipeline)}
					</ExecutionResultClickableItem>;
				})}
			</ExecutionResultItemTable>;
		};
		setResult(computeResult());
		fire(ConsanguinityEventTypes.COMMAND_EXECUTED);
	}, [fire, content]);

	if (ignore(content)) {
		return null;
	}

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandPrimary>/pipeline</ExecutionCommandPrimary>
		<ExecutionCommandArgument>list</ExecutionCommandArgument>
	</>} result={result}/>;
};