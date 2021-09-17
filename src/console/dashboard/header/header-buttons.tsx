import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {PageHeaderButtons, PageHeaderButtonSeparator} from '@/widgets/basic/page-header-buttons';
import React from 'react';
import {HeaderAddParagraphButton} from './header-add-paragraph-button';
import {HeaderAddReportButton} from './header-add-report-button';
import {HeaderAutoRefreshButton} from './header-auto-refresh-button';
import {HeaderCreateDashboardButton} from './header-create-dashboard-button';
import {HeaderDeleteMeButton} from './header-delete-me-buttton';
import {HeaderFavoriteButton} from './header-favorite-button';
import {HeaderManualRefreshButton} from './header-manual-refresh-button';
import {HeaderPrintButton} from './header-print-button';
import {HeaderSetAdminHomeButton} from './header-set-admin-home-button';
import {HeaderShareButton} from './header-share-button';
import {HeaderShowPageButton} from './header-show-page-button';
import {HeaderSwitchDashboardButton} from './header-switch-dashboard-button';

export const HeaderButtons = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	return <PageHeaderButtons>
		<HeaderAddReportButton dashboard={dashboard}/>
		<HeaderAddParagraphButton dashboard={dashboard}/>
		<PageHeaderButtonSeparator/>
		<HeaderFavoriteButton dashboard={dashboard}/>
		<HeaderShareButton dashboard={dashboard}/>
		<HeaderShowPageButton dashboard={dashboard}/>
		<HeaderPrintButton/>
		<HeaderSetAdminHomeButton dashboard={dashboard}/>
		<PageHeaderButtonSeparator/>
		<HeaderManualRefreshButton dashboard={dashboard}/>
		<HeaderAutoRefreshButton dashboard={dashboard}/>
		<PageHeaderButtonSeparator/>
		<HeaderCreateDashboardButton/>
		<HeaderSwitchDashboardButton dashboard={dashboard}/>
		<PageHeaderButtonSeparator/>
		<HeaderDeleteMeButton dashboard={dashboard}/>
	</PageHeaderButtons>;
};