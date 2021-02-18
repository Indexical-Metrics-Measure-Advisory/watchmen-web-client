import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const LINE: ChartDef = {
	type: ChartType.LINE,
	minDimensionCount: 1,
	minIndicatorCount: 1
};
