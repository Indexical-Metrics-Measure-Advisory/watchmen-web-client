import {NavigationEdit} from '@/indicator-workbench/nagivation/edit';
import {Router} from '@/routes/types';
import {TuplePage} from '@/services/data/query/tuple-page';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import React, {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {NavigationQuery} from '../query';

interface PageData {
	loaded: boolean;
	data?: TuplePage<QueryTuple>;
}

export const NavigationRoute = () => {
	const [page, setPage] = useState<PageData>({loaded: false});
	const [navigation, setNavigation] = useState<Navigation | null>(null);

	return <Switch>
		<Route path={Router.INDICATOR_WORKBENCH_NAVIGATION_QUERY}>
			<NavigationQuery data={page.loaded ? page.data! : (void 0)}/>
		</Route>
		<Route path={Router.INDICATOR_WORKBENCH_NAVIGATION_EDIT}>
			<NavigationEdit navigation={navigation!}/>
		</Route>
		<Route path="*">
			<Redirect to={Router.INDICATOR_WORKBENCH_NAVIGATION_QUERY}/>
		</Route>
	</Switch>;
};