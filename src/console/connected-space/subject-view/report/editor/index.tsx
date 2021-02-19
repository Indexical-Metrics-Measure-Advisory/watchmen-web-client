import React, { useEffect, useState } from 'react';
import { Chart } from '../../../../../report';
import { useReportEventBus } from '../../../../../report/report-event-bus';
import { ReportEventTypes } from '../../../../../report/report-event-bus-types';
import { ConnectedSpace } from '../../../../../services/tuples/connected-space-types';
import { Report } from '../../../../../services/tuples/report-types';
import { Subject } from '../../../../../services/tuples/subject-types';
import { ReportSettings } from './settings';
import { EditorContainer } from './widgets';

export const ReportEditor = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const { on, off } = useReportEventBus();
	const [ report, setReport ] = useState<Report | null>(null);
	useEffect(() => {
		const onEdit = (report: Report) => {
			if (!(subject.reports || []).includes(report)) {
				return;
			}
			setReport(report);
		};
		on(ReportEventTypes.DO_EDIT, onEdit);
		return () => {
			off(ReportEventTypes.DO_EDIT, onEdit);
		};
	}, [ on, off, subject.reports ]);

	if (!report) {
		return null;
	}

	return <EditorContainer>
		<Chart report={report} fixed={true} editable={false} removable={false}/>
		<ReportSettings connectedSpace={connectedSpace} subject={subject} report={report}/>
	</EditorContainer>;
};