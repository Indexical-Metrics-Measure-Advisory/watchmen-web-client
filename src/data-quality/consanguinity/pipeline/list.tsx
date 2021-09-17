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
import {
	buildViewPipelineCommand,
	CMD_ARGUMENT_DISABLED,
	CMD_ARGUMENT_ENABLED,
	CMD_ARGUMENT_INVALID,
	CMD_ARGUMENT_NONAME,
	CMD_ARGUMENT_VALID
} from './commands';

export const PipelineListExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;
	const {commands} = content;

	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {
		return (data?: DataQualityCacheData) => {
			const onPipelineClicked = (pipeline: Pipeline) => () => {
				fire(CliEventTypes.SUGGEST_COMMAND, buildViewPipelineCommand(pipeline));
			};
			if (data) {
				let found;
				if (commands.length > 2) {
					const cmd = commands[2];
					if (cmd.command === CMD_ARGUMENT_NONAME) {
						found = data.pipelines.filter(pipeline => pipeline.name.trim().length === 0);
					} else if (cmd.command === CMD_ARGUMENT_VALID) {
						found = data.pipelines.filter(pipeline => pipeline.validated);
					} else if (cmd.command === CMD_ARGUMENT_INVALID) {
						found = data.pipelines.filter(pipeline => !pipeline.validated);
					} else if (cmd.command === CMD_ARGUMENT_ENABLED) {
						found = data.pipelines.filter(pipeline => pipeline.enabled);
					} else if (cmd.command === CMD_ARGUMENT_DISABLED) {
						found = data.pipelines.filter(pipeline => !pipeline.enabled);
					} else {
						found = data.pipelines;
					}
				} else {
					found = data.pipelines;
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
		                          <ExecutionCommandLineArgument>list</ExecutionCommandLineArgument>
		                          {commands.length > 2
			                          ?
			                          <ExecutionCommandLineArgument>{commands[2].command}</ExecutionCommandLineArgument>
			                          : null}
	                          </>}
	                          result={result}/>;
};