import {toSubjectReport} from '@/routes/utils';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {saveNewReport} from '@/services/data/tuples/report';
import {Subject} from '@/services/data/tuples/subject-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {createReport} from '../../utils/tuples';
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