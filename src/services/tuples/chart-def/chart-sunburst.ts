import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const SUNBURST: ChartDef = {
	type: ChartType.SUNBURST,
	minDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};
