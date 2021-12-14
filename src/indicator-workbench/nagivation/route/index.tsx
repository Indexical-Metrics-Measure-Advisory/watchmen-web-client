import {Router} from '@/routes/types';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {NavigationQuery} from '../query';

export const NavigationRoute = () => {
	return <Switch>
		<Route path={Router.INDICATOR_WORKBENCH_NAVIGATION_QUERY}>
			<NavigationQuery/>
		</Route>
		<Route path={Router.INDICATOR_WORKBENCH_NAVIGATION_EDIT}>
		</Route>
		<Route path="*">
			<Redirect to={Router.INDICATOR_WORKBENCH_NAVIGATION_QUERY}/>
		</Route>
	</Switch>;
};