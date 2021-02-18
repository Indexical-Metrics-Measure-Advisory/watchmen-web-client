import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';


export const PIE: ChartDef = {
	type: ChartType.PIE,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};