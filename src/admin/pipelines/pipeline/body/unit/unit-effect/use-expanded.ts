import { useEffect, useState } from 'react';
import { useUnitEventBus } from '../unit-event-bus';
import { UnitEventTypes } from '../unit-event-bus-types';

export const useExpanded = () => {
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

	return expanded;
};