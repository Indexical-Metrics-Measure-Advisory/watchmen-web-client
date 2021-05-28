import {ExecutionContent} from '../../widgets/cli/types';
import {buildWithPipelineCommand, CMD_ARGUMENT_LIST} from '../commands';
import {
	ExecutionCommandArgument,
	ExecutionCommandPrimary,
	ExecutionResultClickableItem,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/widgets';
import {getPipelineName} from '../../utils';
import {ExecutionDelegate} from '../../widgets/cli/execution-delegate';
import React, {useState} from 'react';
import {DataQualityCacheData} from '../../../local-persist/types';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {useCliEventBus} from '../../widgets/cli/cli-event-bus';
import {CliEventTypes} from '../../widgets/cli/cli-event-bus-types';
import {Pipeline} from '../../../services/tuples/pipeline-types';

export const isPipelineListCommand = (content: ExecutionContent) => {
	const {command} = content;
	if (command.length < 2) {
		return false;
	}
	return command[1].text?.trim()?.toLowerCase() === CMD_ARGUMENT_LIST;
};

// noinspection JSUnusedLocalSymbols
export const PipelineList = (props: { content: ExecutionContent }) => {
	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {

		return (data?: DataQualityCacheData) => {
			const onPipelineClicked = (pipeline: Pipeline) => () => {
				fire(CliEventTypes.SUGGEST_COMMAND, buildWithPipelineCommand(pipeline));
			};
			if (data) {
				setResult(<ExecutionResultItemTable>
					{data.pipelines.map((pipeline, index) => {
						return <ExecutionResultClickableItem onClick={onPipelineClicked(pipeline)}
						                                     key={pipeline.pipelineId}>
							{index + 1}. {getPipelineName(pipeline)}
						</ExecutionResultClickableItem>;
					})}
				</ExecutionResultItemTable>);
			} else {
				setResult(<ExecutionResultItemTable>
					<ExecutionResultNoData>No matched pipeline found.</ExecutionResultNoData>
				</ExecutionResultItemTable>);
			}
			fire(CliEventTypes.COMMAND_EXECUTED);
		};
	});
	useDataQualityCacheData({onDataRetrieved});

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandPrimary>/pipeline</ExecutionCommandPrimary>
		<ExecutionCommandArgument>list</ExecutionCommandArgument>
	</>} result={result}/>;
};