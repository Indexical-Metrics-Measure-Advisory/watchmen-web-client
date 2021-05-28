import {ExecutionContent} from '../../widgets/cli/types';
import {CMD_ARGUMENT_LIST} from '../commands';
import {
	ExecutionCommandArgument,
	ExecutionCommandPrimary,
	ExecutionResultClickableItem,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/widgets';
import {getPipelineName} from '../../utils';
import {ExecutionDelegate} from '../../widgets/cli/execution-delegate';
import React, {useEffect, useState} from 'react';
import {useDataQualityCacheEventBus} from '../../cache/cache-event-bus';
import {DataQualityCacheEventTypes} from '../../cache/cache-event-bus-types';
import {DataQualityCacheData} from '../../../local-persist/types';
import {CliEventTypes} from '../../widgets/cli/cli-event-bus-types';
import {useCliEventBus} from '../../widgets/cli/cli-event-bus';

export const isPipelineListCommand = (content: ExecutionContent) => {
	const {command} = content;
	if (command.length < 2) {
		return false;
	}
	return command[1].text?.trim()?.toLowerCase() === CMD_ARGUMENT_LIST;
};

export const PipelineList = (props: { content: ExecutionContent }) => {
	const {content} = props;

	const {once: onceCache} = useDataQualityCacheEventBus();
	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	useEffect(() => {
		const askData = () => {
			onceCache(DataQualityCacheEventTypes.REPLY_DATA, (data?: DataQualityCacheData) => {
				if (data) {
					setResult(<ExecutionResultItemTable>
						{data.pipelines.map((pipeline, index) => {
							return <ExecutionResultClickableItem key={pipeline.pipelineId}>
								{index + 1}. {getPipelineName(pipeline)}
							</ExecutionResultClickableItem>;
						})}
					</ExecutionResultItemTable>);
				} else {
					setResult(<ExecutionResultItemTable>
						<ExecutionResultNoData/>
					</ExecutionResultItemTable>);
				}
				fire(CliEventTypes.COMMAND_EXECUTED);
			}).fire(DataQualityCacheEventTypes.ASK_DATA);
		};
		const askDataLoaded = (askData: () => void) => {
			onceCache(DataQualityCacheEventTypes.REPLY_DATA_LOADED, (loaded) => {
				if (loaded) {
					askData();
				} else {
					setTimeout(() => askDataLoaded(askData), 100);
				}
			}).fire(DataQualityCacheEventTypes.ASK_DATA_LOADED);
		};
		askDataLoaded(askData);
	}, [onceCache, fire, content]);

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandPrimary>/pipeline</ExecutionCommandPrimary>
		<ExecutionCommandArgument>list</ExecutionCommandArgument>
	</>} result={result}/>;
};