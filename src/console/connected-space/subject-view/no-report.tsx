import React from 'react';
import {Lang} from '@/langs';
import {createReport} from '../../utils/tuples';
import {EventTypes} from '@/events/types';
import {saveNewReport} from '@/services/tuples/report';
import {useEventBus} from '@/events/event-bus';
import {Subject} from '@/services/tuples/subject-types';
import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {toSubjectReport} from '@/routes/utils';
import {useHistory} from 'react-router-dom';
import {SubjectNoReport, SubjectNoReportCreateButton} from './widgets';

export const NoReport = (props: { connectedSpace: ConnectedSpace; subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();

	const onAddClicked = () => {
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

	return <SubjectNoReport>
		<span>
			{Lang.CONSOLE.CONNECTED_SPACE.NO_REPORT}
			<SubjectNoReportCreateButton onClick={onAddClicked}>
				{Lang.CONSOLE.CONNECTED_SPACE.CREATE_REPORT}
			</SubjectNoReportCreateButton>
			{Lang.CONSOLE.CONNECTED_SPACE.NO_REPORT_2}
		</span>
	</SubjectNoReport>;
};