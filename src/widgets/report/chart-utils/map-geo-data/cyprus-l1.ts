import {echarts} from '../../../basic/echarts';
import cyprusJson from './echarts-cyprus.json';
import {MapCoordinate} from './types';

const NAMES: { [key in string]: { code: string, latitude: number, longitude: number } } = {
	'Famagusta': {code: 'Famagusta', latitude: 35.14562030167009 + 0.05, longitude: 33.87354002188078 - 0.13},
	'Kyrenia': {code: 'Kyrenia', latitude: 35.30946688195169 - 0.01, longitude: 33.27803347516749},
	'Larnaca': {code: 'Larnaca', latitude: 34.9075666538548 - 0.03, longitude: 33.43266222856067 + 0.03},
	'Limassol': {code: 'Limassol', latitude: 34.782280732062866, longitude: 32.92149231694232 + 0.03},
	'Nicosia': {code: 'Nicosia', latitude: 35.075252940401825, longitude: 33.10359970551354},
	'Paphos': {code: 'Paphos', latitude: 34.91852649764899 - 0.03, longitude: 32.553271456925195 - 0.02}
};

export const CyprusCoordinatesL1 = {
	name: 'Cyprus-L1',
	map: cyprusJson.features.filter(feature => !!feature.properties.name).reduce((all, feature) => {
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

// decode(cyprusJson).features.forEach((x: any) => {
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

echarts.registerMap(CyprusCoordinatesL1.name, cyprusJson as any, {});