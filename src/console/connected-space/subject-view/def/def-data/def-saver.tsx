import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React, {Fragment, useEffect} from 'react';
import {useSubjectEventBus} from '../../subject-event-bus';
import {SubjectEventTypes} from '../../subject-event-bus-types';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';

export const SubjectDefSaver = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {subject} = props;

	const {fire: fireSubject} = useSubjectEventBus();
	const {on, off} = useSubjectDefEventBus();

	// delegate columns/filters/joins changes to subject definition
	useEffect(() => {
		const onChanged = () => {
			fireSubject(SubjectEventTypes.SUBJECT_DEF_CHANGED, subject);
		};
		on(SubjectDefEventTypes.DATASET_COLUMN_ADDED, onChanged);
		on(SubjectDefEventTypes.DATASET_COLUMN_REMOVED, onChanged);
		on(SubjectDefEventTypes.DATASET_COLUMN_CHANGED, onChanged);

		on(SubjectDefEventTypes.DATASET_FILTER_ADDED, onChanged);
		on(SubjectDefEventTypes.DATASET_FILTER_REMOVED, onChanged);
		on(SubjectDefEventTypes.DATASET_FILTER_CHANGED, onChanged);

		on(SubjectDefEventTypes.DATASET_JOIN_ADDED, onChanged);
		on(SubjectDefEventTypes.DATASET_JOIN_REMOVED, onChanged);
		on(SubjectDefEventTypes.DATASET_JOIN_CHANGED, onChanged);
		return () => {
			off(SubjectDefEventTypes.DATASET_COLUMN_ADDED, onChanged);
			off(SubjectDefEventTypes.DATASET_COLUMN_REMOVED, onChanged);
			off(SubjectDefEventTypes.DATASET_COLUMN_CHANGED, onChanged);

			off(SubjectDefEventTypes.DATASET_FILTER_ADDED, onChanged);
			off(SubjectDefEventTypes.DATASET_FILTER_REMOVED, onChanged);
			off(SubjectDefEventTypes.DATASET_FILTER_CHANGED, onChanged);

			off(SubjectDefEventTypes.DATASET_JOIN_ADDED, onChanged);
			off(SubjectDefEventTypes.DATASET_JOIN_REMOVED, onChanged);
			off(SubjectDefEventTypes.DATASET_JOIN_CHANGED, onChanged);
		};
	}, [on, off, fireSubject, subject]);

	return <Fragment/>;
};