import React from 'react';
import { PageHeaderButtons, PageHeaderButtonSeparator } from '../../../../basic-widgets/page-header-buttons';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { HeaderAddSubjectButton } from '../../catalog/header/header-add-subject-button';
import { HeaderCatalogButton } from '../../header/header-catalog-button';
import { HeaderAddReportButton } from './header-add-report-button';
import { HeaderDeleteSubjectButton } from './header-delete-subject-buttton';
import { HeaderSwitchSubjectButton } from './header-switch-subject-button';

export const SubjectHeaderButtons = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	return <PageHeaderButtons>
		<HeaderCatalogButton connectedSpace={connectedSpace}/>
		<HeaderAddSubjectButton connectedSpace={connectedSpace}/>
		<PageHeaderButtonSeparator/>
		<HeaderAddReportButton connectedSpace={connectedSpace} subject={subject}/>
		<PageHeaderButtonSeparator/>
		<HeaderSwitchSubjectButton connectedSpace={connectedSpace} subject={subject}/>
		<PageHeaderButtonSeparator/>
		<HeaderDeleteSubjectButton connectedSpace={connectedSpace} subject={subject}/>
	</PageHeaderButtons>;
};