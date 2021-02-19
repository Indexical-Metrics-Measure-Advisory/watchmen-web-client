import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICON_LOADING } from '../../basic-widgets/constants';
import { fetchChartData } from '../../services/console/report';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';
import { ChartDiagram } from './chart-diagram';
import { DiagramContainer, DiagramLoading } from './widgets';

interface DiagramState {
	loaded: boolean;
	dataset?: ChartDataSet;
}

export const Diagram = (props: { report: Report }) => {
	const { report } = props;
	const { reportId, chart: { type: chartType } } = report;

	const [ state, setState ] = useState<DiagramState>({ loaded: false });
	useEffect(() => {
		if (!state.loaded) {
			(async () => {
				const dataset = await fetchChartData(reportId, chartType);
				setState({ loaded: true, dataset });
			})();
		}
	}, [ chartType, reportId, state.loaded ]);

	return <DiagramContainer>
		{state.loaded
			? <ChartDiagram report={report} dataset={state.dataset!}/>
			: <DiagramLoading>
				<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
			</DiagramLoading>}
	</DiagramContainer>;
};