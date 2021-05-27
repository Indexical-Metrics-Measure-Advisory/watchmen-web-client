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
import React from 'react';

export const PipelineList = (props: { content: ExecutionContent }) => {
	const {content} = props;

	if (content.command.length < 2) {
		return null;
	}
	if (content.command[0].command !== CMD_PIPELINE) {
		return null;
	}
	if (content.command[1].text?.trim()?.toLowerCase() !== CMD_PIPELINE_LIST) {
		return null;
	}

	const computeResult = async () => {
		return <ExecutionResultItemTable>
			{DemoPipelines.map(pipeline => {
				return <ExecutionResultClickableItem key={pipeline.pipelineId}>
					{getPipelineName(pipeline)}
				</ExecutionResultClickableItem>;
			})}
		</ExecutionResultItemTable>;
	};

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandPrimary>/pipeline</ExecutionCommandPrimary>
		<ExecutionCommandArgument>list</ExecutionCommandArgument>
	</>} computeResult={computeResult}/>;
};