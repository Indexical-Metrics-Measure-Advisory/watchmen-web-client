import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import {Router} from '../routes/types';
import {isAdmin} from '../services/account';
import DataQualityHome from './home';
import DataQualityConsanguinity from './consanguinity';
import {DataQualityMenu} from './menu';
import DataQualitySettings from './settings';
import {DataQualityCacheEventBusProvider} from './cache/cache-event-bus';
import {DataQualityCache} from './cache';
import DataQualityMonitorRules from './rules';
import DataQualityStatistics from './statistics'
import DataQualityEndUser from './end-user'

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
		<DataQualityCacheEventBusProvider>
			<DataQualityCache/>
			<DataQualityMenu/>

			<Switch>
				<Route path={Router.DATA_QUALITY_HOME}>
					<DataQualityMain scrollable={false}>
						<DataQualityHome/>
					</DataQualityMain>
				</Route>
				<Route path={Router.DATA_QUALITY_CONSANGUINITY}>
					<DataQualityMain scrollable={false}>
						<DataQualityConsanguinity/>
					</DataQualityMain>
				</Route>
				<Route path={Router.DATA_QUALITY_RULES}>
					<DataQualityMain scrollable={false}>
						<DataQualityMonitorRules/>
					</DataQualityMain>
				</Route>
				<Route path={Router.DATA_QUALITY_STATISTICS}>
					<DataQualityMain scrollable={false}>
						<DataQualityStatistics/>
					</DataQualityMain>
				</Route>
				<Route path={Router.DATA_QUALITY_END_USER}>
					<DataQualityMain scrollable={false}>
						<DataQualityEndUser/>
					</DataQualityMain>
				</Route>
				<Route path={Router.DATA_QUALITY_SETTINGS}>
					<DataQualityMain><DataQualitySettings/></DataQualityMain>
				</Route>
				<Route path="*">
					<Redirect to={Router.DATA_QUALITY_HOME}/>
				</Route>
			</Switch>
		</DataQualityCacheEventBusProvider>
	</DataQualityContainer>;
};

export default DataQualityIndex;