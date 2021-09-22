import {SpaceFilter} from '@/services/data/tuples/space-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React, {useEffect} from 'react';
import {useTupleEventBus} from '../../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '../../widgets/tuple-workbench/tuple-event-bus-types';
import {FilterEventBusProvider, useFilterEventBus} from './filter-event-bus';
import {FilterEventTypes} from './filter-event-bus-types';
import {JointEdit} from './joint-filter/joint-edit';

const TopFilter = (props: { filter: SpaceFilter; topics: Array<Topic> }) => {
	const {filter, topics} = props;

	const {fire: fireTuple} = useTupleEventBus();
	const {on, off} = useFilterEventBus();
	useEffect(() => {
		const onChanged = () => {
			fireTuple(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
		};

		on(FilterEventTypes.JOINT_TYPE_CHANGED, onChanged);
		on(FilterEventTypes.FILTER_ADDED, onChanged);
		on(FilterEventTypes.FILTER_REMOVED, onChanged);
		on(FilterEventTypes.CONTENT_CHANGED, onChanged);
		return () => {
			off(FilterEventTypes.JOINT_TYPE_CHANGED, onChanged);
			off(FilterEventTypes.FILTER_ADDED, onChanged);
			off(FilterEventTypes.FILTER_REMOVED, onChanged);
			off(FilterEventTypes.CONTENT_CHANGED, onChanged);
		};
	}, [on, off, fireTuple, filter]);

	return <JointEdit joint={filter.joint} topics={topics}/>;
};

export const TopFilterEdit = (props: { filter: SpaceFilter; topics: Array<Topic> }) => {
	const {filter, topics} = props;

	return <FilterEventBusProvider>
		<TopFilter filter={filter} topics={topics}/>
	</FilterEventBusProvider>;
};