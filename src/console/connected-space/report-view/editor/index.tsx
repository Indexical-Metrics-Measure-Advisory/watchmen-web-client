import React, {useEffect, useState} from 'react';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Report} from '../../../../services/tuples/report-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {ChartPart} from './chart-part';
import {ReportEditEventBusProvider} from './report-edit-event-bus';
import {ReportSettings} from './settings';
import {EditorContainer} from './widgets';
import {useReportViewEventBus} from '../report-view-event-bus';
import {ReportViewEventTypes} from '../report-view-event-bus-types';

export const ReportEditor = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report, editable: boolean }) => {
	const {connectedSpace, subject, report, editable} = props;

	const {on: onView, off: offView} = useReportViewEventBus();
	const [datasetVisible, setDatasetVisible] = useState(false);
	useEffect(() => {
		const onShowDataset = (aReport: Report, shown: boolean) => {
			if (aReport !== report) {
				return;
			}
			setDatasetVisible(shown);
		};

		onView(ReportViewEventTypes.SHOW_DATASET, onShowDataset);
		return () => {
			offView(ReportViewEventTypes.SHOW_DATASET, onShowDataset);
		};
	}, [onView, offView, report]);

	return <ReportEditEventBusProvider>
		<EditorContainer datasetVisible={datasetVisible} editable={editable}>
			{editable ? <ReportSettings connectedSpace={connectedSpace} subject={subject} report={report}/> : null}
			<ChartPart report={report}/>
		</EditorContainer>
	</ReportEditEventBusProvider>;
};