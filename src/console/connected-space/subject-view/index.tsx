import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AlertLabel } from '../../../alert/widgets';
import { useEventBus } from '../../../events/event-bus';
import { EventTypes } from '../../../events/types';
import { Lang } from '../../../langs';
import { toConnectedSpace } from '../../../routes/utils';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { Subject } from '../../../services/tuples/subject-types';
import { SubjectHeader } from './header';
import { SubjectEventBusProvider } from './subject-event-bus';
import { SubjectContainer } from './widgets';

const SubjectBody = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	return <SubjectContainer>

	</SubjectContainer>;
};

export const SubjectView = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	const { subjectId } = useParams<{ subjectId: string }>();

	const history = useHistory();
	const { once: onceGlobal } = useEventBus();
	const [ subject, setSubject ] = useState<Subject | null>(null);
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
	}, [ connectedSpace.connectId, connectedSpace.subjects, subjectId, onceGlobal, history ]);

	if (!subject) {
		return null;
	}

	return <SubjectEventBusProvider>
		<SubjectHeader connectedSpace={connectedSpace} subject={subject}/>
		<SubjectBody connectedSpace={connectedSpace} subject={subject}/>
	</SubjectEventBusProvider>;
};