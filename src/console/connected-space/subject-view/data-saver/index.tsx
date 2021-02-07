import React, { Fragment, useEffect } from 'react';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { renameSubject } from '../../../../services/tuples/subject';
import { Subject } from '../../../../services/tuples/subject-types';
import { useSubjectEventBus } from '../subject-event-bus';
import { SubjectEventTypes } from '../subject-event-bus-types';

export const SubjectDataSaver = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { subject } = props;

	const { on, off } = useSubjectEventBus();
	useEffect(() => {
		const onSubjectDefChanged = (subject: Subject) => {
			// TODO save subject definition data
			console.info(`Subject[id=${subject.subjectId}] definition changed.`);
		};
		const onSubjectRenamed = async (subject: Subject) => {
			console.info(`Subject[id=${subject.subjectId}] renamed.`);
			await renameSubject(subject);
		};
		on(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
		on(SubjectEventTypes.SUBJECT_RENAMED, onSubjectRenamed);
		return () => {
			off(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
			off(SubjectEventTypes.SUBJECT_RENAMED, onSubjectRenamed);
		};
	}, [ on, off, subject ]);

	return <Fragment/>;
};