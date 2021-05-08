import React, {ChangeEvent} from 'react';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {Lang} from '../../../../../../langs';
import {Report} from '../../../../../../services/tuples/report-types';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {PropName, PropValue, PropValueInput} from '../settings-widgets/widgets';

export const NamePropEditor = (props: { report: Report }) => {
    const {report} = props;

    const {fire} = useReportEditEventBus();
    const forceUpdate = useForceUpdate();
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        if (report.name === value) {
            return;
        }

        report.name = value;
        fire(ReportEditEventTypes.NAME_CHANGED, report);
        forceUpdate();
    };

    return <>
        <PropName>{Lang.CHART.NAME}</PropName>
        <PropValue>
            <PropValueInput value={report.name || ''} onChange={onNameChange}/>
        </PropValue>
    </>;
};