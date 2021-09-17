import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {DataQualityCacheData} from '@/services/local-persist/types';
import React, {useState} from 'react';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {getPipelineName} from '../../utils';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {ExecutionDelegate} from '../../widgets/cli/execution/execution-delegate';
import {
	ExecutionCommandLineArgument,
	ExecutionCommandLinePrimary,
	ExecutionResultClickableItem,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/execution/widgets';
import {ExecutionContent} from '../../widgets/cli/types';
import {buildViewPipelineCommand} from './commands';

export const PipelineFindExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;
	const {commands} = content;
	const text = commands[1].command.trim();

	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {
		return (data?: DataQualityCacheData) => {
			const onPipelineClicked = (pipeline: Pipeline) => () => {
				fire(CliEventTypes.SUGGEST_COMMAND, buildViewPipelineCommand(pipeline));
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

	return <ExecutionDelegate content={content}
	                          commandLine={<>
		                          <ExecutionCommandLinePrimary>/pipeline</ExecutionCommandLinePrimary>
		                          <ExecutionCommandLineArgument>"{text}"</ExecutionCommandLineArgument>
	                          </>}
	                          result={result}/>;
};