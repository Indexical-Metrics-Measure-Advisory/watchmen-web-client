import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';

export type ChartEChartOptions = any;
export type ChartOptions = ChartEChartOptions | JSX.Element;

export interface ChartUtils {
	shouldHasDimension: () => boolean;
	shouldHasIndicator: () => boolean;
	canAppendDimensions: (report: Report) => boolean;
	canReduceIndicators: (report: Report) => boolean;
	canAppendIndicators: (report: Report) => boolean;
	canReduceDimensions: (report: Report) => boolean;
	defend: (report: Report) => void;
	validate: (report: Report) => boolean | string;
	buildOptions: (report: Report, dataset: ChartDataSet) => ChartOptions;
}