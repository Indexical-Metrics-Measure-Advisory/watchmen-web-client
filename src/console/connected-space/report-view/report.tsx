import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Chart} from '@/widgets/report';
import React from 'react';

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