import {isDataQualityCenterEnabled, isIndicatorWorkbenchEnabled} from '@/feature-switch';
import {RemoteRequest} from '@/widgets/remote-request';
import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Router} from './types';

const Login = lazy(() => import(/* webpackChunkName: "login" */ '../login'));
const Admin = lazy(() => import(/* webpackChunkName: "admin" */ '../admin'));
const DataQuality = lazy(() => import(/* webpackChunkName: "data-quality" */ '../data-quality'));
const IndicatorWorkbench = lazy(() => import(/* webpackChunkName: "indicator-workbench" */ '../indicator-workbench'));
const Console = lazy(() => import(/* webpackChunkName: "console" */ '../console'));
const Share = lazy(() => import(/* webpackChunkName: "console" */ '../share'));

export const Routes = () => {
	return <Suspense fallback={<div/>}>
		<BrowserRouter basename={process.env.REACT_APP_WEB_CONTEXT}>
			<RemoteRequest/>
			<Switch>
				<Route path={Router.ADMIN}><Admin/></Route>
				{isDataQualityCenterEnabled()
					? <Route path={Router.DATA_QUALITY}><DataQuality/></Route>
					: null
				}
				{isIndicatorWorkbenchEnabled()
					? <Route path={Router.INDICATOR_WORKBENCH}><IndicatorWorkbench/></Route>
					: null
				}
				<Route path={Router.CONSOLE}><Console/></Route>
				<Route path={Router.SHARE}><Share/></Route>
				<Route path={Router.LOGIN}><Login/></Route>
				<Route path="*">
					<Redirect to={Router.LOGIN}/>
				</Route>
			</Switch>
		</BrowserRouter>
	</Suspense>;
};