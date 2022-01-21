import {echarts} from '../../../basic/echarts';
import japanJson from './echarts-japan.json';
import {MapCoordinate} from './types';

const NAMES: { [key in string]: { name: string, latitude: number, longitude: number } } = {
	Aichi: {name: '愛知県', latitude: 34.90323040249883, longitude: 137.01848553482674},
	Akita: {name: '秋田県', latitude: 39.76390225179437, longitude: 140.45854868968226},
	Aomori: {name: '青森県', latitude: 40.80644802805812, longitude: 140.8341682315447},
	Chiba: {name: '千葉県', latitude: 35.57985322761152, longitude: 140.0618055968304},
	Ehime: {name: '愛媛県', latitude: 33.82104688160441, longitude: 132.78663799347794},
	Fukui: {name: '福井県', latitude: 35.72571133457793, longitude: 136.0613378977088},
	Fukuoka: {name: '福岡県', latitude: 33.78684881677523, longitude: 130.54099261584233},
	Fukushima: {name: '福島県', latitude: 37.40610086343851, longitude: 140.1364625880905},
	Gifu: {name: '岐阜県', latitude: 35.77249400042625, longitude: 137.02465328037815},
	Gunma: {name: '群馬県', latitude: 36.49028702674901, longitude: 139.0331455983848},
	Hiroshima: {name: '広島県', latitude: 34.28318704960186, longitude: 132.85907873426572},
	Hokkaido: {name: '北海道', latitude: 43.36860939239866, longitude: 141.95282455406493},
	Hyogo: {name: '兵庫県', latitude: 34.66032439984406, longitude: 134.95337274251378},
	Ibaraki: {name: '茨城県', latitude: 36.396665501182035, longitude: 140.35160864131046},
	Ishikawa: {name: '石川県', latitude: 36.99738867587785, longitude: 136.90675068711147},
	Iwate: {name: '岩手県', latitude: 39.49384937892884, longitude: 141.45703039603694},
	Kagawa: {name: '香川県', latitude: 34.38571512665532, longitude: 133.8913367096005},
	Kagoshima: {name: '鹿児島県', latitude: 30.066240626010007, longitude: 129.81193589554826},
	Kanagawa: {name: '神奈川県', latitude: 35.42836613969008, longitude: 139.61367148384116},
	Kochi: {name: '高知県', latitude: 32.9532566941468, longitude: 132.77780436480583},
	Kumamoto: {name: '熊本県', latitude: 32.44812275579992, longitude: 130.3690466313941},
	Kyoto: {name: '京都府', latitude: 35.28644028616332, longitude: 135.42112562338818},
	Mie: {name: '三重県', latitude: 34.423155531813585, longitude: 136.74061162218425},
	Miyagi: {name: '宮城県', latitude: 38.41766199153272, longitude: 141.37085615989787},
	Miyazaki: {name: '宮崎県', latitude: 32.12767763196399, longitude: 131.51654848269766},
	Nagano: {name: '長野県', latitude: 36.13833872758417, longitude: 138.07077253882963},
	Nagasaki: {name: '長崎県', latitude: 33.08195581406555, longitude: 129.27028309505113},
	Nara: {name: '奈良県', latitude: 34.3142994711909, longitude: 135.87546802311854},
	Niigata: {name: '新潟県', latitude: 37.789440102914114, longitude: 138.70553957967604},
	Oita: {name: '大分県', latitude: 33.12458681252637, longitude: 131.82726844041642},
	Okayama: {name: '岡山県', latitude: 34.55697219541605, longitude: 133.87660708166624},
	Okinawa: {name: '沖縄県', latitude: 25.697399614010052, longitude: 126.6504090045454},
	Osaka: {name: '大阪府', latitude: 34.58737157592462, longitude: 135.37972242257646},
	Saga: {name: '佐賀県', latitude: 33.51638276952977, longitude: 129.9084225263616},
	Saitama: {name: '埼玉県', latitude: 35.97067947213038, longitude: 139.32146291806563},
	Shiga: {name: '滋賀県', latitude: 35.238178291731856, longitude: 136.1200260708697},
	Shimane: {name: '島根県', latitude: 35.88490199764653, longitude: 132.98596209288},
	Shizuoka: {name: '静岡県', latitude: 35.0693908798017, longitude: 138.44714639149905},
	Tochigi: {name: '栃木県', latitude: 36.681394692338756, longitude: 139.79514994498703},
	Tokushima: {name: '徳島県', latitude: 33.95027231693412, longitude: 134.5761972431982},
	// Tokyo: {name: "東京都", latitude: 30.74009875100765, longitude: 141.09775695466084},
	Tokyo: {name: '東京都', latitude: 35.67009875100765, longitude: 139.39775695466084},
	Tottori: {name: '鳥取県', latitude: 35.32822840893963, longitude: 133.77782940084137},
	Toyama: {name: '富山県', latitude: 36.619616783375385, longitude: 137.20672932056323},
	Wakayama: {name: '和歌山県', latitude: 33.97020809336473, longitude: 135.535520987471},
	Yamagata: {name: '山形県', latitude: 38.79522523842496, longitude: 139.8238971299823},
	Yamaguchi: {name: '山口県', latitude: 34.0709654554688, longitude: 131.69086787017415},
	Yamanashi: {name: '山梨県', latitude: 35.60217197984531, longitude: 138.5880645143298}
};

export const JapanCoordinatesL1 = {
	name: 'Japan-L1',
	map: japanJson.features.filter(feature => !!feature.properties.name).reduce((all, feature) => {
		// console.log(feature.properties.NAME_1, feature.properties.NL_NAME_1);
		const code = feature.properties.name;

		all.set(code as string, {
			longitude: NAMES[code].longitude,
			latitude: NAMES[code].latitude,
			name: NAMES[code].name,
			code
		});
		return all;
	}, new Map<string, MapCoordinate>())
};

// decode(japanJson).features.forEach((x: any) => {
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
// 			console.log(`${code}: {name: "${NAMES[code].name}", latitude: ${x.latitude}, longitude: ${x.longitude}},`);
// 			break;
// 		case 'Polygon':
// 		default:
// 			const {longitude, latitude} = computeMiddlePoint(coordinates[0]);
// 			console.log(`${code}: {name: "${NAMES[code].name}", latitude: ${latitude}, longitude: ${longitude}},`);
// 			break;
// 	}
// 	// console.groupEnd();
// });

echarts.registerMap(JapanCoordinatesL1.name, japanJson as any, {});
