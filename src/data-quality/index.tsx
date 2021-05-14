import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import {Router} from '../routes/types';
import {isAdmin} from '../services/account';
import DataQualityHome from './home';
import {DataQualityMenu} from './menu';
import DataQualitySettings from './settings';

const DataQualityContainer = styled.div.attrs({'data-widget': 'data-quality'})`
	display: flex;
`;
const DataQualityMain = styled.main.attrs<{ scrollable?: boolean }>(({scrollable = true}) => {
	return {
		'data-widget': 'data-quality-main',
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

const DataQualityIndex = () => {
	if (!isAdmin()) {
		return <Redirect to={Router.CONSOLE_HOME}/>;
	}

	return <DataQualityContainer>
		<DataQualityMenu/>

		<Switch>
			<Route path={Router.DATA_QUALITY_HOME}>
				<DataQualityMain scrollable={false}>
					<DataQualityHome/>
				</DataQualityMain></Route>
			<Route
				path={Router.DATA_QUALITY_SETTINGS}><DataQualityMain><DataQualitySettings/></DataQualityMain></Route>
			{/*		<Route path={Path.ADMIN_TASKS}><Tasks/></Route>*/}
			<Route path="*">
				<Redirect to={Router.DATA_QUALITY_HOME}/>
			</Route>
		</Switch>
	</DataQualityContainer>;
};

export default DataQualityIndex;