import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Router } from '../routes/types';
import { AdminMenu } from './menu';
import AdminPipelines from './pipelines';
import AdminReports from './reports';
import AdminSpaces from './spaces';
import AdminTopics from './topics';
import AdminUserGroups from './user-groups';
import AdminUsers from './users';

const AdminContainer = styled.div.attrs({ 'data-widget': 'admin' })`
	display : flex;
`;
const AdminMain = styled.main.attrs({ 'data-widget': 'admin-main', 'data-v-scroll': '' })`
	flex-grow  : 1;
	display    : flex;
	height     : 100vh;
	min-height : 100vh;
	overflow-y : scroll;
`;

const AdminIndex = () => {
	return <AdminContainer>
		<AdminMenu/>

		<Switch>
			<Route path={Router.ADMIN_TOPICS}><AdminMain><AdminTopics/></AdminMain></Route>
			<Route path={Router.ADMIN_REPORTS}><AdminMain><AdminReports/></AdminMain></Route>
			<Route path={Router.ADMIN_SPACES}><AdminMain><AdminSpaces/></AdminMain></Route>
			<Route path={Router.ADMIN_PIPELINES}><AdminPipelines/></Route>
			<Route path={Router.ADMIN_USER_GROUPS}><AdminMain><AdminUserGroups/></AdminMain></Route>
			<Route path={Router.ADMIN_USERS}><AdminMain><AdminUsers/></AdminMain></Route>
			{/*		<Route path={Path.ADMIN_TASKS}><Tasks/></Route>*/}
			<Route path='*'>
				<Redirect to={Router.ADMIN_TOPICS}/>
			</Route>
		</Switch>
	</AdminContainer>;
};

export default AdminIndex;