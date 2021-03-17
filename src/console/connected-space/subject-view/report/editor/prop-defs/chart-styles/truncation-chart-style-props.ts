import { DropdownOption } from '../../../../../../../basic-widgets/types';
import { Lang } from '../../../../../../../langs';
import { ChartTruncationType } from '../../../../../../../services/tuples/chart-def/truncation';

export const TruncationTypeOptions: Array<DropdownOption> = [
	{ value: ChartTruncationType.NONE, label: Lang.CHART.TRUNCATION_NONE },
	{ value: ChartTruncationType.TOP, label: Lang.CHART.TRUNCATION_TOP },
	{ value: ChartTruncationType.BOTTOM, label: Lang.CHART.TRUNCATION_BOTTOM }
];

export enum TruncationChartStylePropNames {
	TRUNCATION_TYPE = 'truncation.type',
	TRUNCATION_COUNT = 'truncation.count',
}