import React from 'react';
import {PageHeaderButtons, PageHeaderButtonSeparator} from '../../../../basic-widgets/page-header-buttons';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {HeaderCatalogButton} from '../../header/header-catalog-button';
import {HeaderDeleteReportButton} from './header-delete-subject-buttton';
import {HeaderReportDataButton} from './header-report-data-button';
import {HeaderSwitchReportButton} from './header-switch-report-button';
import {HeaderAddReportButton} from './header-add-report-button';
import {HeaderPrintButton} from './header-print-button';
import {Report} from '../../../../services/tuples/report-types';
import {HeaderManualRefreshButton} from './header-manual-refresh-button';

export const ReportHeaderButtons = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, subject, report} = props;

	return <PageHeaderButtons>
		<HeaderCatalogButton connectedSpace={connectedSpace}/>
		<PageHeaderButtonSeparator/>
		<HeaderReportDataButton connectedSpace={connectedSpace} subject={subject}/>
		<PageHeaderButtonSeparator/>
		<HeaderAddReportButton connectedSpace={connectedSpace} subject={subject}/>
		{/*		<HeaderShareButton connectedSpace={connectedSpace} subject={subject}/>*/}
		<HeaderPrintButton connectedSpace={connectedSpace} subject={subject} report={report}/>
		<HeaderManualRefreshButton connectedSpace={connectedSpace} subject={subject} report={report}/>
		<PageHeaderButtonSeparator/>
		<HeaderSwitchReportButton connectedSpace={connectedSpace} subject={subject} report={report}/>
		<PageHeaderButtonSeparator/>
		<HeaderDeleteReportButton connectedSpace={connectedSpace} subject={subject} report={report}/>
	</PageHeaderButtons>;
};