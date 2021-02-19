import React from 'react';
import { Report } from '../services/tuples/report-types';
import { Container } from './container';
import { Diagram } from './diagram';

export const Chart = (props: { report: Report }) => {
	const { report } = props;

	return <Container report={report}>
		<Diagram report={report}/>
	</Container>;
};