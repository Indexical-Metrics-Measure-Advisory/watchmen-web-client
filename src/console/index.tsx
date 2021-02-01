import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Router } from '../routes/types';
import { LastSnapshot } from '../services/console/last-snapshot-types';
import ConsoleConnectedSpace from './connected-space';
import { ConsoleEventBusProvider, useConsoleEventBus } from './console-event-bus';
import { ConsoleEventTypes } from './console-event-bus-types';
import { ConsoleLoading } from './console-loading';
import ConsoleDashboard from './dashboard';
import { Favorite } from './favorite';
import ConsoleHome from './home';
import { ConsoleMenu } from './menu';
import ConsoleSettings from './settings';
import { SettingsHolder } from './settings-holder';

const ConsoleContainer = styled.div.attrs({ 'data-widget': 'console' })`
	display    : flex;
	height     : 100vh;
	max-height : 100vh;
`;
const ConsoleWorkbench = styled.div.attrs({ 'data-widget': 'console-workbench' })`
	flex-grow      : 1;
	display        : flex;
	flex-direction : column;
	height         : 100vh;
	min-height     : 100vh;
`;
const ConsoleFavoritePinHolder = styled.div.attrs<{ favorite: boolean }>(({ favorite }) => {
	return {
		style: {
			height: favorite ? 'var(--pin-favorite-height)' : 0,
			minHeight: favorite ? 'var(--pin-favorite-height)' : 0
		}
	};
})<{ favorite: boolean }>`
	transition : min-height 300ms ease-in-out, height 300ms ease-in-out;
`;
const ConsoleMainContainer = styled.main.attrs({
	'data-widget': 'console-main',
	'data-v-scroll': ''
})`
	flex-grow  : 1;
	display    : flex;
	overflow-y : auto;
`;

const ConsoleFavoritePlaceholder = () => {
	const { once, on, off } = useConsoleEventBus();
	const [ favorite, setFavorite ] = useState(false);
	useEffect(() => {
		const onFavoritePin = () => setFavorite(true);
		const onFavoriteUnpin = () => setFavorite(false);

		on(ConsoleEventTypes.PIN_FAVORITE, onFavoritePin);
		on(ConsoleEventTypes.UNPIN_FAVORITE, onFavoriteUnpin);
		return () => {
			off(ConsoleEventTypes.PIN_FAVORITE, onFavoritePin);
			off(ConsoleEventTypes.UNPIN_FAVORITE, onFavoriteUnpin);
		};
	}, [ on, off ]);
	useEffect(() => {
		once(ConsoleEventTypes.REPLY_LAST_SNAPSHOT, ({ favoritePin }: LastSnapshot) => {
			if (favoritePin) {
				setFavorite(true);
			}
		}).fire(ConsoleEventTypes.ASK_LAST_SNAPSHOT);
	}, [ once ]);

	return <ConsoleFavoritePinHolder favorite={favorite}/>;
};

const ConsoleRouter = () => {
	return <>
		<ConsoleMenu/>
		<ConsoleWorkbench>
			<ConsoleFavoritePlaceholder/>
			<ConsoleMainContainer>
				<Switch>
					<Route path={Router.CONSOLE_HOME}><ConsoleHome/></Route>
					<Route path={Router.CONSOLE_CONNECTED_SPACE}><ConsoleConnectedSpace/></Route>
					<Route path={Router.CONSOLE_DASHBOARD}><ConsoleDashboard/></Route>
					{/*		<Route path={Router.CONSOLE_SPACES}><AvailableSpaces/></Route>*/}
					{/*		<Route path={Router.CONSOLE_INBOX}><Inbox/></Route>*/}
					{/*		<Route path={Router.CONSOLE_NOTIFICATION}><Notification/></Route>*/}
					{/*		<Route path={Router.CONSOLE_TIMELINE}><Timeline/></Route>*/}
					<Route path={Router.CONSOLE_SETTINGS}><ConsoleSettings/></Route>
					<Route path='*'>
						<Redirect to={Router.CONSOLE_HOME}/>
					</Route>
				</Switch>
			</ConsoleMainContainer>
		</ConsoleWorkbench>
		<Favorite/>
	</>;
};
const ConsoleMain = () => {
	const { on, off } = useConsoleEventBus();
	const [ initialized, setInitialized ] = useState(false);
	useEffect(() => {
		const startTime = new Date().getTime();
		const onSettingsLoaded = () => {
			const endTime = new Date().getTime();
			if (endTime - startTime < 3000) {
				setTimeout(() => setInitialized(true), (3000 - (endTime - startTime)));
			} else {
				setInitialized(true);
			}
		};
		on(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		return () => {
			off(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		};
	}, [ on, off ]);

	return <ConsoleContainer>
		{initialized ? <ConsoleRouter/> : <ConsoleLoading/>}
		<SettingsHolder/>
	</ConsoleContainer>;
};
const ConsoleIndex = () => {
	return <ConsoleEventBusProvider>
		<ConsoleMain/>
	</ConsoleEventBusProvider>;
};

export default ConsoleIndex;