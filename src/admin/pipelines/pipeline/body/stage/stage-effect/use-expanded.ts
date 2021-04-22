import { useEffect, useState } from 'react';
import { usePipelineEventBus } from '../../../pipeline-event-bus';
import { PipelineEventTypes } from '../../../pipeline-event-bus-types';
import { useStageEventBus } from '../stage-event-bus';
import { StageEventTypes } from '../stage-event-bus-types';

export const useExpanded = () => {
	const { on: onPipeline, off: offPipeline } = usePipelineEventBus();
	const { on, off } = useStageEventBus();
	const [ expanded, setExpanded ] = useState(true);
	useEffect(() => {
		const onExpandContent = () => setExpanded(true);
		const onCollapseContent = () => setExpanded(false);
		onPipeline(PipelineEventTypes.EXPAND_ALL, onExpandContent);
		onPipeline(PipelineEventTypes.COLLAPSE_ALL, onCollapseContent);
		on(StageEventTypes.EXPAND_CONTENT, onExpandContent);
		on(StageEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		return () => {
			offPipeline(PipelineEventTypes.EXPAND_ALL, onExpandContent);
			offPipeline(PipelineEventTypes.COLLAPSE_ALL, onCollapseContent);
			off(StageEventTypes.EXPAND_CONTENT, onExpandContent);
			off(StageEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		};
	}, [ on, off ]);

	return expanded;
};