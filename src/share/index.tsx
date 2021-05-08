import React, {lazy} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Router} from '../routes/types';
import {ShareNothing} from './share-nothing';

const Dashboard = lazy(() => import(/* webpackChunkName: "share-dashboard" */ './dashboard'));
const Subject = lazy(() => import(/* webpackChunkName: "share-subject" */ './subject'));

export const ShareIndex = () => {
	return <Switch>
		<Route path={Router.SHARE_DASHBOARD}><Dashboard/></Route>
		<Route path={Router.SHARE_SUBJECT}><Subject/></Route>
		<Route path="*"><ShareNothing/></Route>
	</Switch>;
};

export default ShareIndex;