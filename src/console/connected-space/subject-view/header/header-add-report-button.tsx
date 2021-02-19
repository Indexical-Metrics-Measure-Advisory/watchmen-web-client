import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_REPORT } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Lang } from '../../../../langs';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { saveReport } from '../../../../services/tuples/report';
import { Subject } from '../../../../services/tuples/subject-types';
import { createReport } from '../../../utils/tuples';
import { useSubjectEventBus } from '../subject-event-bus';
import { SubjectEventTypes } from '../subject-event-bus-types';

export const HeaderAddReportButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { subject } = props;

	const { fire } = useSubjectEventBus();

	const onAddReportClicked = async () => {
		const report = createReport();
		await saveReport(report);
		if (!subject.reports) {
			subject.reports = [];
		}
		subject.reports.push(report);
		fire(SubjectEventTypes.REPORT_ADDED, report);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_REPORT} onClick={onAddReportClicked}>
		<FontAwesomeIcon icon={ICON_REPORT}/>
	</PageHeaderButton>;
};