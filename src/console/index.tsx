import React, { lazy, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Router } from '../routes/types';
import { ConsoleSettings } from '../services/console/settings-types';
import { ConsoleEventBusProvider, useConsoleEventBus } from './console-event-bus';
import { ConsoleEventTypes } from './console-event-bus-types';
import { Favorite } from './favorite';
import { ConsoleMenu } from './menu';
import { SettingsHolder } from './settings-holder';

const ConsoleHome = lazy(() => import(/* webpackChunkName: "console-home" */ './home'));
const ConsoleSettingsPage = lazy(() => import(/* webpackChunkName: "console-settings" */ './settings'));

const ConsoleContainer = styled.div.attrs({ 'data-widget': 'console' })`
	display : flex;
`;
const ConsoleMainContainer = styled.main.attrs<{ favorite: boolean }>(({ favorite }) => {
	return {
		'data-widget': 'console-main',
		'data-v-scroll': '',
		style: {
			marginTop: favorite ? 'var(--pin-favorite-height)' : (void 0),
			height: favorite ? 'calc(100vh - var(--pin-favorite-height)' : (void 0)
		}
	};
})<{ favorite: boolean }>`
	flex-grow  : 1;
	display    : flex;
	height     : 100vh;
	overflow-y : auto;
	transition : margin-top 300ms ease-in-out, height 300ms ease-in-out;
`;

const ConsoleMain = () => {
	const { on, off } = useConsoleEventBus();
	const [ favorite, setFavorite ] = useState(false);
	useEffect(() => {
		const onSettingsLoaded = (({ favorite: { pin } }: ConsoleSettings) => {
			if (pin) {
				setFavorite(true);
			}
		});
		const onFavoritePin = () => setFavorite(true);
		const onFavoriteUnpin = () => setFavorite(false);

		on(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		on(ConsoleEventTypes.PIN_FAVORITE, onFavoritePin);
		on(ConsoleEventTypes.UNPIN_FAVORITE, onFavoriteUnpin);
		return () => {
			off(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
			off(ConsoleEventTypes.PIN_FAVORITE, onFavoritePin);
			off(ConsoleEventTypes.UNPIN_FAVORITE, onFavoriteUnpin);
		};
	});

	return <ConsoleContainer>
		<ConsoleMenu/>
		<ConsoleMainContainer favorite={favorite}>
			<Switch>
				<Route path={Router.CONSOLE_HOME}><ConsoleHome/></Route>
				{/*		<Route path={Router.CONSOLE_CONNECTED_SPACE}><ConnectedSpace/></Route>*/}
				{/*		<Route path={Router.CONSOLE_DASHBOARDS}><Dashboards/></Route>*/}
				{/*		<Route path={Router.CONSOLE_SPACES}><AvailableSpaces/></Route>*/}
				{/*		<Route path={Router.CONSOLE_INBOX}><Inbox/></Route>*/}
				{/*		<Route path={Router.CONSOLE_NOTIFICATION}><Notification/></Route>*/}
				{/*		<Route path={Router.CONSOLE_TIMELINE}><Timeline/></Route>*/}
				<Route path={Router.CONSOLE_SETTINGS}><ConsoleSettingsPage/></Route>
				<Route path='*'>
					<Redirect to={Router.CONSOLE_HOME}/>
				</Route>
			</Switch>
		</ConsoleMainContainer>
		<Favorite/>
		<SettingsHolder/>
	</ConsoleContainer>;
};
const ConsoleIndex = () => {
	return <ConsoleEventBusProvider>
		<ConsoleMain/>
	</ConsoleEventBusProvider>;
};

export default ConsoleIndex;