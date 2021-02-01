import React from 'react';
import { PageHeaderButtons, PageHeaderButtonSeparator } from '../../basic-widgets/page-header-buttons';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { HeaderAddReportButton } from './header-add-report-button';
import { HeaderCreateDashboardButton } from './header-create-dashboard-button';
import { HeaderDeleteMeButton } from './header-delete-me-buttton';
import { HeaderFavoriteButton } from './header-favorite-button';
import { HeaderPrintButton } from './header-print-button';
import { HeaderShareButton } from './header-share-button';
import { HeaderSwitchDashboardButton } from './header-switch-dashboard-button';

export const HeaderButtons = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	return <PageHeaderButtons>
		<HeaderAddReportButton dashboard={dashboard}/>
		<PageHeaderButtonSeparator/>
		<HeaderFavoriteButton dashboard={dashboard}/>
		<HeaderShareButton dashboard={dashboard}/>
		<HeaderPrintButton/>
		<PageHeaderButtonSeparator/>
		<HeaderCreateDashboardButton/>
		<HeaderSwitchDashboardButton dashboard={dashboard}/>
		<PageHeaderButtonSeparator/>
		<HeaderDeleteMeButton dashboard={dashboard}/>
	</PageHeaderButtons>;
};