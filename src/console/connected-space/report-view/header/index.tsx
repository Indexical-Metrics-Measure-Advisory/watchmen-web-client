import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React from 'react';
import {HeaderReportNameEditor} from './header-report-name-editor';
import {HeaderSubjectNameLabel} from './header-subject-name-label';
import {ReportHeaderButtons} from './report-header-buttons';
import {PageHeaderHolder} from './widgets';

export const ReportHeader = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, subject, report} = props;

	return <PageHeaderHolder>
		<HeaderReportNameEditor connectedSpace={connectedSpace} subject={subject} report={report}/>
		<HeaderSubjectNameLabel connectedSpace={connectedSpace} subject={subject}/>
		<ReportHeaderButtons connectedSpace={connectedSpace} subject={subject} report={report}/>
	</PageHeaderHolder>;
};