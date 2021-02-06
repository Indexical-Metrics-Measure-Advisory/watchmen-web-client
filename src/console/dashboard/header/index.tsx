import React from 'react';
import { PageHeaderHolder } from '../../../basic-widgets/page-header';
import { Dashboard } from '../../../services/tuples/dashboard-types';
import { HeaderButtons } from './header-buttons';
import { HeaderNameEditor } from './header-name-editor';

export const DashboardHeader = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	return <PageHeaderHolder>
		<HeaderNameEditor dashboard={dashboard}/>
		<HeaderButtons dashboard={dashboard}/>
	</PageHeaderHolder>;

};