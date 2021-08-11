import React from 'react';
import {PageHeaderButtons, PageHeaderButtonSeparator} from '../../../../basic-widgets/page-header-buttons';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {HeaderCatalogButton} from '../../header/header-catalog-button';
import {HeaderDeleteSubjectButton} from './header-delete-subject-buttton';
import {HeaderSubjectDataButton} from './header-subject-data-button';
import {HeaderSubjectDefButton} from './header-subject-def-button';
import {HeaderSubjectReportButton} from './header-subject-report-button';
import {HeaderSwitchSubjectButton} from './header-switch-subject-button';

export const SubjectHeaderButtons = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	return <PageHeaderButtons>
		<HeaderCatalogButton connectedSpace={connectedSpace}/>
		<PageHeaderButtonSeparator/>
		<HeaderSubjectDefButton connectedSpace={connectedSpace} subject={subject}/>
		<HeaderSubjectDataButton connectedSpace={connectedSpace} subject={subject}/>
		<HeaderSubjectReportButton connectedSpace={connectedSpace} subject={subject}/>
		{/*{isSubjectReportNow()*/}
		{/*	? <Fragment>*/}
		{/*		<PageHeaderButtonSeparator/>*/}
		{/*		<HeaderAddReportButton connectedSpace={connectedSpace} subject={subject}/>*/}
		{/*		<HeaderShareButton connectedSpace={connectedSpace} subject={subject}/>*/}
		{/*		<HeaderShowPageButton connectedSpace={connectedSpace} subject={subject}/>*/}
		{/*		<HeaderPrintButton connectedSpace={connectedSpace} subject={subject}/>*/}
		{/*		<PageHeaderButtonSeparator/>*/}
		{/*		<HeaderManualRefreshButton connectedSpace={connectedSpace} subject={subject}/>*/}
		{/*		<HeaderAutoRefreshButton connectedSpace={connectedSpace} subject={subject}/>*/}
		{/*	</Fragment>*/}
		{/*	: null*/}
		{/*}*/}
		<PageHeaderButtonSeparator/>
		<HeaderSwitchSubjectButton connectedSpace={connectedSpace} subject={subject}/>
		<PageHeaderButtonSeparator/>
		<HeaderDeleteSubjectButton connectedSpace={connectedSpace} subject={subject}/>
	</PageHeaderButtons>;
};