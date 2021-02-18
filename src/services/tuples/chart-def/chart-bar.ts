import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const BAR: ChartDef = {
	type: ChartType.BAR,
	minDimensionCount: 1,
	minIndicatorCount: 1,
};
