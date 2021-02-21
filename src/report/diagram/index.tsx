import React from 'react';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';
import { ChartDiagram } from './chart-diagram';
import { DiagramContainer } from './widgets';

export const Diagram = (props: { report: Report, dataset: ChartDataSet }) => {
	const { report, dataset } = props;

	const { chart: { settings } } = report;

	return <DiagramContainer settings={settings}>
		<ChartDiagram report={report} dataset={dataset!}/>
	</DiagramContainer>;
};