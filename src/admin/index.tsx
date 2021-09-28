import {isMultipleDataSourcesEnabled, isWriteExternalEnabled} from '@/feature-switch';
import {Router} from '@/routes/types';
import {isAdmin, isSuperAdmin} from '@/services/data/account';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import {AdminCache} from './cache';
import {AdminCacheEventBusProvider} from './cache/cache-event-bus';
import AdminDataSources from './data-sources';
import AdminEnums from './enums';
import AdminExternalWriters from './external-writers';
import AdminHome from './home';
import {AdminMenu} from './menu';
import AdminMonitorLogs from './monitor-log';
import AdminPipelines from './pipelines';
import AdminSettings from './settings';
import AdminDebug from './simulator';
import AdminSpaces from './spaces';
import AdminTenants from './tenants';
import {TopicProfile} from './topic-profile';
import {TopicProfileEventBusProvider} from './topic-profile/topic-profile-event-bus';
import AdminTopics from './topics';
import AdminUserGroups from './user-groups';
import AdminUsers from './users';

const AdminContainer = styled.div.attrs({'data-widget': 'admin'})`
	display : flex;
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
	flex-grow  : 1;
	display    : flex;
	height     : 100vh;
	min-height : 100vh;
	overflow-y : scroll;
`;

const AdminIndex = () => {
	if (!isAdmin() && !isSuperAdmin()) {
		return <Redirect to={Router.CONSOLE_HOME}/>;
	}

	return <AdminContainer>
		<AdminCacheEventBusProvider>
			<TopicProfileEventBusProvider>
				<AdminCache/>
				<AdminMenu/>

				{isSuperAdmin()
					? <Switch>
						<Route path={Router.ADMIN_USERS}><AdminMain><AdminUsers/></AdminMain></Route>
						<Route path={Router.ADMIN_TENANTS}><AdminMain><AdminTenants/></AdminMain></Route>
						{isMultipleDataSourcesEnabled()
							? <Route path={Router.ADMIN_DATA_SOURCES}><AdminMain><AdminDataSources/></AdminMain></Route>
							: null}
						{isWriteExternalEnabled()
							? <Route path={Router.ADMIN_EXTERNAL_WRITERS}><AdminMain><AdminExternalWriters/></AdminMain></Route>
							: null}
						<Route path="*">
							<Redirect to={Router.ADMIN_TENANTS}/>
						</Route>
					</Switch>
					: <Switch>
						<Route path={Router.ADMIN_HOME}><AdminMain scrollable={false}><AdminHome/></AdminMain></Route>
						<Route path={Router.ADMIN_TOPICS}><AdminMain><AdminTopics/></AdminMain></Route>
						<Route path={Router.ADMIN_ENUMS}><AdminMain><AdminEnums/></AdminMain></Route>
						{/*<Route path={Router.ADMIN_REPORTS}><AdminMain><AdminReports/></AdminMain></Route>*/}
						<Route path={Router.ADMIN_SPACES}><AdminMain><AdminSpaces/></AdminMain></Route>
						<Route path={Router.ADMIN_PIPELINES}><AdminPipelines/></Route>
						<Route path={Router.ADMIN_USER_GROUPS}><AdminMain><AdminUserGroups/></AdminMain></Route>
						<Route path={Router.ADMIN_USERS}><AdminMain><AdminUsers/></AdminMain></Route>
						<Route path={Router.ADMIN_TENANTS}><AdminMain><AdminTenants/></AdminMain></Route>
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
				}
				<TopicProfile/>
			</TopicProfileEventBusProvider>
		</AdminCacheEventBusProvider>
	</AdminContainer>;
};

export default AdminIndex;