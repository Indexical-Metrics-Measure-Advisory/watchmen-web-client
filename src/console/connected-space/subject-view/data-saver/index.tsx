import React, { Fragment, useEffect, useState } from 'react';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { renameSubject, saveSubject } from '../../../../services/tuples/subject';
import { Subject } from '../../../../services/tuples/subject-types';
import { SAVE_TIMEOUT } from '../../constants';
import { useSubjectEventBus } from '../subject-event-bus';
import { SubjectEventTypes } from '../subject-event-bus-types';

interface SubjectDataSaveState {
	timeoutHandle: number | null;
	connectedSpace?: ConnectedSpace;
	subject?: Subject;
	type: 'def' | 'name';
}

export const SubjectDataSaver = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const { on, off } = useSubjectEventBus();
	const [ state, setState ] = useState<SubjectDataSaveState>({ timeoutHandle: null, type: 'def' });
	useEffect(() => {
		if (state.connectedSpace && state.subject && subject !== state.subject && state.timeoutHandle) {
			// switch subject, there is a save in queue
			// cancel handle in queue
			clearTimeout(state.timeoutHandle);
			// execute immediately
			const previousSubject = state.subject;
			const previousConnectedSpace = state.connectedSpace;
			if (state.type === 'def') {
				(async () => await saveSubject(previousSubject, previousConnectedSpace.connectId))();
			} else if (state.type === 'name') {
				(async () => await renameSubject(previousSubject))();
			}
			// reset state
			setState({ timeoutHandle: null, type: 'def' });
		}

		const onSubjectDefChanged = (subject: Subject) => {
			if (state.timeoutHandle) {
				clearTimeout(state.timeoutHandle);
			}
			setState({
				timeoutHandle: window.setTimeout(async () => {
					setState({ timeoutHandle: null, type: 'def' });
					await saveSubject(subject, connectedSpace.connectId);
				}, SAVE_TIMEOUT),
				connectedSpace, subject, type: 'def'
			});
		};
		const onSubjectRenamed = async (subject: Subject) => {
			if (state.timeoutHandle) {
				clearTimeout(state.timeoutHandle);
			}
			if (state.type === 'def') {
				setState({
					timeoutHandle: window.setTimeout(async () => {
						setState({ timeoutHandle: null, type: 'def' });
						await saveSubject(subject, connectedSpace.connectId);
					}, SAVE_TIMEOUT),
					connectedSpace, subject, type: 'def'
				});
			} else if (state.type === 'name') {
				setState({
					timeoutHandle: window.setTimeout(async () => {
						setState({ timeoutHandle: null, type: 'def' });
						await renameSubject(subject);
					}, SAVE_TIMEOUT),
					connectedSpace, subject, type: 'def'
				});
			}
		};
		on(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
		on(SubjectEventTypes.SUBJECT_RENAMED, onSubjectRenamed);
		return () => {
			off(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
			off(SubjectEventTypes.SUBJECT_RENAMED, onSubjectRenamed);
		};
	}, [
		on, off,
		connectedSpace, subject,
		state.timeoutHandle, state.type, state.connectedSpace, state.subject
	]);

	return <Fragment/>;
};