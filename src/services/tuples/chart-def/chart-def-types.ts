import { ChartType } from '../chart-types';

export interface ChartDef {
	readonly type: ChartType;
	readonly minDimensionCount?: number;
	readonly maxDimensionCount?: number;
	readonly minIndicatorCount?: number;
	readonly maxIndicatorCount?: number;

	readonly canHoldTitle: boolean;
	readonly canHoldLegend: boolean;
	readonly canUseGrid: boolean;
}