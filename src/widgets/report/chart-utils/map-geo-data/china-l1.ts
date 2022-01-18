import {echarts} from '../../../basic/echarts';
import chinaJson from './echarts-china.json';
import {MapCoordinate} from './types';

export const ChinaCoordinatesL1 = {
	name: 'China-L1',
	map: chinaJson.features.filter(feature => !!feature.properties.name).reduce((all, feature) => {
		// console.log(feature.properties.NAME_1, feature.properties.NL_NAME_1);
		all.set(feature.properties.name as string, {
			longitude: feature.properties.cp[0],
			latitude: feature.properties.cp[1],
			name: feature.properties.name,
			code: feature.properties.name
		});
		return all;
	}, new Map<string, MapCoordinate>())
};

echarts.registerMap(ChinaCoordinatesL1.name, chinaJson as any, {});