// noinspection DuplicatedCode

import React, {useState} from 'react';
import {DQCCacheData} from '../../cache/types';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {ExecutionDelegate} from '../../widgets/cli/execution/execution-delegate';
import {
	ExecutionCommandLinePrimary,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/execution/widgets';
import {GraphDiagram} from '../../widgets/cli/graph';
import {ExecutionContent} from '../../widgets/cli/types';
import {CMD_ARGUMENT_FACTOR, CMD_GRAPH} from './commands';
import {compute} from './utils';

export const isGraphExecution = (content: ExecutionContent) => {
	const {commands} = content;
	return commands[0].command === CMD_GRAPH;
};

export const GraphExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;
	const {commands} = content;

	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {
		return (data?: DQCCacheData) => {
			if (data) {
				const showFactor = commands[1] && commands[1].command === CMD_ARGUMENT_FACTOR;
				const options = compute({maps: data.maps, relations: data.relations, showFactor});
				if (!options) {
					setResult(<ExecutionResultItemTable>
						<ExecutionResultNoData>No data flow found.</ExecutionResultNoData>
					</ExecutionResultItemTable>);
				} else {
					setResult(<GraphDiagram options={options}/>);
				}
			} else {
				setResult(<ExecutionResultItemTable>
					<ExecutionResultNoData>No data flow found.</ExecutionResultNoData>
				</ExecutionResultItemTable>);
			}
			fire(CliEventTypes.COMMAND_EXECUTED);
		};
	});
	useDataQualityCacheData({onDataRetrieved});

	return <ExecutionDelegate content={content}
	                          commandLine={<ExecutionCommandLinePrimary>/graph</ExecutionCommandLinePrimary>}
	                          result={result}/>;
};