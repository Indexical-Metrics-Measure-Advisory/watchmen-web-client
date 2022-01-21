import {echarts} from '../../../basic/echarts';
import usaJSON from './echarts-usa.json';
import {MapCoordinate} from './types';

const NAMES: { [key in string]: { code: string, latitude: number, longitude: number } } = {
	'Alabama': {code: 'AL', latitude: 31.973997912251733, longitude: -86.69710473270167},
	'Alaska': {code: 'AK', latitude: 57.02446829174799 - 23.5, longitude: -156.86318331161294 + 26.5},
	'Arizona': {code: 'AZ', latitude: 34.448263051048755, longitude: -113.66931815072917},
	'Arkansas': {code: 'AR', latitude: 34.733882606399476, longitude: -91.51943058108291},
	'California': {code: 'CA', latitude: 36.63939578795262, longitude: -119.94330756126072},
	'Colorado': {code: 'CO', latitude: 39.0050244052944, longitude: -106.16567419822417},
	'Connecticut': {code: 'CT', latitude: 41.47909230922493, longitude: -72.8137420467236},
	'Delaware': {code: 'DE', latitude: 39.29452648609137, longitude: -75.44539498988773},
	'District of Columbia': {code: 'DC', latitude: 38.92208937017187, longitude: -77.02733321990758},
	'Florida': {code: 'FL', latitude: 28.59182310940693, longitude: -82.90362465632784},
	'Georgia': {code: 'GA', latitude: 32.5624326226874, longitude: -82.94399207492772},
	'Hawaii': {code: 'HI', latitude: 21.0449639687434 + 6, longitude: -157.31419884660156 + 40},
	'Idaho': {code: 'ID', latitude: 45.49537861173615, longitude: -114.73422374744317},
	'Illinois': {code: 'IL', latitude: 39.42116896718581, longitude: -89.52225622712966},
	'Indiana': {code: 'IN', latitude: 38.966440297056856, longitude: -86.62540141121904},
	'Iowa': {code: 'IA', latitude: 41.98972415164289, longitude: -93.08016757658649},
	'Kansas': {code: 'KS', latitude: 39.1304362316811, longitude: -97.50674260601754},
	'Kentucky': {code: 'KY', latitude: 37.76887459301995, longitude: -85.60439215409754},
	'Louisiana': {code: 'LA', latitude: 30.371480541351247, longitude: -91.2639679222734},
	'Maine': {code: 'ME', latitude: 44.97022371186424, longitude: -69.0949620373761},
	'Maryland': {code: 'MD', latitude: 38.418960508045046, longitude: -76.4634021484897},
	'Massachusetts': {code: 'MA', latitude: 42.10641126780089, longitude: -71.2265961754438},
	'Michigan': {code: 'MI', latitude: 45.951045714091286, longitude: -86.36323439589304},
	'Minnesota': {code: 'MN', latitude: 47.01548020492244, longitude: -93.14850492535582},
	'Mississippi': {code: 'MS', latitude: 32.62830633407152, longitude: -90.2413143401936},
	'Missouri': {code: 'MO', latitude: 38.44402485722967, longitude: -91.46280261503982},
	'Montana': {code: 'MT', latitude: 46.00888169552477, longitude: -112.24566827658654},
	'Nebraska': {code: 'NE', latitude: 41.87146930532312, longitude: -98.28866462075048},
	'Nevada': {code: 'NV', latitude: 37.90001037872051, longitude: -116.11827515998584},
	'New Hampshire': {code: 'NH', latitude: 43.85368739997819, longitude: -71.58245225382015},
	'New Jersey': {code: 'NJ', latitude: 40.24724053784246, longitude: -74.79493021707253},
	'New Mexico': {code: 'NM', latitude: 34.38341260059174, longitude: -105.81230362192542},
	'New York': {code: 'NY', latitude: 42.63384954461384, longitude: -75.1189246021889},
	'North Carolina': {code: 'NC', latitude: 35.52543772520175, longitude: -79.43102878388378},
	'North Dakota': {code: 'ND', latitude: 47.59564244153428, longitude: -98.25461084362544},
	'Ohio': {code: 'OH', latitude: 39.93214047159288, longitude: -82.31600299071842},
	'Oklahoma': {code: 'OK', latitude: 34.609932825068334, longitude: -97.77501468566041},
	'Oregon': {code: 'OR', latitude: 44.71294305705812, longitude: -120.91252791203246},
	'Pennsylvania': {code: 'PA', latitude: 41.061610990832726, longitude: -76.60446385527767},
	'Puerto Rico': {code: 'PR', latitude: 18.17876533420532 + 8.2, longitude: -66.50388833923589 - 8.5},
	'Rhode Island': {code: 'RI', latitude: 41.653393591066994, longitude: -71.36384426298955},
	'South Carolina': {code: 'SC', latitude: 33.70527518091997, longitude: -81.17267102573288},
	'South Dakota': {code: 'SD', latitude: 43.8036389900496, longitude: -98.5323815560376},
	'Tennessee': {code: 'TN', latitude: 35.96997792357413, longitude: -86.19288210217164},
	'Texas': {code: 'TX', latitude: 30.571347794418006, longitude: -98.72632730786326},
	'Utah': {code: 'UT', latitude: 39.728318597830636, longitude: -110.83550209763015},
	'Vermont': {code: 'VT', latitude: 43.99566459265983, longitude: -72.55728704730103},
	'Virginia': {code: 'VA', latitude: 37.83178367721442, longitude: -76.92139620692014},
	'Washington': {code: 'WA', latitude: 47.99381420038169, longitude: -122.53214920337271},
	'West Virginia': {code: 'WV', latitude: 38.79091951961152, longitude: -80.45888246628404},
	'Wisconsin': {code: 'WI', latitude: 44.909352767576834, longitude: -89.83167894116917},
	'Wyoming': {code: 'WY', latitude: 43.07049413920245, longitude: -107.92769101602593}
};

export const USACoordinatesL1 = {
	name: 'USA-L1',
	map: usaJSON.features.filter(feature => !!feature.properties.name).reduce((all, feature) => {
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

// decode(usaJSON).features.forEach((x: any) => {
// 	const {properties: {name}, geometry: {type, coordinates}} = x;
// 	const code = name;
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

echarts.registerMap(USACoordinatesL1.name, usaJSON as any, {
	'Alaska': {'left': -140, 'top': 30, 'width': 15},
	'Hawaii': {'left': -120, 'top': 25, 'width': 5},
	'Puerto Rico': {'left': -76, 'top': 26, 'width': 2}
});
