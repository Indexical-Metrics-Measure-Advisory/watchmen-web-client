import React, {Fragment, useEffect} from 'react';
import {useFilterEventBus} from './filter-event-bus';
import {FilterEventTypes} from './filter-event-bus-types';

/**
 * gather all changes in filter, and notify to parent
 */
export const HierarchicalFilterEventBridge = (props: { notifyChangeToParent: () => void }) => {
	const {notifyChangeToParent} = props;
	const {on, off} = useFilterEventBus();
	useEffect(() => {
		const onFilterChanged = () => notifyChangeToParent();

		on(FilterEventTypes.JOINT_TYPE_CHANGED, onFilterChanged);
		on(FilterEventTypes.FILTER_ADDED, onFilterChanged);
		on(FilterEventTypes.FILTER_REMOVED, onFilterChanged);

		on(FilterEventTypes.CONTENT_CHANGED, onFilterChanged);
		return () => {
			off(FilterEventTypes.JOINT_TYPE_CHANGED, onFilterChanged);
			off(FilterEventTypes.FILTER_ADDED, onFilterChanged);
			off(FilterEventTypes.FILTER_REMOVED, onFilterChanged);

			off(FilterEventTypes.CONTENT_CHANGED, onFilterChanged);
		};
	}, [on, off, notifyChangeToParent]);

	return <Fragment/>;
};
