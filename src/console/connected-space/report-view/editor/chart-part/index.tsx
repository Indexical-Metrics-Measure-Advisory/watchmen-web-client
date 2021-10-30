import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Chart} from '@/widgets/report';
import React, {useEffect} from 'react';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {ChartWrapper, EditChartContainer} from './widgets';

export const ChartPart = (props: { connectedSpace: ConnectedSpace; report: Report, applyRect?: boolean }) => {
	const {connectedSpace, report, applyRect = true} = props;

	const {on, off} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ReportEditEventTypes.SIZE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.BASIC_STYLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.TOOLBOX_CHANGED, forceUpdate);
		on(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.CHART_BAR_STYLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.CHART_PIE_STYLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.CHART_TREEMAP_STYLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.CHART_MAP_STYLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_TITLE_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_LEGEND_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_GRID_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_LABEL_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_XAXIS_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_YAXIS_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_SCRIPT_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_SCRIPT_VARS_DEFS_CHANGED, forceUpdate);
		on(ReportEditEventTypes.ECHART_SCRIPT_VARS_CHANGED, forceUpdate);
		/**
		 * structure change will lead reload data which handled in settings-saver,
		 * ignore here
		 */
		return () => {
			off(ReportEditEventTypes.SIZE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.BASIC_STYLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.TOOLBOX_CHANGED, forceUpdate);
			off(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.CHART_BAR_STYLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.CHART_PIE_STYLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.CHART_TREEMAP_STYLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.CHART_MAP_STYLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_TITLE_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_LEGEND_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_GRID_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_LABEL_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_XAXIS_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_YAXIS_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_SCRIPT_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_SCRIPT_VARS_DEFS_CHANGED, forceUpdate);
			off(ReportEditEventTypes.ECHART_SCRIPT_VARS_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	return <EditChartContainer>
		<ChartWrapper rect={report.rect} applyRect={applyRect}>
			<Chart report={report} fixed={true} editable={false} removable={false}
			       editing={true} thumbnail={connectedSpace.isTemplate}/>
		</ChartWrapper>
	</EditChartContainer>;

};