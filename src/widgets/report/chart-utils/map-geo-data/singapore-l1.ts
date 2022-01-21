import {echarts} from '../../../basic/echarts';
import singaporeJson from './echarts-singapore.json';
import {MapCoordinate} from './types';

// const NAMES: { [key in string]: { name: string, latitude: number, longitude: number } } = {
// };

export const SingaporeCoordinatesL1 = {
	name: 'Singapore-L1',
	map: singaporeJson.features.filter(feature => !!feature.properties.name).reduce((all, feature) => {
		// console.log(feature.properties.NAME_1, feature.properties.NL_NAME_1);
		all.set(feature.properties.name as string, {
			longitude: 0, //feature.properties.cp[0],
			latitude: 0,//feature.properties.cp[1],
			name: feature.properties.name,
			code: feature.properties.name
		});
		return all;
	}, new Map<string, MapCoordinate>())
};

echarts.registerMap(SingaporeCoordinatesL1.name, singaporeJson as any, {});