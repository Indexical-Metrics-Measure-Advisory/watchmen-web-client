import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const MAP: ChartDef = {
	type: ChartType.MAP,
	minDimensionCount: 1,
	maxDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 3
};