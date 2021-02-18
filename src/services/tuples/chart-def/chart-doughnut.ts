import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const DOUGHNUT: ChartDef = {
	type: ChartType.DOUGHNUT,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};