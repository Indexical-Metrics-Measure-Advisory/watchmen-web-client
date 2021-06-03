import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import {Router} from '../routes/types';
import {isAdmin} from '../services/account';
import AdminEnums from './enums';
import AdminHome from './home';
import {AdminMenu} from './menu';
import AdminMonitorLogs from './monitor-log';
import AdminPipelines from './pipelines';
import AdminSettings from './settings';
import AdminSpaces from './spaces';
import AdminTopics from './topics';
import AdminUserGroups from './user-groups';
import AdminUsers from './users';
import {AdminCache} from './cache';
import {AdminCacheEventBusProvider} from './cache/cache-event-bus';
import AdminDebug from './simulator';

const AdminContainer = styled.div.attrs({'data-widget': 'admin'})`
	display: flex;
`;
const AdminMain = styled.main.attrs<{ scrollable?: boolean }>(({scrollable = true}) => {
	return {
		'data-widget': 'admin-main',
		'data-v-scroll': scrollable ? '' : (void 0),
		style: {
			overflowY: scrollable ? (void 0) : 'hidden',
			overflowX: scrollable ? (void 0) : 'hidden'
		}
	};
})<{ scrollable?: boolean }>`
	flex-grow: 1;
	display: flex;
	height: 100vh;
	min-height: 100vh;
	overflow-y: scroll;
`;

const AdminIndex = () => {
	if (!isAdmin()) {
		return <Redirect to={Router.CONSOLE_HOME}/>;
	}

	return <AdminContainer>
		<AdminCacheEventBusProvider>
			<AdminCache/>
			<AdminMenu/>

			<Switch>
				<Route path={Router.ADMIN_HOME}><AdminMain scrollable={false}><AdminHome/></AdminMain></Route>
				<Route path={Router.ADMIN_TOPICS}><AdminMain><AdminTopics/></AdminMain></Route>
				<Route path={Router.ADMIN_ENUMS}><AdminMain><AdminEnums/></AdminMain></Route>
				{/*<Route path={Router.ADMIN_REPORTS}><AdminMain><AdminReports/></AdminMain></Route>*/}
				<Route path={Router.ADMIN_SPACES}><AdminMain><AdminSpaces/></AdminMain></Route>
				<Route path={Router.ADMIN_PIPELINES}><AdminPipelines/></Route>
				<Route path={Router.ADMIN_USER_GROUPS}><AdminMain><AdminUserGroups/></AdminMain></Route>
				<Route path={Router.ADMIN_USERS}><AdminMain><AdminUsers/></AdminMain></Route>
				<Route path={Router.ADMIN_MONITOR_LOGS}>
					<AdminMain scrollable={false}><AdminMonitorLogs/></AdminMain>
				</Route>
				<Route path={Router.ADMIN_SIMULATOR}><AdminDebug/></Route>
				<Route path={Router.ADMIN_SETTINGS}><AdminMain><AdminSettings/></AdminMain></Route>
				{/*		<Route path={Path.ADMIN_TASKS}><Tasks/></Route>*/}
				<Route path="*">
					<Redirect to={Router.ADMIN_HOME}/>
				</Route>
			</Switch>
		</AdminCacheEventBusProvider>
	</AdminContainer>;
};

export default AdminIndex;