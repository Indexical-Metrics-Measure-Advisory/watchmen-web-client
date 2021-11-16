import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {PageHeaderButtons, PageHeaderButtonSeparator} from '@/widgets/basic/page-header-buttons';
import React from 'react';
import {HeaderCatalogButton} from '../../header/header-catalog-button';
import {HeaderAddReportButton} from './header-add-report-button';
import {HeaderDeleteSubjectButton} from './header-delete-subject-buttton';
import {HeaderSubjectDataButton} from './header-subject-data-button';
import {HeaderSubjectDefButton} from './header-subject-def-button';
import {HeaderSubjectReportButton} from './header-subject-report-button';
import {HeaderSwitchSubjectButton} from './header-switch-subject-button';
import {isSubjectReportNow} from './utils';

export const SubjectHeaderButtons = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	return <PageHeaderButtons>
		<HeaderCatalogButton connectedSpace={connectedSpace}/>
		<PageHeaderButtonSeparator/>
		<HeaderSubjectDefButton connectedSpace={connectedSpace} subject={subject}/>
		<HeaderSubjectDataButton connectedSpace={connectedSpace} subject={subject}/>
		<HeaderSubjectReportButton connectedSpace={connectedSpace} subject={subject}/>
		{isSubjectReportNow()
			? <>
				<PageHeaderButtonSeparator/>
				<HeaderAddReportButton connectedSpace={connectedSpace} subject={subject}/>
				{/*<HeaderShareButton connectedSpace={connectedSpace} subject={subject}/>*/}
			</>
			: null
		}
		<PageHeaderButtonSeparator/>
		<HeaderSwitchSubjectButton connectedSpace={connectedSpace} subject={subject}/>
		<PageHeaderButtonSeparator/>
		<HeaderDeleteSubjectButton connectedSpace={connectedSpace} subject={subject}/>
	</PageHeaderButtons>;
};