import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {saveReport} from '@/services/data/tuples/report';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {PageTitleEditor} from '@/widgets/basic/page-title-editor';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useLanguage} from '@/widgets/langs';
import React from 'react';

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
		fire(EventTypes.INVOKE_REMOTE_REQUEST, async () => await saveReport(report));
	};

	return <PageTitleEditor title={report.name}
	                        defaultTitle={language.PLAIN.DEFAULT_REPORT_NAME}
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};
