import React from 'react';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {HeaderSubjectNameLabel} from './header-subject-name-label';
import {HeaderReportNameEditor} from './header-report-name-editor';
import {ReportHeaderButtons} from './report-header-buttons';
import {PageHeaderHolder} from './widgets';
import {Report} from '../../../../services/tuples/report-types';

export const ReportHeader = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, subject, report} = props;

	return <PageHeaderHolder>
		<HeaderReportNameEditor connectedSpace={connectedSpace} subject={subject} report={report}/>
		<HeaderSubjectNameLabel connectedSpace={connectedSpace} subject={subject}/>
		<ReportHeaderButtons connectedSpace={connectedSpace} subject={subject} report={report}/>
	</PageHeaderHolder>;
};