import React, { Fragment, useEffect } from 'react';
import { ConnectedSpace } from '../../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../../services/tuples/subject-types';
import { useSubjectEventBus } from '../../subject-event-bus';
import { SubjectEventTypes } from '../../subject-event-bus-types';
import { useSubjectDefEventBus } from '../subject-def-event-bus';
import { SubjectDefEventTypes } from '../subject-def-event-bus-types';

export const SubjectDefSaver = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { subject } = props;

	const { fire: fireSubject } = useSubjectEventBus();
	const { on, off } = useSubjectDefEventBus();
	useEffect(() => {
		const onChanged = () => {
			fireSubject(SubjectEventTypes.SUBJECT_DEF_CHANGED, subject);
			// TODO save subject definition data
		};
		on(SubjectDefEventTypes.DATASET_COLUMN_ADDED, onChanged);
		on(SubjectDefEventTypes.DATASET_COLUMN_REMOVED, onChanged);
		on(SubjectDefEventTypes.DATASET_COLUMN_CHANGED, onChanged);
		return () => {
			off(SubjectDefEventTypes.DATASET_COLUMN_ADDED, onChanged);
			off(SubjectDefEventTypes.DATASET_COLUMN_REMOVED, onChanged);
			off(SubjectDefEventTypes.DATASET_COLUMN_CHANGED, onChanged);
		};
	}, [ on, off,fireSubject, subject ]);

	return <Fragment/>;
};