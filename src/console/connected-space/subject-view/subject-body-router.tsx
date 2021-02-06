import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Router } from '../../../routes/types';
import { toSubjectDef, toSubjectReport } from '../../../routes/utils';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { Subject } from '../../../services/tuples/subject-types';
import { isDefValid } from './data-validator';
import { SubjectDataSet } from './dataset';
import { SubjectDef } from './def';
import { SubjectReport } from './report';

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
			{isDefValid(subject)
				? <Redirect to={toSubjectReport(connectedSpace.connectId, subject.subjectId)}/>
				: <Redirect to={toSubjectDef(connectedSpace.connectId, subject.subjectId)}/>}
		</Route>
	</Switch>;
};