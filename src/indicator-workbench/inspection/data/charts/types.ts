import {IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {Inspection} from '@/services/data/tuples/inspection-types';
import {RowOfAny} from '@/services/data/types';
import {Columns} from '../../types';

export enum ChartUsage {
	TIME_GROUPING = 'time-grouping',
	BUCKET_ON = 'bucket-on',
	BOTH = 'both',
}

export enum ChartType {
	BAR = 'bar',
	LINE = 'line',
	PIE = 'pie'
}

export enum ChartGrowthType {
	NONE = 'none',
	TIME_GROUPING = 'time-grouping',
}

export interface ChartParams {
	inspection: Inspection;
	data: Array<RowOfAny>;
	columns: Columns;
	arithmetic: IndicatorAggregateArithmetic;
}

export type ChartOptionsBuilder<Opt extends any> = (params: ChartParams) => Opt;
