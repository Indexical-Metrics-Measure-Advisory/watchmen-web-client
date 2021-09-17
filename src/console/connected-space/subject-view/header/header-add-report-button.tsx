import {toSubjectReport} from '@/routes/utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {saveNewReport} from '@/services/data/tuples/report';
import {Subject} from '@/services/data/tuples/subject-types';
import {ICON_REPORT} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {createReport} from '../../../utils/tuples';

export const HeaderAddReportButton = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();

	const onAddReportClicked = async () => {
		const report = createReport();
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveNewReport(report, subject.subjectId),
			() => {
				if (!subject.reports) {
					subject.reports = [];
				}
				subject.reports.push(report);
				history.push(toSubjectReport(connectedSpace.connectId, subject.subjectId, report.reportId));
			});
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.ADD_REPORT} onClick={onAddReportClicked}>
		<FontAwesomeIcon icon={ICON_REPORT}/>
	</PageHeaderButton>;
};