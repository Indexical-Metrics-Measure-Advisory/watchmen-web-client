import {PipelineRunStatus, PipelineRuntimeContext} from '../types';
import {CellButton, PipelineElementType, RunTableBodyCell, RunTablePipelineRow} from '../widgets';
import {getPipelineName} from '../../../utils';
import {ButtonInk} from '../../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../../basic-widgets/constants';
import React, {useState} from 'react';
import {TopicsData} from '../../state/types';
import {PipelineRunStatusCell} from './pipeline-run-status-cell';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {generateRuntimeId} from '../utils';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';
import {useForceUpdate} from '../../../../../basic-widgets/utils';
import {useTriggerTypeCheck} from './use-trigger-type-check';
import {useIgnored} from './use-ignored';
import {useConditionCheck} from './use-condition-check';

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

export const PipelineRuntime = (props: { context: PipelineRuntimeContext }) => {
	const {context} = props;

	const {fire} = useRuntimeEventBus();
	const [message, setMessage] = useState('');
	const forceUpdate = useForceUpdate();
	useIgnored(context, forceUpdate);
	useTriggerTypeCheck(context, setMessage);
	useConditionCheck(context, setMessage);

	const onStartPipeline = async () => {
		const data = buildTriggerData(context);
		context.pipelineRuntimeId = generateRuntimeId();
		const db = connectSimulatorDB();
		await db.pipelines.add({
			pipelineId: context.pipeline.pipelineId,
			pipelineRuntimeId: context.pipelineRuntimeId,
			body: context,
			dataBefore: data,
			lastModifiedAt: dayjs().toDate()
		});
		await db.logs.add({
			pipelineId: context.pipeline.pipelineId,
			pipelineRuntimeId: context.pipelineRuntimeId,
			message: 'Start pipeline',
			lastModifiedAt: dayjs().toDate()
		});
		context.status = PipelineRunStatus.RUNNING;
		forceUpdate();
		fire(RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, context);
	};

	return <RunTablePipelineRow>
		<RunTableBodyCell><PipelineElementType>p</PipelineElementType>{getPipelineName(context.pipeline)}
		</RunTableBodyCell>
		<RunTableBodyCell>
			<PipelineRunStatusCell status={context.status} onStart={onStartPipeline}/>
		</RunTableBodyCell>
		<RunTableBodyCell>
			<CellButton ink={ButtonInk.SUCCESS}>
				<FontAwesomeIcon icon={ICON_SEARCH}/>
			</CellButton>
		</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell/>
		<RunTableBodyCell>{message}</RunTableBodyCell>
	</RunTablePipelineRow>;
};
