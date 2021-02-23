import React, { Fragment } from 'react';
import { PageHeaderButtons, PageHeaderButtonSeparator } from '../../../../basic-widgets/page-header-buttons';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { HeaderCatalogButton } from '../../header/header-catalog-button';
import { HeaderAddReportButton } from './header-add-report-button';
import { HeaderDeleteSubjectButton } from './header-delete-subject-buttton';
import { HeaderPrintButton } from './header-print-button';
import { HeaderShareButton } from './header-share-button';
import { HeaderShowPageButton } from './header-show-page-button';
import { HeaderSubjectDefButton } from './header-subject-def-button';
import { HeaderSubjectDefValidButtons } from './header-subject-def-valid-buttons';
import { HeaderSwitchSubjectButton } from './header-switch-subject-button';
import { isSubjectReportNow } from './utils';

export const SubjectHeaderButtons = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	return <PageHeaderButtons>
		<HeaderCatalogButton connectedSpace={connectedSpace}/>
		<PageHeaderButtonSeparator/>
		<HeaderSubjectDefButton connectedSpace={connectedSpace} subject={subject}/>
		<HeaderSubjectDefValidButtons connectedSpace={connectedSpace} subject={subject}/>
		{isSubjectReportNow()
			? <Fragment>
				<PageHeaderButtonSeparator/>
				<HeaderAddReportButton connectedSpace={connectedSpace} subject={subject}/>
				<HeaderShareButton connectedSpace={connectedSpace} subject={subject}/>
				<HeaderShowPageButton connectedSpace={connectedSpace} subject={subject}/>
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