import {Subject, SubjectDataSetFilter, SubjectDataSetFilterJoint} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React, {useEffect} from 'react';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {FilterEventBusProvider, useFilterEventBus} from './filter-event-bus';
import {FilterEventTypes} from './filter-event-bus-types';
import {JointEdit} from './joint-filter/joint-edit';

const TopFilter = (props: {
	subject: Subject;
	joint: SubjectDataSetFilterJoint;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {joint, availableTopics, pickedTopics} = props;

	const {fire: fireDef} = useSubjectDefEventBus();
	const {on, off} = useFilterEventBus();
	useEffect(() => {
		// catch event from the top level joint
		// delegate to subject definition
		const onJointChanged = () => {
			fireDef(SubjectDefEventTypes.DATASET_FILTER_CHANGED, joint);
		};
		const onExpressionChanged = () => {
			fireDef(SubjectDefEventTypes.DATASET_FILTER_CHANGED, joint);
		};
		const onFilterAdded = (subFilter: SubjectDataSetFilter) => {
			fireDef(SubjectDefEventTypes.DATASET_FILTER_ADDED, subFilter);
		};
		const onFilterRemoved = (subFilter: SubjectDataSetFilter) => {
			fireDef(SubjectDefEventTypes.DATASET_FILTER_REMOVED, subFilter);
		};

		on(FilterEventTypes.JOINT_TYPE_CHANGED, onJointChanged);
		on(FilterEventTypes.FILTER_ADDED, onFilterAdded);
		on(FilterEventTypes.FILTER_REMOVED, onFilterRemoved);
		on(FilterEventTypes.CONTENT_CHANGED, onExpressionChanged);
		return () => {
			off(FilterEventTypes.JOINT_TYPE_CHANGED, onJointChanged);
			off(FilterEventTypes.FILTER_ADDED, onFilterAdded);
			off(FilterEventTypes.FILTER_REMOVED, onFilterRemoved);
			off(FilterEventTypes.CONTENT_CHANGED, onExpressionChanged);
		};
	}, [on, off, fireDef, joint]);

	// const onRemoveMe = () => {
	// 	subject.dataset.filters.filters = [];
	// 	fireDef(SubjectDefEventTypes.DATASET_FILTER_DESTROYED);
	// };
	// parentJoint={{jointType: ParameterJointType.AND, filters: []}}

	return <JointEdit joint={joint}
	                  availableTopics={availableTopics} pickedTopics={pickedTopics}/>;
};

export const TopFilterEdit = (props: {
	subject: Subject;
	filter: SubjectDataSetFilterJoint;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {subject, filter, availableTopics, pickedTopics} = props;

	return <FilterEventBusProvider>
		<TopFilter subject={subject} joint={filter} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
	</FilterEventBusProvider>;
};