import React, { useEffect } from 'react';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { Chart } from '../../../../../../report';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { ChartWrapper, EditChartContainer } from './widgets';

export const ChartPart = (props: { report: Report }) => {
	const { report } = props;

	const { on, off } = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ReportEditEventTypes.SIZE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.BASIC_STYLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.CHART_TREEMAP_STYLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_TITLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_LEGEND_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_GRID_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_XAXIS_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_YAXIS_CHANGED, forceUpdate);
		/**
		 * structure change will lead reload data which handled in settings-saver,
		 * ignore here
		 */
		return () => {
			off(ReportEditEventTypes.SIZE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.BASIC_STYLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.CHART_TREEMAP_STYLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_TITLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_LEGEND_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_GRID_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_XAXIS_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_YAXIS_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	return <EditChartContainer>
		<ChartWrapper rect={report.rect}>
			<Chart report={report} fixed={true} editable={false} removable={false}
			       editing={true}/>
		</ChartWrapper>
	</EditChartContainer>;

};