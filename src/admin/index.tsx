import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Router } from '../routes/types';
import { AdminMenu } from './menu';

const AdminTopics = lazy(() => import(/* webpackChunkName: "admin-topics" */ './topics'));
const AdminReports = lazy(() => import(/* webpackChunkName: "admin-reports" */ './reports'));
const AdminSpaces = lazy(() => import(/* webpackChunkName: "admin-spaces" */ './spaces'));
const AdminUserGroups = lazy(() => import(/* webpackChunkName: "admin-user-groups" */ './user-groups'));
const AdminUsers = lazy(() => import(/* webpackChunkName: "admin-users" */ './users'));

const AdminContainer = styled.div.attrs({ 'data-widget': 'admin' })`
	display : flex;
	> main {
		flex-grow  : 1;
		display    : flex;
		height     : 100vh;
		overflow-y : scroll;
	}
`;

const AdminIndex = () => {
	return <AdminContainer>
		<AdminMenu/>
		<main data-widget='admin-main'>
			<Switch>
				<Route path={Router.ADMIN_TOPICS}><AdminTopics/></Route>
				<Route path={Router.ADMIN_REPORTS}><AdminReports/></Route>
				<Route path={Router.ADMIN_SPACES}><AdminSpaces/></Route>
				{/*		<Route path={Path.ADMIN_PIPELINE}><Pipeline/></Route>*/}
				<Route path={Router.ADMIN_USER_GROUPS}><AdminUserGroups/></Route>
				<Route path={Router.ADMIN_USERS}><AdminUsers/></Route>
				{/*		<Route path={Path.ADMIN_TASKS}><Tasks/></Route>*/}
				<Route path='*'>
					<Redirect to={Router.ADMIN_TOPICS}/>
				</Route>
			</Switch>
		</main>
	</AdminContainer>;
};

export default AdminIndex;