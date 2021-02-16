import React, { useEffect, useState } from 'react';
import { useUnitEventBus } from '../unit-event-bus';
import { UnitEventTypes } from '../unit-event-bus-types';
import { UnitBodyContainer } from './widgets';

export const UnitBody = (props: { children: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const { on, off } = useUnitEventBus();
	const [ expanded, setExpanded ] = useState(true);
	useEffect(() => {
		const onExpandContent = () => setExpanded(true);
		const onCollapseContent = () => setExpanded(false);
		on(UnitEventTypes.EXPAND_CONTENT, onExpandContent);
		on(UnitEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		return () => {
			off(UnitEventTypes.EXPAND_CONTENT, onExpandContent);
			off(UnitEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		};
	}, [ on, off ]);

	return <UnitBodyContainer expanded={expanded}>
		{children}
	</UnitBodyContainer>;
};