import {PipelineValidateResult, validatePipeline} from '@/services/data/pipeline/pipeline-validate';
import React, {useState} from 'react';
import {DQCCacheData} from '../../cache/types';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {getPipelineName} from '../../utils';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {ExecutionDelegate} from '../../widgets/cli/execution/execution-delegate';
import {
	ExecutionCommandLineArgument,
	ExecutionCommandLinePrimary,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/execution/widgets';
import {ExecutionContent} from '../../widgets/cli/types';
import {InspectItem, InspectItems, InspectPipelineName, InspectResult} from './widgets';

const PipelineIssues = (props: { inspects: Array<PipelineValidateResult> }) => {
	const {inspects} = props;

	return <ExecutionResultItemTable>
		{inspects.map(({pipeline, messages, missIndexed}) => {
			return <InspectResult key={pipeline.pipelineId}>
				<InspectPipelineName>{getPipelineName(pipeline)}</InspectPipelineName>
				<InspectItems>
					{messages.map((message, index) => {
						return <InspectItem key={index}>{message}</InspectItem>;
					})}
					{missIndexed.map((missIndex, index) => {
						return <InspectItem key={index}>Index missed on {missIndex}</InspectItem>;
					})}
				</InspectItems>
			</InspectResult>;
		})}
	</ExecutionResultItemTable>;
};

export const PipelineInspectExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;

	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {
		return (data?: DQCCacheData) => {
			if (data) {
				const {pipelines, topics} = data;
				const inspects = pipelines.map(pipeline => validatePipeline(pipeline, topics)).filter(r => !r.pass || r.missIndexed.length !== 0);
				if (inspects.length === 0) {
					setResult(<ExecutionResultItemTable>
						<ExecutionResultNoData>No issue inspected.</ExecutionResultNoData>
					</ExecutionResultItemTable>);
				} else {
					setResult(<PipelineIssues inspects={inspects}/>);
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
		                          <ExecutionCommandLineArgument>inspect</ExecutionCommandLineArgument>
	                          </>}
	                          result={result}/>;
};