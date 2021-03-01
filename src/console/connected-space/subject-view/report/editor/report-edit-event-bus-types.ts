import { Report, ReportDimension, ReportIndicator } from '../../../../../services/tuples/report-types';

export enum ReportEditEventTypes {
	NAME_CHANGED = 'name-changed',
	DESCRIPTION_CHANGED = 'description-changed',
	SIZE_CHANGED = 'size-changed',
	BASIC_STYLE_CHANGED = 'basic-style-changed',

	CHART_COUNT_STYLE_CHANGED = 'chart-count-style-changed',
	CHART_PIE_STYLE_CHANGED = 'chart-pie-style-changed',
	CHART_TREE_STYLE_CHANGED = 'chart-tree-style-changed',
	CHART_TREEMAP_STYLE_CHANGED = 'chart-treemap-style-changed',
	CHART_MAP_STYLE_CHANGED = 'chart-map-style-changed',

	ECHART_TITLE_CHANGED = 'echart-title-changed',
	ECHART_LEGEND_CHANGED = 'echart-legend-changed',
	ECHART_GRID_CHANGED = 'echart-grid-changed',
	ECHART_XAXIS_CHANGED = 'echart-xaxis-changed',
	ECHART_YAXIS_CHANGED = 'echart-yaxis-changed',

	CHART_TYPE_CHANGED = 'chart-type-changed',
	DIMENSION_CHANGED = 'dimension-changed',
	DIMENSION_ADDED = 'dimension-added',
	DIMENSION_REMOVED = 'dimension-removed',
	INDICATOR_CHANGED = 'indicator-changed',
	INDICATOR_ADDED = 'indicator-added',
	INDICATOR_REMOVED = 'indicator-removed',

	EDIT_COMPLETED = 'edit-completed',
	EXPAND_ALL_SECTIONS = 'expand-all-sections',
	COLLAPSE_ALL_SECTIONS = 'collapse-all-sections'
}

export interface ReportEditEventBus {
	fire(type: ReportEditEventTypes.NAME_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.NAME_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.NAME_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.DESCRIPTION_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.DESCRIPTION_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.DESCRIPTION_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.SIZE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.SIZE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.SIZE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.BASIC_STYLE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.BASIC_STYLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.BASIC_STYLE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, listener: (report: Report) => void): this;

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

	fire(type: ReportEditEventTypes.ECHART_XAXIS_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.ECHART_XAXIS_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.ECHART_XAXIS_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.ECHART_YAXIS_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.ECHART_YAXIS_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.ECHART_YAXIS_CHANGED, listener: (report: Report) => void): this;

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

	fire(type: ReportEditEventTypes.EDIT_COMPLETED, report: Report): this;
	on(type: ReportEditEventTypes.EDIT_COMPLETED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.EDIT_COMPLETED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.EXPAND_ALL_SECTIONS, report: Report): this;
	on(type: ReportEditEventTypes.EXPAND_ALL_SECTIONS, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.EXPAND_ALL_SECTIONS, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.COLLAPSE_ALL_SECTIONS, report: Report): this;
	on(type: ReportEditEventTypes.COLLAPSE_ALL_SECTIONS, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.COLLAPSE_ALL_SECTIONS, listener: (report: Report) => void): this;
}