import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Router } from '../routes/types';
import { ConsoleEventBusProvider } from './console-event-bus';
import { ConsoleMenu } from './menu';
import { SettingsLoader } from './settings-loader';

const ConsoleSettings = lazy(() => import(/* webpackChunkName: "console-settings" */ './settings'));

const ConsoleContainer = styled.div.attrs({ 'data-widget': 'console' })`
	display : flex;
	> main {
		flex-grow  : 1;
		display    : flex;
		height     : 100vh;
		overflow-y : scroll;
	}
`;

const ConsoleIndex = () => {
	return <ConsoleEventBusProvider>
		<ConsoleContainer>
			<ConsoleMenu/>
			{/*<Favorite/>*/}
			<main data-widget='console-main'>
				<Switch>
			{/*		<Route path={Router.CONSOLE_HOME}><Home/></Route>*/}
			{/*		<Route path={Router.CONSOLE_CONNECTED_SPACE}><ConnectedSpace/></Route>*/}
			{/*		<Route path={Router.CONSOLE_DASHBOARDS}><Dashboards/></Route>*/}
			{/*		<Route path={Router.CONSOLE_SPACES}><AvailableSpaces/></Route>*/}
			{/*		<Route path={Router.CONSOLE_INBOX}><Inbox/></Route>*/}
			{/*		<Route path={Router.CONSOLE_NOTIFICATION}><Notification/></Route>*/}
			{/*		<Route path={Router.CONSOLE_TIMELINE}><Timeline/></Route>*/}
					<Route path={Router.CONSOLE_SETTINGS}><ConsoleSettings/></Route>
			{/*		<Route path='*'>*/}
			{/*			<Redirect to={Router.CONSOLE_HOME}/>*/}
			{/*		</Route>*/}
				</Switch>
			</main>
			{/*<Messenger/>*/}
			<SettingsLoader/>
		</ConsoleContainer>
	</ConsoleEventBusProvider>;
};

export default ConsoleIndex;