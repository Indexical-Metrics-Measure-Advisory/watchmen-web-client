import { GraphicsPosition, GraphicsSize } from '../graphics/graphics-types';
import { Chart } from './chart-types';
import { Tuple } from './tuple-types';

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
	column: string;
	arithmetic: ReportIndicatorArithmetic;
}

export interface ReportDimension {
	column: string;
}

export interface Report extends Tuple {
	reportId: string;
	name: string;
	indicators: Array<ReportIndicator>;
	dimensions: Array<ReportDimension>;
	description?: string;
	rect: GraphicsPosition & GraphicsSize;
	chart: Chart
}
