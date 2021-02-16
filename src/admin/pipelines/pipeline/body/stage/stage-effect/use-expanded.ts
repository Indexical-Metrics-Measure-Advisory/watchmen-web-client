import { useEffect, useState } from 'react';
import { useStageEventBus } from '../stage-event-bus';
import { StageEventTypes } from '../stage-event-bus-types';

export const useExpanded = () => {
	const { on, off } = useStageEventBus();
	const [ expanded, setExpanded ] = useState(true);
	useEffect(() => {
		const onExpandContent = () => setExpanded(true);
		const onCollapseContent = () => setExpanded(false);
		on(StageEventTypes.EXPAND_CONTENT, onExpandContent);
		on(StageEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		return () => {
			off(StageEventTypes.EXPAND_CONTENT, onExpandContent);
			off(StageEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		};
	}, [ on, off ]);

	return expanded;
};