import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Router } from '../../../routes/types';
import { toSubjectDef, toSubjectReport } from '../../../routes/utils';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { Subject } from '../../../services/tuples/subject-types';
import { useSubjectValid } from './data-validator';
import { SubjectDataSet } from './dataset';
import { SubjectDef } from './def';
import { SubjectReport } from './report';

const RouteAnything = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const [ checked, setChecked ] = useState<{ valid: boolean, subject?: Subject }>({ valid: false });
	useSubjectValid({ connectedSpace, subject, setValid: setChecked });

	if (!checked.subject || checked.subject !== subject) {
		return null;
	}

	if (checked.valid) {
		return <Redirect to={toSubjectReport(connectedSpace.connectId, subject.subjectId)}/>;
	} else {
		return <Redirect to={toSubjectDef(connectedSpace.connectId, subject.subjectId)}/>;
	}
};

export const SubjectBodyRouter = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	return <Switch>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_REPORT}>
			<SubjectReport connectedSpace={connectedSpace} subject={subject}/>
		</Route>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DATA}>
			<SubjectDataSet connectedSpace={connectedSpace} subject={subject}/>
		</Route>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DEF}>
			<SubjectDef connectedSpace={connectedSpace} subject={subject}/>
		</Route>
		<Route path='*'>
			<RouteAnything connectedSpace={connectedSpace} subject={subject}/>
		</Route>
	</Switch>;
};