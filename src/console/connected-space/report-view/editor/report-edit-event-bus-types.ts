import {
	Report,
	ReportDimension,
	ReportFilter,
	ReportFilterJoint,
	ReportFunnel,
	ReportIndicator
} from '@/services/data/tuples/report-types';

export enum ReportEditEventTypes {
	DESCRIPTION_CHANGED = 'description-changed',
	SIZE_CHANGED = 'size-changed',
	BASIC_STYLE_CHANGED = 'basic-style-changed',
	TOOLBOX_CHANGED = 'toolbox-changed',

	CHART_COUNT_STYLE_CHANGED = 'chart-count-style-changed',
	CHART_BAR_STYLE_CHANGED = 'chart-bar-style-changed',
	CHART_PIE_STYLE_CHANGED = 'chart-pie-style-changed',
	CHART_TREE_STYLE_CHANGED = 'chart-tree-style-changed',
	CHART_TREEMAP_STYLE_CHANGED = 'chart-treemap-style-changed',
	CHART_MAP_STYLE_CHANGED = 'chart-map-style-changed',

	ECHART_TITLE_CHANGED = 'echart-title-changed',
	ECHART_LEGEND_CHANGED = 'echart-legend-changed',
	ECHART_GRID_CHANGED = 'echart-grid-changed',
	ECHART_LABEL_CHANGED = 'echart-label-changed',
	ECHART_XAXIS_CHANGED = 'echart-xaxis-changed',
	ECHART_YAXIS_CHANGED = 'echart-yaxis-changed',

	ECHART_SCRIPT_CHANGED = 'echart-script-changed',
	ECHART_SCRIPT_VARS_DEFS_CHANGED = 'echart-script-vars-defs-changed',
	ECHART_SCRIPT_VARS_CHANGED = 'echart-script-vars-changed',

	CHART_TYPE_CHANGED = 'chart-type-changed',
	DIMENSION_CHANGED = 'dimension-changed',
	DIMENSION_ADDED = 'dimension-added',
	DIMENSION_REMOVED = 'dimension-removed',
	INDICATOR_CHANGED = 'indicator-changed',
	INDICATOR_ADDED = 'indicator-added',
	INDICATOR_REMOVED = 'indicator-removed',
	FILTER_CREATED = 'filter-created',
	FILTER_DESTROYED = 'filter-destroyed',
	FILTER_CHANGED = 'filter-changed',
	FILTER_ADDED = 'filter-added',
	FILTER_REMOVED = 'filter-removed',
	FUNNEL_ADDED = 'funnel-added',
	FUNNEL_REMOVED = 'funnel-removed',
	FUNNEL_RANGE_CHANGED = 'funnel-range-changed',
	FUNNEL_VALUE_CHANGED = 'funnel-value-changed',
	TRUNCATE_CHANGED = 'truncate-changed',

	EXPAND_ALL_SECTIONS = 'expand-all-sections',
	COLLAPSE_ALL_SECTIONS = 'collapse-all-sections',

	SIMULATOR_SWITCHED = 'simulator-switched',
	SIMULATE_DATA_UPLOADED = 'simulate-data-uploaded'
}

export interface ReportEditEventBus {
	fire(type: ReportEditEventTypes.DESCRIPTION_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.DESCRIPTION_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.DESCRIPTION_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.SIZE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.SIZE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.SIZE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.BASIC_STYLE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.BASIC_STYLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.BASIC_STYLE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.TOOLBOX_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.TOOLBOX_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.TOOLBOX_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.CHART_BAR_STYLE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.CHART_BAR_STYLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.CHART_BAR_STYLE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.CHART_PIE_STYLE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.CHART_PIE_STYLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.CHART_PIE_STYLE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.CHART_TREEMAP_STYLE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.CHART_TREEMAP_STYLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.CHART_TREEMAP_STYLE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.CHART_MAP_STYLE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.CHART_MAP_STYLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.CHART_MAP_STYLE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.ECHART_TITLE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.ECHART_TITLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.ECHART_TITLE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.ECHART_LEGEND_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.ECHART_LEGEND_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.ECHART_LEGEND_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.ECHART_GRID_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.ECHART_GRID_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.ECHART_GRID_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.ECHART_LABEL_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.ECHART_LABEL_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.ECHART_LABEL_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.ECHART_XAXIS_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.ECHART_XAXIS_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.ECHART_XAXIS_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.ECHART_YAXIS_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.ECHART_YAXIS_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.ECHART_YAXIS_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.ECHART_SCRIPT_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.ECHART_SCRIPT_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.ECHART_SCRIPT_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.ECHART_SCRIPT_VARS_DEFS_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.ECHART_SCRIPT_VARS_DEFS_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.ECHART_SCRIPT_VARS_DEFS_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.ECHART_SCRIPT_VARS_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.ECHART_SCRIPT_VARS_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.ECHART_SCRIPT_VARS_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.CHART_TYPE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.CHART_TYPE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.CHART_TYPE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.DIMENSION_CHANGED, report: Report, dimension: ReportDimension): this;
	on(type: ReportEditEventTypes.DIMENSION_CHANGED, listener: (report: Report, dimension: ReportDimension) => void): this;
	off(type: ReportEditEventTypes.DIMENSION_CHANGED, listener: (report: Report, dimension: ReportDimension) => void): this;

	fire(type: ReportEditEventTypes.DIMENSION_ADDED, report: Report, dimension: ReportDimension): this;
	on(type: ReportEditEventTypes.DIMENSION_ADDED, listener: (report: Report, dimension: ReportDimension) => void): this;
	off(type: ReportEditEventTypes.DIMENSION_ADDED, listener: (report: Report, dimension: ReportDimension) => void): this;

	fire(type: ReportEditEventTypes.DIMENSION_REMOVED, report: Report, dimension: ReportDimension): this;
	on(type: ReportEditEventTypes.DIMENSION_REMOVED, listener: (report: Report, dimension: ReportDimension) => void): this;
	off(type: ReportEditEventTypes.DIMENSION_REMOVED, listener: (report: Report, dimension: ReportDimension) => void): this;

	fire(type: ReportEditEventTypes.INDICATOR_CHANGED, report: Report, indicator: ReportIndicator): this;
	on(type: ReportEditEventTypes.INDICATOR_CHANGED, listener: (report: Report, indicator: ReportIndicator) => void): this;
	off(type: ReportEditEventTypes.INDICATOR_CHANGED, listener: (report: Report, indicator: ReportIndicator) => void): this;

	fire(type: ReportEditEventTypes.INDICATOR_ADDED, report: Report, indicator: ReportIndicator): this;
	on(type: ReportEditEventTypes.INDICATOR_ADDED, listener: (report: Report, indicator: ReportIndicator) => void): this;
	off(type: ReportEditEventTypes.INDICATOR_ADDED, listener: (report: Report, indicator: ReportIndicator) => void): this;

	fire(type: ReportEditEventTypes.INDICATOR_REMOVED, report: Report, indicator: ReportIndicator): this;
	on(type: ReportEditEventTypes.INDICATOR_REMOVED, listener: (report: Report, indicator: ReportIndicator) => void): this;
	off(type: ReportEditEventTypes.INDICATOR_REMOVED, listener: (report: Report, indicator: ReportIndicator) => void): this;

	fire(type: ReportEditEventTypes.FILTER_CREATED, report: Report, filter: ReportFilterJoint): this;
	on(type: ReportEditEventTypes.FILTER_CREATED, listener: (report: Report, filter: ReportFilterJoint) => void): this;
	off(type: ReportEditEventTypes.FILTER_CREATED, listener: (report: Report, filter: ReportFilterJoint) => void): this;

	fire(type: ReportEditEventTypes.FILTER_DESTROYED, report: Report): this;
	on(type: ReportEditEventTypes.FILTER_DESTROYED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.FILTER_DESTROYED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.FILTER_CHANGED, report: Report, filter: ReportFilter): this;
	on(type: ReportEditEventTypes.FILTER_CHANGED, listener: (report: Report, filter: ReportFilter) => void): this;
	off(type: ReportEditEventTypes.FILTER_CHANGED, listener: (report: Report, filter: ReportFilter) => void): this;

	fire(type: ReportEditEventTypes.FILTER_ADDED, report: Report, filter: ReportFilter): this;
	on(type: ReportEditEventTypes.FILTER_ADDED, listener: (report: Report, filter: ReportFilter) => void): this;
	off(type: ReportEditEventTypes.FILTER_ADDED, listener: (report: Report, filter: ReportFilter) => void): this;

	fire(type: ReportEditEventTypes.FILTER_REMOVED, report: Report, filter: ReportFilter): this;
	on(type: ReportEditEventTypes.FILTER_REMOVED, listener: (report: Report, filter: ReportFilter) => void): this;
	off(type: ReportEditEventTypes.FILTER_REMOVED, listener: (report: Report, filter: ReportFilter) => void): this;

	fire(type: ReportEditEventTypes.FUNNEL_RANGE_CHANGED, report: Report, funnel: ReportFunnel): this;
	on(type: ReportEditEventTypes.FUNNEL_RANGE_CHANGED, listener: (report: Report, funnel: ReportFunnel) => void): this;
	off(type: ReportEditEventTypes.FUNNEL_RANGE_CHANGED, listener: (report: Report, funnel: ReportFunnel) => void): this;

	fire(type: ReportEditEventTypes.FUNNEL_VALUE_CHANGED, report: Report, funnel: ReportFunnel): this;
	on(type: ReportEditEventTypes.FUNNEL_VALUE_CHANGED, listener: (report: Report, funnel: ReportFunnel) => void): this;
	off(type: ReportEditEventTypes.FUNNEL_VALUE_CHANGED, listener: (report: Report, funnel: ReportFunnel) => void): this;

	fire(type: ReportEditEventTypes.FUNNEL_ADDED, report: Report, funnel: ReportFunnel): this;
	on(type: ReportEditEventTypes.FUNNEL_ADDED, listener: (report: Report, funnel: ReportFunnel) => void): this;
	off(type: ReportEditEventTypes.FUNNEL_ADDED, listener: (report: Report, funnel: ReportFunnel) => void): this;

	fire(type: ReportEditEventTypes.FUNNEL_REMOVED, report: Report, funnel: ReportFunnel): this;
	on(type: ReportEditEventTypes.FUNNEL_REMOVED, listener: (report: Report, funnel: ReportFunnel) => void): this;
	off(type: ReportEditEventTypes.FUNNEL_REMOVED, listener: (report: Report, funnel: ReportFunnel) => void): this;

	fire(type: ReportEditEventTypes.TRUNCATE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.TRUNCATE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.TRUNCATE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.EXPAND_ALL_SECTIONS, report: Report): this;
	on(type: ReportEditEventTypes.EXPAND_ALL_SECTIONS, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.EXPAND_ALL_SECTIONS, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.COLLAPSE_ALL_SECTIONS, report: Report): this;
	on(type: ReportEditEventTypes.COLLAPSE_ALL_SECTIONS, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.COLLAPSE_ALL_SECTIONS, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.SIMULATOR_SWITCHED, report: Report, on: boolean): this;
	on(type: ReportEditEventTypes.SIMULATOR_SWITCHED, listener: (report: Report, on: boolean) => void): this;
	off(type: ReportEditEventTypes.SIMULATOR_SWITCHED, listener: (report: Report, on: boolean) => void): this;

	fire(type: ReportEditEventTypes.SIMULATE_DATA_UPLOADED, report: Report, data: Array<any>): this;
	on(type: ReportEditEventTypes.SIMULATE_DATA_UPLOADED, listener: (report: Report, data: Array<any>) => void): this;
	off(type: ReportEditEventTypes.SIMULATE_DATA_UPLOADED, listener: (report: Report, data: Array<any>) => void): this;
}