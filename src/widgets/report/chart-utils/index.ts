import {ChartType} from '@/services/data/tuples/chart-types';
import {ChartBarUtils} from './chart-bar-utils';
import {ChartCountUtils} from './chart-count-utils';
import {ChartCustomizedUtils} from './chart-customized-utils';
import {ChartDoughnutUtils} from './chart-doughnut-utils';
import {ChartLineUtils} from './chart-line-utils';
import {ChartMapUtils} from './chart-map-utils';
import {ChartNightingaleUtils} from './chart-nightingale-utils';
import {ChartPieUtils} from './chart-pie-utils';
import {ChartScatterUtils} from './chart-scatter-utils';
import {ChartSunburstUtils} from './chart-sunburst-utils';
import {ChartTreeUtils} from './chart-tree-utils';
import {ChartTreemapUtils} from './chart-treemap-utils';
import {ChartUtils} from './types';

export const ChartHelper: Record<ChartType, ChartUtils> = {
	[ChartType.BAR]: new ChartBarUtils(),
	[ChartType.LINE]: new ChartLineUtils(),

	[ChartType.PIE]: new ChartPieUtils(),
	[ChartType.DOUGHNUT]: new ChartDoughnutUtils(),
	[ChartType.NIGHTINGALE]: new ChartNightingaleUtils(),

	[ChartType.SCATTER]: new ChartScatterUtils(),
	[ChartType.MAP]: new ChartMapUtils(),

	[ChartType.SUNBURST]: new ChartSunburstUtils(),
	[ChartType.TREE]: new ChartTreeUtils(),
	[ChartType.TREEMAP]: new ChartTreemapUtils(),

	[ChartType.COUNT]: new ChartCountUtils(),
	[ChartType.CUSTOMIZED]: new ChartCustomizedUtils()
};