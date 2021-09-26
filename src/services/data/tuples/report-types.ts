import {GraphicsPosition, GraphicsSize} from '../graphics/graphics-types';
import {Chart} from './chart-types';
import {ParameterCondition, ParameterExpression, ParameterJoint} from './factor-calculator-types';
import {Tuple} from './tuple-types';

export enum ReportIndicatorArithmetic {
	NONE = 'none',
	COUNT = 'count',
	SUMMARY = 'sum',
	AVERAGE = 'avg',
	// MEDIAN = "med",
	MAXIMUM = 'max',
	MINIMUM = 'min',
}

export interface ReportIndicator {
	columnId: string;
	name: string;
	arithmetic: ReportIndicatorArithmetic;
}

export interface ReportDimension {
	columnId: string;
	name: string;
}

export enum ReportFunnelType {
	NUMERIC = 'numeric',
	DATE = 'date',
	YEAR = 'year',
	HALF_YEAR = 'half-year',
	QUARTER = 'quarter',
	MONTH = 'month',
	HALF_MONTH = 'half-month',
	TEN_DAYS = 'ten-days',
	WEEK_OF_MONTH = 'week-of-month',
	HALF_WEEK = 'half-week',
	DAY_KIND = 'day-kind',
	DAY_OF_WEEK = 'day-of-week',
	HOUR = 'hour',
	HOUR_KIND = 'hour-kind',
	AM_PM = 'am-pm',
	ENUM = 'enum'
}

export interface ReportFunnel {
	funnelId: string;
	columnId: string;
	type: ReportFunnelType;
	range: boolean;
	enabled: boolean;
	values?: Array<string>;
}

/** filter */
export interface ReportFilter extends ParameterCondition {
}

export interface ReportFilterJoint extends ReportFilter, ParameterJoint {
	filters: Array<ReportFilter>;
}

/**
 * in report filter expression, value of factorId is columnId from subject dataset columns
 */
export interface ReportFilterExpression extends ReportFilter, ParameterExpression {
}

export type ReportRect = GraphicsPosition & GraphicsSize;

export interface Report extends Tuple {
	reportId: string;
	name: string;
	indicators: Array<ReportIndicator>;
	dimensions: Array<ReportDimension>;
	funnels: Array<ReportFunnel>;
	filters?: ReportFilterJoint;
	description?: string;
	rect: ReportRect;
	chart: Chart;
	lastVisitTime: string;
}
