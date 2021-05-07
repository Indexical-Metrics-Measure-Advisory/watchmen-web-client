import React from 'react';
import {Report} from '../services/tuples/report-types';
import {Container} from './container';

export const Chart = (props: {
    report: Report;
    fixed: boolean;
    editable: boolean;
    /** chart can be readonly mode and editing mode */
    editing: boolean;
    removable: boolean;
}) => {
    const {report, fixed, editable, editing, removable} = props;

    return <Container report={report} fixed={fixed}
                      editable={editable} editing={editing}
                      removable={removable}/>;
};