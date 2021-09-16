import React from 'react';
import {PageTitleEditor} from '@/basic-widgets/page-title-editor';
import {useForceUpdate} from '@/basic-widgets/utils';
import {useLanguage} from '@/langs';
import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {Subject} from '@/services/tuples/subject-types';
import {Report} from '@/services/tuples/report-types';
import {EventTypes} from '@/events/types';
import {saveReport} from '@/services/tuples/report';
import {useEventBus} from '@/events/event-bus';

export const HeaderReportNameEditor = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {report} = props;

	const language = useLanguage();
	const {fire} = useEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = async (name: string) => {
		report.name = name;
		forceUpdate();
	};
	const onNameChangeComplete = async (name: string) => {
		report.name = name.trim() || language.PLAIN.DEFAULT_REPORT_NAME;
		forceUpdate();
		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveReport(report),
			() => {
			});
	};

	return <PageTitleEditor title={report.name}
	                        defaultTitle={language.PLAIN.DEFAULT_REPORT_NAME}
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};
