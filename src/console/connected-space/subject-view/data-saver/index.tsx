import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {renameSubject, saveSubject} from '@/services/data/tuples/subject';
import {Subject} from '@/services/data/tuples/subject-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {Fragment, useEffect} from 'react';
import {useSubjectEventBus} from '../subject-event-bus';
import {SubjectEventTypes} from '../subject-event-bus-types';

export const SubjectDataSaver = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useSubjectEventBus();
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
	}, [on, off, fireGlobal, connectedSpace, subject
	]);

	return <Fragment/>;
};