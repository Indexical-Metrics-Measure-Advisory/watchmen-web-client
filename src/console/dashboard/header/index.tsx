import {Dashboard} from '@/services/data/tuples/dashboard-types';
import React from 'react';
import {HeaderButtons} from './header-buttons';
import {HeaderNameEditor} from './header-name-editor';
import {DashboardPageHeaderHolder} from './widgets';

export const DashboardHeader = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	return <DashboardPageHeaderHolder>
		<HeaderNameEditor dashboard={dashboard}/>
		<HeaderButtons dashboard={dashboard}/>
	</DashboardPageHeaderHolder>;

};