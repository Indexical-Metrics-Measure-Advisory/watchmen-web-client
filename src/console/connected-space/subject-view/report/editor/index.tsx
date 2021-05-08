import React, {useEffect, useState} from 'react';
import {useReportEventBus} from '../../../../../report/report-event-bus';
import {ReportEventTypes} from '../../../../../report/report-event-bus-types';
import {ConnectedSpace} from '../../../../../services/tuples/connected-space-types';
import {Report} from '../../../../../services/tuples/report-types';
import {Subject} from '../../../../../services/tuples/subject-types';
import {ChartPart} from './chart-part';
import {ReportEditEventBusProvider} from './report-edit-event-bus';
import {ReportSettings} from './settings';
import {EditorContainer} from './widgets';

export const ReportEditor = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
    const {connectedSpace, subject} = props;

    const {on, off} = useReportEventBus();
    const [report, setReport] = useState<Report | null>(null);
    useEffect(() => {
        const onEdit = (report: Report) => {
            if (!(subject.reports || []).includes(report)) {
                return;
            }
            setReport(report);
        };
        const onEditCompleted = (completedReport: Report) => {
            if (report === completedReport) {
                setReport(null);
            }
        };
        on(ReportEventTypes.DO_EDIT, onEdit);
        on(ReportEventTypes.EDIT_COMPLETED, onEditCompleted);
        return () => {
            off(ReportEventTypes.DO_EDIT, onEdit);
            off(ReportEventTypes.EDIT_COMPLETED, onEditCompleted);
        };
    }, [on, off, subject.reports, report]);

    if (!report) {
        return null;
    }

    return <ReportEditEventBusProvider>
        <EditorContainer>
            <ChartPart report={report}/>
            <ReportSettings connectedSpace={connectedSpace} subject={subject} report={report}/>
        </EditorContainer>
    </ReportEditEventBusProvider>;
};