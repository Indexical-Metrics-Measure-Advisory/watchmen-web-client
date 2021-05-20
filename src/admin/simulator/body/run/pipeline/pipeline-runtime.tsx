import {ChangedDataRow, PipelineRunStatus, PipelineRuntimeContext} from '../types';
import {CellButton, PipelineElementType, RunTableBodyCell, RunTablePipelineRow} from '../widgets';
import {getPipelineName} from '../../../utils';
import {ButtonInk} from '../../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../../basic-widgets/constants';
import React, {useEffect, useState} from 'react';
import {TopicsData} from '../../state/types';
import {PipelineRunStatusCell} from './pipeline-run-status-cell';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {generateRuntimeId} from '../utils';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';
import {useForceUpdate} from '../../../../../basic-widgets/utils';
import {useTriggerTypeCheck} from './use-trigger-type-check';
import {useCompleted} from './use-completed';
import {useConditionCheck} from './use-condition-check';
import {buildContextBody, createLogWriter, findRuntimeData} from './utils';
import {useRunStages} from './use-run-stages';
import {RunsEventTypes} from '../runs-event-bus-types';
import {useRunsEventBus} from '../runs-event-bus';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';
import {useEventBus} from '../../../../../events/event-bus';
import {EventTypes} from '../../../../../events/types';
import {DataDialog} from '../data-dialog';

const buildTriggerData = (context: PipelineRuntimeContext) => {
	return Object.keys(context.allData).reduce((data, topicId) => {
		// eslint-disable-next-line
		if (topicId == context.topic.topicId) {
			// now, data in trigger topic is trigger data + exists data
			data[topicId] = [...new Set([context.triggerData, ...context.existsData])];
		} else {
			data[topicId] = context.allData[topicId];
		}
		return data;
	}, {} as TopicsData);
};

const startPipeline = async (context: PipelineRuntimeContext, start: () => void) => {
	const data = buildTriggerData(context);
	context.pipelineRuntimeId = generateRuntimeId();
	await (createLogWriter(context)('Start pipeline'));

	context.status = PipelineRunStatus.RUNNING;
	await connectSimulatorDB().pipelines.add({
		pipelineId: context.pipeline.pipelineId,
		pipelineRuntimeId: context.pipelineRuntimeId,
		status: context.status,
		context: buildContextBody(context),
		dataBefore: data,
		lastModifiedAt: dayjs().toDate()
	});
	// attach runtime data to context
	context.runtimeData = data;
	start();
};
export const PipelineRuntime = (props: {
	context: PipelineRuntimeContext;
	pipelines: Array<Pipeline>
}) => {
	const {context, pipelines} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on: onRuns, off: offRuns} = useRunsEventBus();
	const {fire} = useRuntimeEventBus();
	const [message, setMessage] = useState('');
	const forceUpdate = useForceUpdate();
	useCompleted(context, pipelines, setMessage);
	useTriggerTypeCheck(context, setMessage);
	useConditionCheck(context, setMessage);
	useRunStages(context, setMessage);

	useEffect(() => {
		const onRunPipeline = async (c: PipelineRuntimeContext) => {
			if (c !== context) {
				return;
			}

			await startPipeline(context, () => {
				forceUpdate();
				fire(RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, context);
			});
		};
		onRuns(RunsEventTypes.RUN_PIPELINE, onRunPipeline);
		return () => {
			offRuns(RunsEventTypes.RUN_PIPELINE, onRunPipeline);
		};
	}, [onRuns, offRuns, fire, forceUpdate, context]);

	const onStartPipeline = async () => {
		await startPipeline(context, () => {
			forceUpdate();
			fire(RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, context);
		});
	};
	const onExportClicked = async () => {
		const {pipelineRuntimeId, topic, triggerData, triggerDataOnce, allTopics} = context;
		const data = await findRuntimeData(pipelineRuntimeId!);
		const beforeData = data!.dataBefore as TopicsData;
		const afterData = data!.dataAfter as TopicsData;
		const changedData = context.changedData;

		const content = {
			triggerData: {
				topicId: topic.topicId,
				topic: topic.name,
				new: triggerData,
				old: triggerDataOnce
			},
			dataBeforeRun: Object.keys(beforeData).map(topicId => {
				return {
					topicId,
					topic: allTopics[topicId]!.name,
					data: beforeData[topicId]
				};
			}),
			dataChanged: Array.from((changedData || []).reduce((map, changed) => {
				let rows = map.get(changed.topicId);
				if (!rows) {
					rows = [];
					map.set(changed.topicId, rows);
				}
				rows.push(changed);
				return map;
			}, new Map<string, Array<ChangedDataRow>>()).values()).map((rows) => {
				if (rows.length === 0) {
					return null;
				} else {
					return {
						topicId: rows[0].topicId,
						topic: allTopics[rows[0].topicId]!.name,
						data: rows.map(row => {
							return {before: row.before, after: row.after};
						})
					};
				}
			}).filter(x => x != null),
			dataAfterRun: Object.keys(afterData).map(topicId => {
				return {
					topicId,
					topic: allTopics[topicId]!.name,
					data: afterData[topicId]
				};
			})
		};

		const link = document.createElement('a');
		link.href = 'data:application/json;charset=utf-8,' + encodeURI(JSON.stringify(content));
		link.target = '_blank';
		//provide the name for the CSV file to be downloaded
		link.download = `data-of-pipeline-${dayjs().format('YYYYMMDDHHmmss')}.json`;
		link.click();
	};
	const onDataClicked = async () => {
		const {pipelineRuntimeId, triggerData, triggerDataOnce} = context;

		let beforeData: TopicsData;
		let afterData: TopicsData | undefined = void 0;
		let data = pipelineRuntimeId ? await findRuntimeData(pipelineRuntimeId) : (void 0);
		if (data) {
			beforeData = data.dataBefore as TopicsData;
			afterData = data.dataAfter as TopicsData;
		} else {
			beforeData = context.allData;
		}

		const changedData = context.changedData;

		fireGlobal(EventTypes.SHOW_DIALOG,
			<DataDialog title="Data of Pipeline Run"
			            triggerData={{topic: context.topic, newOne: triggerData, oldOne: triggerDataOnce}}
			            beforeData={beforeData} afterData={afterData}
			            changedData={changedData}
			            allTopics={context.allTopics}
			            buttons={context.status === PipelineRunStatus.DONE ? [{
				            label: 'Export',
				            ink: ButtonInk.PRIMARY,
				            action: onExportClicked
			            }] : (void 0)}/>,
			{
				marginTop: '5vh',
				marginLeft: '10%',
				width: '80%',
				height: '90vh'
			});
	};

	return <RunTablePipelineRow>
		<RunTableBodyCell><PipelineElementType>p</PipelineElementType>{getPipelineName(context.pipeline)}
		</RunTableBodyCell>
		<RunTableBodyCell>
			<PipelineRunStatusCell status={context.status} onStart={onStartPipeline}/>
		</RunTableBodyCell>
		<RunTableBodyCell>
			<CellButton ink={ButtonInk.SUCCESS} onClick={onDataClicked}>
				<FontAwesomeIcon icon={ICON_SEARCH}/>
			</CellButton>
		</RunTableBodyCell>
		<RunTableBodyCell>{message}</RunTableBodyCell>
	</RunTablePipelineRow>;
};
