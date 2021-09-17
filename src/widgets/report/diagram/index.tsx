import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {Report} from '@/services/data/tuples/report-types';
import React from 'react';
import {ChartDiagram} from './chart-diagram';
import {DiagramContainer} from './widgets';

export const Diagram = (props: { report: Report, dataset: ChartDataSet }) => {
	const {report, dataset} = props;

	const {chart: {settings}} = report;

	return <DiagramContainer settings={settings}>
		<ChartDiagram report={report} dataset={dataset!}/>
	</DiagramContainer>;
};