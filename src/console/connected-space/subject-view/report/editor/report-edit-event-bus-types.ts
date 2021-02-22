import { Report, ReportDimension } from '../../../../../services/tuples/report-types';

export enum ReportEditEventTypes {
	NAME_CHANGED = 'name-changed',
	DESCRIPTION_CHANGED = 'description-changed',
	SIZE_CHANGED = 'size-changed',
	BASIC_STYLE_CHANGED = 'basic-style-changed',

	CHART_COUNT_STYLE_CHANGED = 'chart-count-style-changed',

	CHART_TYPE_CHANGED = 'chart-type-changed',
	DIMENSION_CHANGED = 'dimension-changed',
	DIMENSION_ADDED = 'dimension-added',
	DIMENSION_REMOVED = 'dimension-removed',

	EDIT_COMPLETED = 'edit-completed'
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

	fire(type: ReportEditEventTypes.EDIT_COMPLETED, report: Report): this;
	on(type: ReportEditEventTypes.EDIT_COMPLETED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.EDIT_COMPLETED, listener: (report: Report) => void): this;
}