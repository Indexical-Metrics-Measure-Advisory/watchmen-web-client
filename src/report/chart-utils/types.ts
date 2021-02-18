import { EChartOption, EChartsResponsiveOption } from 'echarts';
import { ReactNode } from 'react';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';

export type ChartOptions = EChartOption | EChartsResponsiveOption | ReactNode;

export interface ChartUtils {
	canAppendDimensions: (report: Report) => boolean;
	canReduceIndicators: (report: Report) => boolean;
	canAppendIndicators: (report: Report) => boolean;
	canReduceDimensions: (report: Report) => boolean;
	defend: (report: Report) => void;
	validate: (report: Report) => boolean | string;
	buildOptions: (report: Report, dataset: ChartDataSet) => ChartOptions;
}