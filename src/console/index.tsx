import React from 'react';
import styled from 'styled-components';

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
	return <ConsoleContainer>
		{/*<ConsoleMenu/>*/}
		{/*<Favorite/>*/}
		{/*<main>*/}
		{/*	<Switch>*/}
		{/*		<Route path={Router.CONSOLE_HOME}><Home/></Route>*/}
		{/*		<Route path={Router.CONSOLE_CONNECTED_SPACE}><ConnectedSpace/></Route>*/}
		{/*		<Route path={Router.CONSOLE_DASHBOARDS}><Dashboards/></Route>*/}
		{/*		<Route path={Router.CONSOLE_SPACES}><AvailableSpaces/></Route>*/}
		{/*		<Route path={Router.CONSOLE_INBOX}><Inbox/></Route>*/}
		{/*		<Route path={Router.CONSOLE_NOTIFICATION}><Notification/></Route>*/}
		{/*		<Route path={Router.CONSOLE_SETTINGS}><Settings/></Route>*/}
		{/*		<Route path={Router.CONSOLE_TIMELINE}><Timeline/></Route>*/}
		{/*		<Route path='*'>*/}
		{/*			<Redirect to={Router.CONSOLE_HOME}/>*/}
		{/*		</Route>*/}
		{/*	</Switch>*/}
		{/*</main>*/}
		{/*<Messenger/>*/}
	</ConsoleContainer>;
};

export default ConsoleIndex;