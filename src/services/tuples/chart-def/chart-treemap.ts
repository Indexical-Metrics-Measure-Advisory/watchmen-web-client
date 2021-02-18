import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const TREEMAP: ChartDef = {
	type: ChartType.TREEMAP,
	minDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};
