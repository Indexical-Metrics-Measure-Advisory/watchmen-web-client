import {ChartDataSet} from '../../tuples/chart-types';
import {ReportId} from '../../tuples/report-types';

export const fetchMockCountChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [[1234]]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockPieChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[1234, 'hello'],
					[1324, 'world']
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockDoughnutChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[1234, 'hello'],
					[1324, 'world']
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockNightingaleChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[1234, 'hello'],
					[1324, 'world']
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockBarChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[1234, 5678, 'hello'],
					[1324, 6587, 'world']
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockLineChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[1234, 5678, 'hello'],
					[1324, 6587, 'world']
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockScatterChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[1234, 'hello', 'world'],
					[1324, 'goodbye', 'world'],
					[567, 'hello', 'hell'],
					[765, 'goodbye', 'hell']
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockSunburstChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[1234, 'h', 'hello'],
					[589, 'h', 'hell'],
					[198, 'w', 'why'],
					[1324, 'w', 'where'],
					[675, 'w', 'who']
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockTreeChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[198, 'w', 'why'],
					[1324, 'w', 'where'],
					[675, 'w', 'who']
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockTreemapChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[1234, 'h', 'hello'],
					[589, 'h', 'hell'],
					[198, 'w', 'why'],
					[1324, 'w', 'where'],
					[675, 'w', 'who']
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockMapChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[Math.random() * 1000, 'Aichi', '愛知県'],
					[Math.random() * 1000, 'Akita', '秋田県'],
					[Math.random() * 1000, 'Aomori', '青森県'],
					[Math.random() * 1000, 'Chiba', '千葉県'],
					[Math.random() * 1000, 'Ehime', '愛媛県'],
					[Math.random() * 1000, 'Fukui', '福井県'],
					[Math.random() * 1000, 'Fukuoka', '福岡県'],
					[Math.random() * 1000, 'Fukushima', '福島県'],
					[Math.random() * 1000, 'Gifu', '岐阜県'],
					[Math.random() * 1000, 'Gunma', '群馬県'],
					[Math.random() * 1000, 'Hiroshima', '広島県'],
					[Math.random() * 1000, 'Hokkaido', '北海道'],
					[Math.random() * 1000, 'Hyogo', '兵庫県'],
					[Math.random() * 1000, 'Ibaraki', '茨城県'],
					[Math.random() * 1000, 'Ishikawa', '石川県'],
					[Math.random() * 1000, 'Iwate', '岩手県'],
					[Math.random() * 1000, 'Kagawa', '香川県'],
					[Math.random() * 1000, 'Kagoshima', '鹿児島県'],
					[Math.random() * 1000, 'Kanagawa', '神奈川県'],
					[Math.random() * 1000, 'Kochi', '高知県'],
					[Math.random() * 1000, 'Kumamoto', '熊本県'],
					[Math.random() * 1000, 'Kyoto', '京都府'],
					[Math.random() * 1000, 'Mie', '三重県'],
					[Math.random() * 1000, 'Miyagi', '宮城県'],
					[Math.random() * 1000, 'Miyazaki', '宮崎県'],
					[Math.random() * 1000, 'Nagano', '長野県'],
					[Math.random() * 1000, 'Naoasaki', '長崎県'],
					[Math.random() * 1000, 'Nara', '奈良県'],
					[Math.random() * 1000, 'Niigata', '新潟県'],
					[Math.random() * 1000, 'Oita', '大分県'],
					[Math.random() * 1000, 'Okayama', '岡山県'],
					[Math.random() * 1000, 'Okinawa', '沖縄県'],
					[Math.random() * 1000, 'Osaka', '大阪府'],
					[Math.random() * 1000, 'Saga', '佐賀県'],
					[Math.random() * 1000, 'Saitama', '埼玉県'],
					[Math.random() * 1000, 'Shiga', '滋賀県'],
					[Math.random() * 1000, 'Shimane', '島根県'],
					[Math.random() * 1000, 'Shizuoka', '静岡県'],
					[Math.random() * 1000, 'Tochigi', '栃木県'],
					[Math.random() * 1000, 'Tokushima', '徳島県'],
					[Math.random() * 1000, 'Tokyo', '東京都'],
					[Math.random() * 1000, 'Tottori', '鳥取県'],
					[Math.random() * 1000, 'Toyama', '富山県'],
					[Math.random() * 1000, 'Wakayama', '和歌山県'],
					[Math.random() * 1000, 'Yamagata', '山形県'],
					[Math.random() * 1000, 'Yamaguchi', '山口県'],
					[Math.random() * 1000, 'Yamanashi', '山梨県'],
					[Math.random() * 1000, 'HI', 'Hawaii'],
					[Math.random() * 1000, 'SW', 'South West Community Development Council'],
					[Math.random() * 1000, 'SE', 'South East Community Development Council'],
					[Math.random() * 1000, 'NW', 'North West Community Development Council'],
					[Math.random() * 1000, 'NE', 'North East Community Development Council'],
					[Math.random() * 1000, 'CS', 'Central Singapore Community Development Council'],
					[Math.random() * 1000, 'Paphos', 'Paphos']
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockCustomizeChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					meta: [],
					data: []
				} as ChartDataSet),
			500
		);
	});
};

export const fetchMockChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					meta: [],
					data: []
				} as ChartDataSet),
			500
		);
	});
};