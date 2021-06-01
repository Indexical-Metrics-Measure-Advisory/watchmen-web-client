import {ExecutionContent} from '../../widgets/cli/types';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import React, {useState} from 'react';
import {DataQualityCacheData} from '../../../local-persist/types';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {buildUsePipelineCommand} from './commands';
import {
	ExecutionCommandLineArgument,
	ExecutionCommandLinePrimary,
	ExecutionResultClickableItem,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/execution/widgets';
import {getPipelineName} from '../../utils';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {ExecutionDelegate} from '../../widgets/cli/execution/execution-delegate';

export const PipelineFindExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;
	const {commands} = content;
	const text = commands[1].command.trim();

	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {
		return (data?: DataQualityCacheData) => {
			const onPipelineClicked = (pipeline: Pipeline) => () => {
				fire(CliEventTypes.SUGGEST_COMMAND, buildUsePipelineCommand(pipeline));
			};
			if (data) {
				// assume text is id first
				let found = data.pipelines.filter(pipeline => pipeline.pipelineId === text);
				if (found.length === 0) {
					const find = text.toLowerCase();
					found = data.pipelines.filter(pipeline => pipeline.name.toLowerCase().includes(find));
				}
				if (found.length === 0) {
					setResult(<ExecutionResultItemTable>
						<ExecutionResultNoData>No matched pipeline found.</ExecutionResultNoData>
					</ExecutionResultItemTable>);
				} else {
					setResult(<ExecutionResultItemTable>
						{found.map((pipeline, index) => {
							return <ExecutionResultClickableItem onClick={onPipelineClicked(pipeline)}
							                                     key={pipeline.pipelineId}>
								{index + 1}. {getPipelineName(pipeline)}
							</ExecutionResultClickableItem>;
						})}
					</ExecutionResultItemTable>);
				}
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
		<ExecutionCommandLineArgument>"{text}"</ExecutionCommandLineArgument>
	</>} executeAt={content.time} result={result}/>;
};