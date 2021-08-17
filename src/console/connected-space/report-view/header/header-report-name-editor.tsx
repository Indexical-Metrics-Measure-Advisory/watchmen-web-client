import React from 'react';
import {PageTitleEditor} from '../../../../basic-widgets/page-title-editor';
import {useForceUpdate} from '../../../../basic-widgets/utils';
import {useLanguage} from '../../../../langs';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {useReportViewEventBus} from '../report-view-event-bus';
import {ReportViewEventTypes} from '../report-view-event-bus-types';
import {Report} from '../../../../services/tuples/report-types';

export const HeaderReportNameEditor = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {report} = props;

	const language = useLanguage();
	const {fire} = useReportViewEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = async (name: string) => {
		report.name = name;
		forceUpdate();
		fire(ReportViewEventTypes.REPORT_RENAMED, report);
	};
	const onNameChangeComplete = async (name: string) => {
		report.name = name.trim() || language.PLAIN.DEFAULT_REPORT_NAME;
		forceUpdate();
		fire(ReportViewEventTypes.REPORT_RENAMED, report);
	};

	return <PageTitleEditor title={report.name}
	                        defaultTitle={language.PLAIN.DEFAULT_SUBJECT_NAME}
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};
