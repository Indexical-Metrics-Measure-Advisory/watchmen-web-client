import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const NIGHTINGALE: ChartDef = {
	type: ChartType.NIGHTINGALE,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};