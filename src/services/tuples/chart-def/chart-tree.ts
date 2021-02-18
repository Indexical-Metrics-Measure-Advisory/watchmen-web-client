import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const TREE: ChartDef = {
	type: ChartType.TREE,
	minDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
};
