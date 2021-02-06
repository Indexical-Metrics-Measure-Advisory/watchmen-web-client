import React, { Fragment } from 'react';
import { PageHeaderButtons, PageHeaderButtonSeparator } from '../../../../basic-widgets/page-header-buttons';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { HeaderCatalogButton } from '../../header/header-catalog-button';
import { HeaderAddReportButton } from './header-add-report-button';
import { HeaderDeleteSubjectButton } from './header-delete-subject-buttton';
import { HeaderDownloadAllButton } from './header-download-all-button';
import { HeaderDownloadPageButton } from './header-download-page-button';
import { HeaderPrintButton } from './header-print-button';
import { HeaderShareButton } from './header-share-button';
import { HeaderSubjectDataButton } from './header-subject-data-button';
import { HeaderSubjectDefButton } from './header-subject-def-button';
import { HeaderSubjectReportButton } from './header-subject-report-button';
import { HeaderSwitchSubjectButton } from './header-switch-subject-button';
import { isSubjectDataNow, isSubjectReportNow } from './utils';

export const SubjectHeaderButtons = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	return <PageHeaderButtons>
		<HeaderCatalogButton connectedSpace={connectedSpace}/>
		<PageHeaderButtonSeparator/>
		<HeaderSubjectDefButton connectedSpace={connectedSpace} subject={subject}/>
		<HeaderSubjectDataButton connectedSpace={connectedSpace} subject={subject}/>
		<HeaderSubjectReportButton connectedSpace={connectedSpace} subject={subject}/>
		{isSubjectDataNow()
			? <Fragment>
				<PageHeaderButtonSeparator/>
				<HeaderDownloadPageButton connectedSpace={connectedSpace} subject={subject}/>
				<HeaderDownloadAllButton connectedSpace={connectedSpace} subject={subject}/>
			</Fragment>
			: null
		}
		{isSubjectReportNow()
			? <Fragment>
				<PageHeaderButtonSeparator/>
				<HeaderAddReportButton connectedSpace={connectedSpace} subject={subject}/>
				<HeaderShareButton connectedSpace={connectedSpace} subject={subject}/>
				<HeaderPrintButton connectedSpace={connectedSpace} subject={subject}/>
			</Fragment>
			: null
		}
		<PageHeaderButtonSeparator/>
		<HeaderSwitchSubjectButton connectedSpace={connectedSpace} subject={subject}/>
		<PageHeaderButtonSeparator/>
		<HeaderDeleteSubjectButton connectedSpace={connectedSpace} subject={subject}/>
	</PageHeaderButtons>;
};