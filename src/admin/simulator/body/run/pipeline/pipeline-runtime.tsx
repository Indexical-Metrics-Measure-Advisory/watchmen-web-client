import {Factor} from '@/services/data/tuples/factor-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {connectSimulatorDB} from '@/services/local-persist/db';
import {ICON_SEARCH} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {DataRow} from '../../../types';
import {getPipelineName} from '../../../utils';
import {TopicsData} from '../../state/types';
import {getValueFromSourceData} from '../compute/parameter-kits';
import {DataDialog} from '../data-dialog';
import {useRunsEventBus} from '../runs-event-bus';
import {RunsEventTypes} from '../runs-event-bus-types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {ChangedDataRow, PipelineRunStatus, PipelineRuntimeContext} from '../types';
import {generateRuntimeId} from '../utils';
import {CellButton, PipelineElementType, RunTableBodyCell, RunTablePipelineRow} from '../widgets';
import {PipelineRunStatusCell} from './pipeline-run-status-cell';
import {useCompleted} from './use-completed';
import {useConditionCheck} from './use-condition-check';
import {useRunStages} from './use-run-stages';
import {useTriggerTypeCheck} from './use-trigger-type-check';
import {buildContextBody, createLogWriter, findRuntimeData} from './utils';

const startPipeline = async (context: PipelineRuntimeContext, start: () => void) => {
	context.pipelineRuntimeId = generateRuntimeId();
	await (createLogWriter(context)('Start pipeline'));

	// now, here is a thing more tricky:
	// normally, for pipelines defined, trigger data is not existed in runtime data
	// and for pipelines triggered by others (called dynamic pipelines), trigger data is already existed in runtime data.
	// but there is still an exception case, consider the following scenario:
	// this pipeline is in pipelines defined, which means it is first bulk.
	// it has trigger data which is defined manually,
	// but when some pipelines run, data might be already written into runtime data,
	// which means trigger data is already existed in runtime data just like dynamic pipeline.
	// now have to find a way to identify this, use unique index
	const triggerData = context.triggerData;
	const topicId = context.topic.topicId;
	// find it in runtime data
	const topicData = context.runtimeData[topicId];
	if (!topicData) {
		// not exists, put it into runtime data
		// make sure trigger data in runtime data
		context.runtimeData[topicId] = [triggerData];
	} else if (topicData.some(row => row === triggerData)) {
		// exists, do nothing. it is dynamic pipeline triggered
	} else {
		// not exists, use unique index
		// group unique index factors and find sequence factor
		const factorsGroups = context.topic.factors.reduce((groups, factor) => {
			if (factor.indexGroup && factor.indexGroup.startsWith('u-')) {
				let group = groups.find(group => group.key === factor.indexGroup);
				if (!group) {
					group = {
						key: factor.indexGroup,
						factors: [factor],
						values: [getValueFromSourceData(factor, triggerData)]
					};
					groups.push(group);
				} else {
					group.factors.push(factor);
					group.values.push(getValueFromSourceData(factor, triggerData));
				}
			}
			return groups;
		}, [] as Array<{ key: string, factors: Array<Factor>, values: Array<any> }>);
		if (factorsGroups.length === 0) {
			// unique index not found, just simply insert trigger data to runtime data
			topicData.push(triggerData);
		} else {
			// use these groups to find the fit one and only one in runtime data
			const fits: Array<DataRow> = [];
			for (let row of topicData) {
				// must fit all groups
				// raise exception if some matched and some mismatched
				let hasMatched = false;
				for (let factorGroup of factorsGroups) {
					const matched = factorGroup.factors.every((factor, index) => {
						// eslint-disable-next-line
						return (getValueFromSourceData(factor, row) ?? '') == (factorGroup.values[index] ?? '');
					});
					if (matched) {
						hasMatched = true;
					} else if (hasMatched) {
						throw new Error(`Ignored by cannot identify topic data by multiple unique indexes matched, data[trigger=${JSON.stringify(triggerData)}, exists=${JSON.stringify(row)}].`);
					}
				}
				if (hasMatched) {
					fits.push(row);
				}
			}
			if (fits.length === 0) {
				// not found
				topicData.push(triggerData);
			} else if (fits.length === 1) {
				const index = topicData.findIndex(row => row === fits[0]);
				// remove the fit one, replace with trigger data
				context.triggerDataOnce = fits[0];
				topicData.splice(index, 1, triggerData);
			} else {
				throw new Error(`More than one rows matched with trigger data[${JSON.stringify(triggerData)}].`);
			}
		}
	}
	context.status = PipelineRunStatus.RUNNING;
	await connectSimulatorDB().pipelines.add({
		pipelineId: context.pipeline.pipelineId,
		pipelineRuntimeId: context.pipelineRuntimeId,
		status: context.status,
		context: buildContextBody(context),
		dataBefore: context.runtimeData,
		lastModifiedAt: dayjs().toDate()
	});
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

			try {
				await startPipeline(context, () => {
					forceUpdate();
					fire(RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, context);
				});
			} catch (e: any) {
				await (createLogWriter(context)(e.message));
				fire(RuntimeEventTypes.PIPELINE_FAILED, context);
			}
		};
		onRuns(RunsEventTypes.RUN_PIPELINE, onRunPipeline);
		return () => {
			offRuns(RunsEventTypes.RUN_PIPELINE, onRunPipeline);
		};
	}, [onRuns, offRuns, fire, forceUpdate, context]);

	const onStartPipeline = async () => {
		try {
			await startPipeline(context, () => {
				forceUpdate();
				fire(RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, context);
			});
		} catch (e: any) {
			await (createLogWriter(context)(e.message));
			fire(RuntimeEventTypes.PIPELINE_FAILED, context);
		}
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
		link.download = `data-of-pipeline -${dayjs().format('YYYYMMDDHHmmss')}.json`;
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
			beforeData = context.runtimeData;
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
