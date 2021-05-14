import {PipelineRuntimeContext, StageRunStatus, StageRuntimeContext} from '../types';
import {RunTableBodyCell, RunTableBodyRow, StageElementType} from '../widgets';
import {getStageName} from '../../../utils';
import React, {useEffect} from 'react';
import {StageRunStatusCell} from './stage-run-status-cell';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {useForceUpdate} from '../../../../../basic-widgets/utils';
import {generateRuntimeId} from '../utils';

export const StageRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	context: StageRuntimeContext;
}) => {
	const {pipelineContext, context} = props;

	const {on, off} = useRuntimeEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onPipelineStart = (parentContext: PipelineRuntimeContext) => {
			if (parentContext !== pipelineContext) {
				return;
			}

			if (context.stageIndex !== 0) {
				// only first one handle the pipeline start event
				return;
			}

			context.pipelineRuntimeId = parentContext.pipelineRuntimeId;
			context.stageRuntimeId = generateRuntimeId();
			context.status = StageRunStatus.RUNNING;
			forceUpdate();
		};
		on(RuntimeEventTypes.START_PIPELINE, onPipelineStart);
		return () => {
			off(RuntimeEventTypes.START_PIPELINE, onPipelineStart);
		};
	}, [on, off, forceUpdate, pipelineContext, context]);

	return <RunTableBodyRow>
		<RunTableBodyCell><StageElementType>s</StageElementType>{getStageName(context.stage)}</RunTableBodyCell>
		<RunTableBodyCell>
			<StageRunStatusCell status={context.status}/>
		</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
	</RunTableBodyRow>;
};