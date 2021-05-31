import {ExecutionContent} from '../../widgets/cli/types';
import {
	ExecutionCommandLineArgument,
	ExecutionCommandLinePrimary,
	ExecutionResultClickableItem,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/execution/widgets';
import {getPipelineName} from '../../utils';
import {ExecutionDelegate} from '../../widgets/cli/execution/execution-delegate';
import React, {useState} from 'react';
import {DataQualityCacheData} from '../../../local-persist/types';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {buildUsePipelineCommand, CMD_PIPELINE} from './commands';

export const isPipelineExecution = (content: ExecutionContent) => {
	const {commands} = content;
	return commands.length > 1 && commands[0].command === CMD_PIPELINE;
};

export const PipelineExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;

	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {
		return (data?: DataQualityCacheData) => {
			const onPipelineClicked = (pipeline: Pipeline) => () => {
				fire(CliEventTypes.SUGGEST_COMMAND, buildUsePipelineCommand(pipeline));
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
		<ExecutionCommandLinePrimary>/pipeline</ExecutionCommandLinePrimary>
		<ExecutionCommandLineArgument>list</ExecutionCommandLineArgument>
	</>} executeAt={content.time} result={result}/>;
};