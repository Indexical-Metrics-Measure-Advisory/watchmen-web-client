import React, { useEffect, useState } from 'react';
import { useStageEventBus } from '../stage-event-bus';
import { StageEventTypes } from '../stage-event-bus-types';
import { StageBodyContainer } from './widgets';

export const StageBody = (props: { children: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

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

	return <StageBodyContainer expanded={expanded}>
		{children}
	</StageBodyContainer>;
};