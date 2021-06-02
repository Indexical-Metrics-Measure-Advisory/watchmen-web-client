import {ExecutionContent} from '../../widgets/cli/types';
import {CMD_ARGUMENT_START, CMD_ARGUMENT_STOP, CMD_FLOW} from './commands';
import React, {useEffect, useRef, useState} from 'react';
import * as echarts from 'echarts/core';
import {EChartsType} from 'echarts/core';
import {ExecutionDelegate} from '../../widgets/cli/execution/execution-delegate';
import {
	ExecutionCommandLineArgument,
	ExecutionCommandLinePrimary,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/execution/widgets';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {DQCCacheData} from '../../cache/types';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {compute} from './utils';
import {SankeyChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {FlowContainer} from './widgets';
import {TooltipComponent} from 'echarts/components';

echarts.use([TooltipComponent, SankeyChart, CanvasRenderer]);

export const isFlowExecution = (content: ExecutionContent) => {
	const {commands} = content;
	return commands[0].command === CMD_FLOW;
};

const FlowDiagram = (props: { options: any }) => {
	// noinspection DuplicatedCode
	const {options} = props;

	// noinspection TypeScriptValidateTypes
	const rootRef = useRef<HTMLDivElement>(null);
	const [chartInstance, setChartInstance] = useState<EChartsType | null>(null);
	useEffect(() => {
		if (!chartInstance) {
			setChartInstance(echarts.init(rootRef.current!));
		} else {
			// console.log(JSON.stringify(options));
			chartInstance.setOption(options, true);
		}
	}, [options, chartInstance]);
	useEffect(() => {
		if (rootRef.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				if (chartInstance) {
					chartInstance.resize();
				}
			});
			resizeObserver.observe(rootRef.current);
			return () => resizeObserver.disconnect();
		}
	});

	return <FlowContainer ref={rootRef}/>;
};
export const FlowExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;
	const {commands} = content;
	const [, ...args] = commands;

	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {
		return (data?: DQCCacheData) => {
			if (data) {
				let starts: string | undefined;
				let stops: string | undefined;
				if (args[0]) {
					if (args[0].command === CMD_ARGUMENT_START) {
						starts = args[1]?.command.trim();
					} else if (args[0].command === CMD_ARGUMENT_STOP) {
						stops = args[1]?.command.trim();
					}
				}
				if (args[2]) {
					if (args[2].command === CMD_ARGUMENT_START) {
						starts = args[3]?.command.trim();
					} else if (args[2].command === CMD_ARGUMENT_STOP) {
						stops = args[3]?.command.trim();
					}
				}
				const options = compute({maps: data.maps, relations: data.relations, starts, stops});
				if (!options) {
					setResult(<ExecutionResultItemTable>
						<ExecutionResultNoData>No matched data found.</ExecutionResultNoData>
					</ExecutionResultItemTable>);
				} else {
					setResult(<FlowDiagram options={options}/>);
				}
			} else {
				setResult(<ExecutionResultItemTable>
					<ExecutionResultNoData>No matched data found.</ExecutionResultNoData>
				</ExecutionResultItemTable>);
			}
			fire(CliEventTypes.COMMAND_EXECUTED);
		};
	});
	useDataQualityCacheData({onDataRetrieved});

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandLinePrimary>/flow</ExecutionCommandLinePrimary>
		{args.map((argument, index) => {
			if (index === 1 || index === 3) {
				return <ExecutionCommandLineArgument key={index}>"{argument.command}"</ExecutionCommandLineArgument>;
			} else {
				return <ExecutionCommandLineArgument key={index}>{argument.command}</ExecutionCommandLineArgument>;
			}
		})}
	</>} executeAt={content.time} result={result}/>;
};