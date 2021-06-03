// noinspection DuplicatedCode

import {ExecutionContent} from '../../widgets/cli/types';
import {CMD_ARGUMENT_FACTOR, CMD_GRAPH} from './commands';
import React, {useState} from 'react';
import * as echarts from 'echarts/core';
import {ExecutionDelegate} from '../../widgets/cli/execution/execution-delegate';
import {
	ExecutionCommandLinePrimary,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/execution/widgets';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {DQCCacheData} from '../../cache/types';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {compute} from './utils';
import {GraphChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {TooltipComponent} from 'echarts/components';
import {GraphDiagram} from '../../widgets/cli/graph';

echarts.use([TooltipComponent, GraphChart, CanvasRenderer]);

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

	return <ExecutionDelegate commandLine={<ExecutionCommandLinePrimary>/graph</ExecutionCommandLinePrimary>}
	                          executeAt={content.time} result={result}/>;
};