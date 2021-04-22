import { useEffect, useState } from 'react';
import { usePipelineEventBus } from '../../../pipeline-event-bus';
import { PipelineEventTypes } from '../../../pipeline-event-bus-types';
import { useUnitEventBus } from '../unit-event-bus';
import { UnitEventTypes } from '../unit-event-bus-types';

export const useExpanded = () => {
	const { on: onPipeline, off: offPipeline } = usePipelineEventBus();
	const { on, off } = useUnitEventBus();
	const [ expanded, setExpanded ] = useState(true);
	useEffect(() => {
		const onExpandContent = () => setExpanded(true);
		const onCollapseContent = () => setExpanded(false);
		onPipeline(PipelineEventTypes.EXPAND_ALL, onExpandContent);
		onPipeline(PipelineEventTypes.COLLAPSE_ALL, onCollapseContent);
		on(UnitEventTypes.EXPAND_CONTENT, onExpandContent);
		on(UnitEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		return () => {
			offPipeline(PipelineEventTypes.EXPAND_ALL, onExpandContent);
			offPipeline(PipelineEventTypes.COLLAPSE_ALL, onCollapseContent);
			off(UnitEventTypes.EXPAND_CONTENT, onExpandContent);
			off(UnitEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		};
	}, [ onPipeline, offPipeline, on, off ]);

	return expanded;
};