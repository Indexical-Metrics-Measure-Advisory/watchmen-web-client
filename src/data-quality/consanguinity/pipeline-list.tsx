import {ExecutionContent} from '../widgets/cli/types';
import {CMD_PIPELINE, CMD_PIPELINE_LIST} from './commands';
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

const ignore = (content: ExecutionContent) => {
	if (content.command.length < 2) {
		return true;
	}
	if (content.command[0].command !== CMD_PIPELINE) {
		return true;
	}
	if (content.command[1].text?.trim()?.toLowerCase() !== CMD_PIPELINE_LIST) {
		return true;
	}
};

export const PipelineList = (props: { content: ExecutionContent }) => {
	const {content} = props;

	const [result, setResult] = useState<any>();
	useEffect(() => {
		if (ignore(content)) {
			return;
		}
		const computeResult = () => {
			return <ExecutionResultItemTable>
				{DemoPipelines.map(pipeline => {
					return <ExecutionResultClickableItem key={pipeline.pipelineId}>
						{getPipelineName(pipeline)}
					</ExecutionResultClickableItem>;
				})}
			</ExecutionResultItemTable>;
		};
		setResult(computeResult());
	}, [content]);

	if (ignore(content)) {
		return null;
	}

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandPrimary>/pipeline</ExecutionCommandPrimary>
		<ExecutionCommandArgument>list</ExecutionCommandArgument>
	</>} result={result}/>;
};