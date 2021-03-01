import React, { Fragment, useEffect } from 'react';
import { useEventBus } from '../../../../events/event-bus';
import { EventTypes } from '../../../../events/types';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { renameSubject, saveSubject } from '../../../../services/tuples/subject';
import { Subject } from '../../../../services/tuples/subject-types';
import { useSubjectEventBus } from '../subject-event-bus';
import { SubjectEventTypes } from '../subject-event-bus-types';

export const SubjectDataSaver = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const { fire: fireGlobal } = useEventBus();
	const { on, off } = useSubjectEventBus();
	useEffect(() => {
		const onSubjectDefChanged = (subject: Subject) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveSubject(subject, connectedSpace.connectId),
				() => {
				});
		};
		const onSubjectRenamed = async (subject: Subject) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await renameSubject(subject),
				() => {
				});
		};
		on(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
		on(SubjectEventTypes.SUBJECT_RENAMED, onSubjectRenamed);
		return () => {
			off(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
			off(SubjectEventTypes.SUBJECT_RENAMED, onSubjectRenamed);
		};
	}, [ on, off, fireGlobal, connectedSpace, subject
	]);

	return <Fragment/>;
};