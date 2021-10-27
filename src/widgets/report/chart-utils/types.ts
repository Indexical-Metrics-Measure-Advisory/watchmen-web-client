import {ChartDef} from '@/services/data/tuples/chart-def/chart-def-types';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {Report} from '@/services/data/tuples/report-types';

export type ChartEChartOptions = any;
export type ChartOptions = ChartEChartOptions;

export interface ChartUtils {
	getDef(): ChartDef;

	shouldHasIndicator(): boolean;
	getMaxIndicatorCount(): number;
	canReduceIndicators(report: Report): boolean;
	canAppendIndicators(report: Report): boolean;
	defendIndicatorMinCount(report: Report): void;
	defendIndicatorMaxCount(report: Report): void;

	shouldHasDimension(): boolean;
	getMaxDimensionCount(): number;
	canAppendDimensions(report: Report): boolean;
	canReduceDimensions(report: Report): boolean;
	defendDimensionMinCount(report: Report): void;
	defendDimensionMaxCount(report: Report): void;

	shouldHasTruncation(): boolean;

	shouldHasFunnel(): boolean;

	defend(report: Report): void;
	validate(report: Report): boolean | string;
	buildOptions(report: Report, dataset: ChartDataSet): Promise<ChartOptions>;
}