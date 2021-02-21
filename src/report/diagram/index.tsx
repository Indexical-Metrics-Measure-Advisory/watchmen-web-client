import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICON_LOADING } from '../../basic-widgets/constants';
import { useForceUpdate } from '../../basic-widgets/utils';
import { fetchChartData } from '../../services/console/report';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';
import { useReportEventBus } from '../report-event-bus';
import { ReportEventTypes } from '../report-event-bus-types';
import { ChartDiagram } from './chart-diagram';
import { DiagramContainer, DiagramLoading } from './widgets';

interface DiagramState {
	loaded: boolean;
	dataset?: ChartDataSet;
}

export const Diagram = (props: { report: Report }) => {
	const { report } = props;

	const { on, off } = useReportEventBus();
	const [ state, setState ] = useState<DiagramState>({ loaded: false });
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (!state.loaded) {
			(async () => {
				const dataset = await fetchChartData(report.reportId, report.chart.type);
				setState({ loaded: true, dataset });
			})();
		}
		const onEditCompleted = (completedReport: Report, shouldReloadData: boolean) => {
			if (report !== completedReport) {
				return;
			}
			if (shouldReloadData) {
				setState({ loaded: false });
				(async () => {
					const dataset = await fetchChartData(report.reportId, report.chart.type);
					setState({ loaded: true, dataset });
				})();
			} else {
				forceUpdate();
			}
		};
		on(ReportEventTypes.EDIT_COMPLETED, onEditCompleted);
		return () => {
			off(ReportEventTypes.EDIT_COMPLETED, onEditCompleted);
		};
	}, [
		on, off, forceUpdate,
		report, state.loaded
	]);

	const { chart: { settings } } = report;

	return <DiagramContainer settings={settings}>
		{state.loaded
			? <ChartDiagram report={report} dataset={state.dataset!}/>
			: <DiagramLoading>
				<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
			</DiagramLoading>}
	</DiagramContainer>;
};