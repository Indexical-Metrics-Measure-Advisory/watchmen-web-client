import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from '../../../routes/types';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { Subject } from '../../../services/tuples/subject-types';
import { SubjectDef } from './def';

export const SubjectBodyRouter = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	return <Switch>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_REPORT}>
			{/*<SubjectView connectedSpace={connectedSpace}/>*/}
		</Route>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT_DEF}>
			<SubjectDef connectedSpace={connectedSpace} subject={subject}/>
		</Route>
		<Route path='*'>

		</Route>
	</Switch>;
};