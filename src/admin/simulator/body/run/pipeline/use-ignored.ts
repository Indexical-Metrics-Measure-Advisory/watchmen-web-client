import {useEffect} from 'react';
import {PipelineRunStatus, PipelineRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';

export const useIgnored = (context: PipelineRuntimeContext, forceUpdate: () => void) => {
	const {on, off} = useRuntimeEventBus();
	useEffect(() => {
		const onPipelineIgnored = async () => {
			context.status = PipelineRunStatus.IGNORED;
			forceUpdate();
			await connectSimulatorDB().pipelines.update(context.pipelineRuntimeId!, {
				body: context,
				lastModifiedAt: dayjs().toDate()
			});
		};
		on(RuntimeEventTypes.PIPELINE_IGNORED, onPipelineIgnored);
		return () => {
			off(RuntimeEventTypes.PIPELINE_IGNORED, onPipelineIgnored);
		};
	}, [on, off, forceUpdate, context]);
};