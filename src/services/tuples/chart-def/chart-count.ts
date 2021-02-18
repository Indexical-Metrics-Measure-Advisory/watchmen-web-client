import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const COUNT: ChartDef = {
	type: ChartType.COUNT,
	minDimensionCount: 0,
	maxDimensionCount: 0,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};
