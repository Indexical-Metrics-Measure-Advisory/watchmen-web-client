import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {AlertLabel} from '@/alert/widgets';
import {useEventBus} from '@/events/event-bus';
import {EventTypes} from '@/events/types';
import {Lang} from '@/langs';
import {toConnectedSpace} from '@/routes/utils';
import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {Subject} from '@/services/tuples/subject-types';
import {SubjectDataSaver} from './data-saver';
import {SubjectHeader} from './header';
import {SubjectBodyRouter} from './subject-body-router';
import {SubjectEventBusProvider} from './subject-event-bus';

export const SubjectView = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	const {subjectId} = useParams<{ subjectId: string }>();

	const history = useHistory();
	const {once: onceGlobal} = useEventBus();
	const [subject, setSubject] = useState<Subject | null>(null);
	useEffect(() => {
		// eslint-disable-next-line
		const subject = connectedSpace.subjects.find(subject => subject.subjectId == subjectId);
		if (subject) {
			setSubject(subject);
		} else {
			onceGlobal(EventTypes.ALERT_HIDDEN, () => {
				history.replace(toConnectedSpace(connectedSpace.connectId));
			}).fire(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.CONSOLE.ERROR.SUBJECT_NOT_FOUND}</AlertLabel>);
		}
	}, [connectedSpace.connectId, connectedSpace.subjects, subjectId, onceGlobal, history]);

	// eslint-disable-next-line
	if (!subject || subject.subjectId !== subjectId) {
		return null;
	}

	return <SubjectEventBusProvider>
		<SubjectDataSaver connectedSpace={connectedSpace} subject={subject}/>
		<SubjectHeader connectedSpace={connectedSpace} subject={subject}/>
		<SubjectBodyRouter connectedSpace={connectedSpace} subject={subject}/>
	</SubjectEventBusProvider>;
};