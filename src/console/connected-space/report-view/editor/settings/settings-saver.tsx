import {Report} from '@/services/data/tuples/report-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import {Fragment, useEffect} from 'react';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';

export const SettingsSaver = (props: { report: Report }) => {
	const {report} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireReport} = useReportEventBus();
	const {on, off} = useReportEditEventBus();
	useEffect(() => {
		const onStyleChanged = (changedReport: Report) => {
			if (changedReport !== report) {
				return;
			}
			fireReport(ReportEventTypes.STYLE_CHANGED, changedReport);
		};
		const onStructureChanged = (changedReport: Report) => {
			if (changedReport !== report) {
				return;
			}
			fireReport(ReportEventTypes.STRUCTURE_CHANGED, changedReport);
		};

		on(ReportEditEventTypes.SIZE_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.DESCRIPTION_CHANGED, onStyleChanged);

		on(ReportEditEventTypes.BASIC_STYLE_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.TOOLBOX_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.CHART_BAR_STYLE_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.CHART_PIE_STYLE_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.CHART_TREEMAP_STYLE_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.CHART_MAP_STYLE_CHANGED, onStyleChanged);

		on(ReportEditEventTypes.ECHART_TITLE_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.ECHART_LEGEND_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.ECHART_GRID_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.ECHART_LABEL_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.ECHART_XAXIS_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.ECHART_YAXIS_CHANGED, onStyleChanged);

		on(ReportEditEventTypes.ECHART_SCRIPT_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.ECHART_SCRIPT_VARS_DEFS_CHANGED, onStyleChanged);
		on(ReportEditEventTypes.ECHART_SCRIPT_VARS_CHANGED, onStyleChanged);

		on(ReportEditEventTypes.CHART_TYPE_CHANGED, onStructureChanged);
		on(ReportEditEventTypes.DIMENSION_CHANGED, onStructureChanged);
		on(ReportEditEventTypes.DIMENSION_ADDED, onStructureChanged);
		on(ReportEditEventTypes.DIMENSION_REMOVED, onStructureChanged);
		on(ReportEditEventTypes.INDICATOR_CHANGED, onStructureChanged);
		on(ReportEditEventTypes.INDICATOR_ADDED, onStructureChanged);
		on(ReportEditEventTypes.INDICATOR_REMOVED, onStructureChanged);
		on(ReportEditEventTypes.FILTER_CREATED, onStructureChanged);
		on(ReportEditEventTypes.FILTER_DESTROYED, onStructureChanged);
		on(ReportEditEventTypes.FILTER_CHANGED, onStructureChanged);
		on(ReportEditEventTypes.FILTER_ADDED, onStructureChanged);
		on(ReportEditEventTypes.FILTER_REMOVED, onStructureChanged);
		on(ReportEditEventTypes.FUNNEL_RANGE_CHANGED, onStructureChanged);
		on(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, onStructureChanged);
		on(ReportEditEventTypes.FUNNEL_ADDED, onStructureChanged);
		on(ReportEditEventTypes.FUNNEL_REMOVED, onStructureChanged);
		on(ReportEditEventTypes.TRUNCATE_CHANGED, onStructureChanged);

		on(ReportEditEventTypes.SIMULATOR_SWITCHED, onStructureChanged);
		on(ReportEditEventTypes.SIMULATE_DATA_UPLOADED, onStructureChanged);

		return () => {
			off(ReportEditEventTypes.SIZE_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.DESCRIPTION_CHANGED, onStyleChanged);

			off(ReportEditEventTypes.BASIC_STYLE_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.TOOLBOX_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.CHART_BAR_STYLE_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.CHART_PIE_STYLE_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.CHART_TREEMAP_STYLE_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.CHART_MAP_STYLE_CHANGED, onStyleChanged);

			off(ReportEditEventTypes.ECHART_TITLE_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.ECHART_LEGEND_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.ECHART_GRID_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.ECHART_LABEL_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.ECHART_XAXIS_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.ECHART_YAXIS_CHANGED, onStyleChanged);

			off(ReportEditEventTypes.ECHART_SCRIPT_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.ECHART_SCRIPT_VARS_DEFS_CHANGED, onStyleChanged);
			off(ReportEditEventTypes.ECHART_SCRIPT_VARS_CHANGED, onStyleChanged);

			off(ReportEditEventTypes.CHART_TYPE_CHANGED, onStructureChanged);
			off(ReportEditEventTypes.DIMENSION_CHANGED, onStructureChanged);
			off(ReportEditEventTypes.DIMENSION_ADDED, onStructureChanged);
			off(ReportEditEventTypes.DIMENSION_REMOVED, onStructureChanged);
			off(ReportEditEventTypes.INDICATOR_CHANGED, onStructureChanged);
			off(ReportEditEventTypes.INDICATOR_ADDED, onStructureChanged);
			off(ReportEditEventTypes.INDICATOR_REMOVED, onStructureChanged);
			off(ReportEditEventTypes.FILTER_CREATED, onStructureChanged);
			off(ReportEditEventTypes.FILTER_DESTROYED, onStructureChanged);
			off(ReportEditEventTypes.FILTER_CHANGED, onStructureChanged);
			off(ReportEditEventTypes.FILTER_ADDED, onStructureChanged);
			off(ReportEditEventTypes.FILTER_REMOVED, onStructureChanged);
			off(ReportEditEventTypes.FUNNEL_RANGE_CHANGED, onStructureChanged);
			off(ReportEditEventTypes.FUNNEL_VALUE_CHANGED, onStructureChanged);
			off(ReportEditEventTypes.FUNNEL_ADDED, onStructureChanged);
			off(ReportEditEventTypes.FUNNEL_REMOVED, onStructureChanged);
			off(ReportEditEventTypes.TRUNCATE_CHANGED, onStructureChanged);

			off(ReportEditEventTypes.SIMULATOR_SWITCHED, onStructureChanged);
			off(ReportEditEventTypes.SIMULATE_DATA_UPLOADED, onStructureChanged);
		};
	}, [on, off, fireReport, fireGlobal, report]);

	return <Fragment/>;
};