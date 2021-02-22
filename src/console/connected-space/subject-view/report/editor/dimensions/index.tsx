import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { Lang } from '../../../../../../langs';
import { ChartHelper } from '../../../../../../report/chart-utils';
import { Report, ReportDimension } from '../../../../../../services/tuples/report-types';
import { Subject } from '../../../../../../services/tuples/subject-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { Section } from '../settings-widgets/section';
import { DimensionEditor } from './dimension';

export const DimensionsSection = (props: { subject: Subject, report: Report }) => {
	const { subject, report } = props;
	const { chart: { type } } = report;

	const { on, off, fire } = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onChartTypeChanged = (changedReport: Report) => {
			if (changedReport !== report) {
				return;
			}
			forceUpdate();
		};
		on(ReportEditEventTypes.CHART_TYPE_CHANGED, onChartTypeChanged);
		return () => {
			off(ReportEditEventTypes.CHART_TYPE_CHANGED, onChartTypeChanged);
		};
	}, [ on, off, forceUpdate, report ]);

	const onDelete = (dimension: ReportDimension) => {
		const index = report.dimensions.indexOf(dimension);
		console.log(dimension, index);
		if (index !== -1) {
			report.dimensions.splice(index, 1);
			fire(ReportEditEventTypes.DIMENSION_REMOVED, report, dimension);
			forceUpdate();
		}
	};

	/** defend */
	const chartUtils = ChartHelper[type];

	if (!chartUtils.shouldHasDimension()) {
		return null;
	}

	chartUtils.defend(report);

	return <Section title={Lang.CHART.SECTION_TITLE_DIMENSIONS}>
		{report.dimensions.map(dimension => {
			return <DimensionEditor subject={subject} report={report} dimension={dimension}
			                        onDelete={onDelete}
			                        key={v4()}/>;
		})}
	</Section>;
};