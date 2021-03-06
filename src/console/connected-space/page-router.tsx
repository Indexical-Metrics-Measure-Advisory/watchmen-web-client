import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Router} from '../../routes/types';
import {toConnectedSpaceCatalog} from '../../routes/utils';
import {ConnectedSpace} from '../../services/tuples/connected-space-types';
import {Catalog} from './catalog';
import {SubjectView} from './subject-view';

export const PageRouter = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	return <Switch>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_SUBJECT}>
			<SubjectView connectedSpace={connectedSpace}/>
		</Route>
		<Route path={Router.CONSOLE_CONNECTED_SPACE_CATALOG}>
			<Catalog connectedSpace={connectedSpace}/>
		</Route>
		<Route path="*">
			<Redirect to={toConnectedSpaceCatalog(connectedSpace.connectId)}/>
		</Route>
	</Switch>;
};