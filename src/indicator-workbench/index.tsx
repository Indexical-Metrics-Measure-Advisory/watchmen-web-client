import {Router} from '@/routes/types';
import {isAdmin} from '@/services/data/account';
import {WaterMark} from '@/widgets/water-mark';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import IndicatorWorkbenchBucketsIndex from './buckets';
import IndicatorWorkbenchInspectionIndex from './inspection';
import {IndicatorWorkbenchMenu} from './menu';
import IndicatorWorkbenchPrepareIndex from './prepare';
import IndicatorWorkbenchSettingsIndex from './settings';

const IndicatorWorkbenchContainer = styled.div.attrs({'data-widget': 'indicator-workbench'})`
	display : flex;
`;
const IndicatorWorkbenchMain = styled.main.attrs<{ scrollable?: boolean }>(({scrollable = true}) => {
	return {
		'data-widget': 'indicator-workbench-main',
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

const IndicatorWorkbenchIndex = () => {
	return <IndicatorWorkbenchContainer>
		<IndicatorWorkbenchMenu/>

		<IndicatorWorkbenchMain>
			<Switch>
				{isAdmin()
					? <Route path={Router.INDICATOR_WORKBENCH_BUCKETS}>
						<IndicatorWorkbenchBucketsIndex/>
					</Route> : null}
				{isAdmin()
					? <Route path={Router.INDICATOR_WORKBENCH_PREPARE}>
						<IndicatorWorkbenchPrepareIndex/>
					</Route> : null}
				<Route path={Router.INDICATOR_WORKBENCH_INSPECTION}>
					<IndicatorWorkbenchInspectionIndex/>
				</Route>
				<Route path={Router.INDICATOR_WORKBENCH_SETTINGS}>
					<IndicatorWorkbenchSettingsIndex/>
				</Route>
				<Route path="*">
					<Redirect
						to={isAdmin() ? Router.INDICATOR_WORKBENCH_PREPARE : Router.INDICATOR_WORKBENCH_INSPECTION}/>
				</Route>
			</Switch>
		</IndicatorWorkbenchMain>
		<WaterMark/>
	</IndicatorWorkbenchContainer>;
};

export default IndicatorWorkbenchIndex;