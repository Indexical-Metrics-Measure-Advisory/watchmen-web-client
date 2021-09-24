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

/** filter */
export interface ReportFilter extends ParameterCondition {
}

export interface ReportFilterJoint extends ReportFilter, ParameterJoint {
	filters: Array<ReportFilter>;
}

export interface ReportFilterExpression extends ReportFilter, ParameterExpression {
}

export type ReportRect = GraphicsPosition & GraphicsSize;

export interface Report extends Tuple {
	reportId: string;
	name: string;
	indicators: Array<ReportIndicator>;
	dimensions: Array<ReportDimension>;
	filters?: ReportFilterJoint;
	description?: string;
	rect: ReportRect;
	chart: Chart;
	lastVisitTime: string;
}