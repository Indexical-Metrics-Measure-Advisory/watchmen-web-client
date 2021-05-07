import React from 'react';
import {Chart} from '../../../../report';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Report} from '../../../../services/tuples/report-types';
import {Subject} from '../../../../services/tuples/subject-types';

export const SubjectReport = (props: {
    connectedSpace: ConnectedSpace;
    subject: Subject;
    report: Report;
    editable: boolean;
    removable: boolean;
}) => {
    const {report, editable, removable} = props;

    return <Chart report={report} fixed={false}
                  editable={editable} editing={false}
                  removable={removable}/>;
};