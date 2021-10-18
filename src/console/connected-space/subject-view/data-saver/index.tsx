import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {renameSubject, saveSubject} from '@/services/data/tuples/subject';
import {Subject} from '@/services/data/tuples/subject-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {Fragment, useEffect, useState} from 'react';
import {SAVE_TIMEOUT} from '../../constants';
import {useSubjectEventBus} from '../subject-event-bus';
import {SubjectEventTypes} from '../subject-event-bus-types';

export const SubjectDataSaver = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useSubjectEventBus();
	const [, setTimeout] = useState<{ handle?: number; rename?: boolean }>({});
	useEffect(() => {
		const onSubjectDefChanged = (subject: Subject) => {
			setTimeout(timeout => {
				timeout.handle && window.clearTimeout(timeout.handle);
				return {
					handle: window.setTimeout(() => {
						fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
							async () => {
								// reset state
								setTimeout({});
								await saveSubject(subject, connectedSpace.connectId);
							},
							() => {
							});
					}, SAVE_TIMEOUT),
					rename: false
				};
			});
		};
		const onSubjectRenamed = async (subject: Subject) => {
			setTimeout(timeout => {
				timeout.handle && window.clearTimeout(timeout.handle);
				return {
					handle: window.setTimeout(() => {
						fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
							async () => {
								// reset state
								setTimeout({});
								if (timeout.rename) {
									await renameSubject(subject);
								} else {
									await saveSubject(subject, connectedSpace.connectId);
								}
							},
							() => {
							});
					}, SAVE_TIMEOUT),
					rename: timeout.rename !== false
				};
			});
		};
		on(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
		on(SubjectEventTypes.SUBJECT_RENAMED, onSubjectRenamed);
		return () => {
			off(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
			off(SubjectEventTypes.SUBJECT_RENAMED, onSubjectRenamed);
		};
	}, [on, off, fireGlobal, connectedSpace, subject]);

	return <Fragment/>;
};