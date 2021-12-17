import {Router} from '@/routes/types';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {NavigationEdit} from '../edit';
import {NavigationQuery} from '../query';
import {Buckets} from './buckets';
import {Indicators} from './indicators';
import {NavigationState} from './state';
import {Topics} from './topics';

export const NavigationRoute = () => {
	return <>
		<Topics/>
		<Buckets/>
		<Indicators/>
		<NavigationState/>
		<Switch>
			<Route path={Router.INDICATOR_WORKBENCH_NAVIGATION_QUERY}>
				<NavigationQuery/>
			</Route>
			<Route path={Router.INDICATOR_WORKBENCH_NAVIGATION_EDIT}>
				<NavigationEdit/>
			</Route>
			<Route path="*">
				<Redirect to={Router.INDICATOR_WORKBENCH_NAVIGATION_QUERY}/>
			</Route>
		</Switch>
	</>;
};