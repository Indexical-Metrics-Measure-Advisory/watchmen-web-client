import {MapChartRegion} from '@/services/data/tuples/chart-def/chart-map';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

export const MapRegionOptions: Array<DropdownOption> = [
	{value: MapChartRegion.JAPAN_L1, label: Lang.CHART.MAP_REGION_JAPAN_L1},
	{value: MapChartRegion.USA_L1, label: Lang.CHART.MAP_REGION_USA_L1}
];

export enum MapChartStylePropNames {
	POSITION_TOP = 'grid.position.top',
	POSITION_RIGHT = 'grid.position..right',
	POSITION_LEFT = 'grid.position.left',
	POSITION_BOTTOM = 'grid.position.bottom',
	REGION = 'series.region',
}