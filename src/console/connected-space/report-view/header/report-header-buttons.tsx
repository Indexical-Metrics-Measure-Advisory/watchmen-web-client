import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {PageHeaderButtons, PageHeaderButtonSeparator} from '@/widgets/basic/page-header-buttons';
import React from 'react';
import {HeaderCatalogButton} from '../../header/header-catalog-button';
import {HeaderSubjectButton} from '../../header/header-subject-button';
import {HeaderAddReportButton} from './header-add-report-button';
import {HeaderDeleteReportButton} from './header-delete-report-buttton';
import {HeaderSwitchReportButton} from './header-switch-report-button';

export const ReportHeaderButtons = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, subject, report} = props;

	return <PageHeaderButtons>
		<HeaderCatalogButton connectedSpace={connectedSpace}/>
		<HeaderSubjectButton connectedSpace={connectedSpace} subject={subject}/>
		<PageHeaderButtonSeparator/>
		<HeaderAddReportButton connectedSpace={connectedSpace} subject={subject}/>
		<PageHeaderButtonSeparator/>
		{/*<HeaderReportDataButton connectedSpace={connectedSpace} subject={subject} report={report}/>*/}
		{/*		<HeaderShareButton connectedSpace={connectedSpace} subject={subject}/>*/}
		{/*<HeaderPrintButton connectedSpace={connectedSpace} subject={subject} report={report}/>*/}
		{/*<HeaderManualRefreshButton connectedSpace={connectedSpace} subject={subject} report={report}/>*/}
		{/*<PageHeaderButtonSeparator/>*/}
		<HeaderSwitchReportButton connectedSpace={connectedSpace} subject={subject} report={report}/>
		<PageHeaderButtonSeparator/>
		<HeaderDeleteReportButton connectedSpace={connectedSpace} subject={subject} report={report}/>
	</PageHeaderButtons>;
};