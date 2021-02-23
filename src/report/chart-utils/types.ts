import { ChartDef } from '../../services/tuples/chart-def/chart-def-types';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';

export type ChartEChartOptions = any;
export type ChartOptions = ChartEChartOptions | JSX.Element;

export interface ChartUtils {
	getDef(): ChartDef;
	shouldHasDimension(): boolean;
	getMaxDimensionCount(): number;
	shouldHasIndicator(): boolean;
	getMaxIndicatorCount(): number;
	canAppendDimensions(report: Report): boolean;
	canReduceIndicators(report: Report): boolean;
	canAppendIndicators(report: Report): boolean;
	canReduceDimensions(report: Report): boolean;
	defendIndicatorMinCount(report: Report): void;
	defendIndicatorMaxCount(report: Report): void;
	defendDimensionMinCount(report: Report): void;
	defendDimensionMaxCount(report: Report): void;
	defend(report: Report): void;
	validate(report: Report): boolean | string;
	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions;
}