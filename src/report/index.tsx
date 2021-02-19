import React from 'react';
import { Report } from '../services/tuples/report-types';
import { Container } from './container';
import { Diagram } from './diagram';

export const Chart = (props: {
	report: Report;
	fixed: boolean;
	editable: boolean;
	removable: boolean;
}) => {
	const { report, fixed, editable, removable } = props;

	return <Container report={report} fixed={fixed} editable={editable} removable={removable}>
		<Diagram report={report}/>
	</Container>;
};