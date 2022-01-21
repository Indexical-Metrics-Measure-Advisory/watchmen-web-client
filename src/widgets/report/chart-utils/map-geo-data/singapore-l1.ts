import {echarts} from '../../../basic/echarts';
import singaporeJson from './echarts-singapore.json';
import {MapCoordinate} from './types';

const NAMES: { [key in string]: { code: string, latitude: number, longitude: number } } = {
	'Central Singapore Community Development Council': {
		code: 'CS',
		latitude: 1.3403593489173817,
		longitude: 103.84399390639696 - 0.01
	},
	'North East Community Development Council': {
		code: 'NE',
		latitude: 1.3695230084345744,
		longitude: 103.92115319240972
	},
	'North West Community Development Council': {
		code: 'NW',
		latitude: 1.3951244061027894,
		longitude: 103.80228076706283 - 0.01
	},
	'South East Community Development Council': {
		code: 'SE',
		latitude: 1.389003655385456 - 0.05,
		longitude: 103.98118539237527
	},
	'South West Community Development Council': {
		code: 'SW',
		latitude: 1.2526110059749684 + 0.08,
		longitude: 103.7608293470122 - 0.05
	}
};

export const SingaporeCoordinatesL1 = {
	name: 'Singapore-L1',
	map: singaporeJson.features.filter(feature => !!feature.properties.name).reduce((all, feature) => {
		// console.log(feature.properties.NAME_1, feature.properties.NL_NAME_1);
		const name = feature.properties.name;
		const code = NAMES[name].code;
		all.set(code, {
			longitude: NAMES[name].longitude,
			latitude: NAMES[name].latitude,
			name,
			code
		});
		return all;
	}, new Map<string, MapCoordinate>())
};

// decode(singaporeJson).features.forEach((x: any) => {
// 	const {properties: {name}, geometry: {type, coordinates}} = x;
// 	const code = name;
// 	if (NAMES[code] == null) {
// 		console.log(code);
// 	}
//
// 	// console.groupCollapsed(code)
// 	switch (type) {
// 		case 'MultiPolygon':
// 			const computed: Array<{ latitude: number, longitude: number }> = coordinates.map((coordinate: any) => {
// 				return computeMiddlePoint(coordinate[0]);
// 			});
// 			const x = computeMiddlePoint(computed.map(({latitude, longitude}) => {
// 				return [longitude, latitude];
// 			}));
// 			// console.log(code, x)
// 			console.log(`"${code}": {code: "${NAMES[code].code}", latitude: ${x.latitude}, longitude: ${x.longitude}},`);
// 			break;
// 		case 'Polygon':
// 		default:
// 			const {longitude, latitude} = computeMiddlePoint(coordinates[0]);
// 			console.log(`"${code}": {code: "${NAMES[code].code}", latitude: ${latitude}, longitude: ${longitude}},`);
// 			break;
// 	}
// 	// console.groupEnd();
// });

echarts.registerMap(SingaporeCoordinatesL1.name, singaporeJson as any, {});