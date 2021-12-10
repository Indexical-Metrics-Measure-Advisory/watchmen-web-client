import {echarts} from '../../../basic/echarts';
import usaJSON from './gadm36_USA_1.json';
import {MapCoordinate} from './types';

export const USACoordinatesL1 = {
	name: 'USA-L1',
	map: usaJSON.features.filter(feature => !!feature.properties.NAME_1).reduce((all, feature) => {
		const coordinates = feature.geometry.coordinates.flat(10) as Array<number>;
		const location = coordinates.reduce((location, coordinate, index) => {
			if (index % 2 === 0) {
				location.longitude += coordinate;
			} else {
				location.latitude += coordinate;
			}
			return location;
		}, {longitude: 0, latitude: 0});
		// console.log(feature.properties.NAME_1, feature.properties.NL_NAME_1);
		all.set(feature.properties.NAME_1 as string, {
			longitude: location.longitude / coordinates.length * 2,
			latitude: location.latitude / coordinates.length * 2,
			name: feature.properties.NL_NAME_1,
			code: feature.properties.NAME_1
		});
		return all;
	}, new Map<string, MapCoordinate>())
};
echarts.registerMap(USACoordinatesL1.name, usaJSON as any, {});
