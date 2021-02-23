import { ChartDataSet } from '../../tuples/chart-types';

export const fetchMockCountChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [ [ 1234 ] ]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockPieChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockDoughnutChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockNightingaleChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockBarChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockLineChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockScatterChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockSunburstChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'h', 'hello' ],
					[ 589, 'h', 'hell' ],
					[ 198, 'w', 'why' ],
					[ 1324, 'w', 'where' ],
					[ 675, 'w', 'who' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockTreeChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 198, 'w', 'why' ],
					[ 1324, 'w', 'where' ],
					[ 675, 'w', 'who' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockTreemapChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'h', 'hello' ],
					[ 589, 'h', 'hell' ],
					[ 198, 'w', 'why' ],
					[ 1324, 'w', 'where' ],
					[ 675, 'w', 'who' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockMapChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 9, '海门' ],
					[ 12, '鄂尔多斯' ],
					[ 12, '招远' ],
					[ 12, '舟山' ],
					[ 14, '齐齐哈尔' ],
					[ 15, '盐城' ],
					[ 16, '赤峰' ],
					[ 18, '青岛' ],
					[ 18, '乳山' ],
					[ 19, '金昌' ],
					[ 21, '泉州' ],
					[ 21, '莱西' ],
					[ 21, '日照' ],
					[ 22, '胶南' ],
					[ 23, '南通' ],
					[ 24, '拉萨' ],
					[ 24, '云浮' ],
					[ 25, '梅州' ],
					[ 25, '文登' ],
					[ 25, '上海' ],
					[ 25, '攀枝花' ],
					[ 25, '威海' ],
					[ 25, '承德' ],
					[ 26, '厦门' ],
					[ 26, '汕尾' ],
					[ 26, '潮州' ],
					[ 27, '丹东' ],
					[ 27, '太仓' ],
					[ 27, '曲靖' ],
					[ 28, '烟台' ],
					[ 29, '福州' ],
					[ 30, '瓦房店' ],
					[ 30, '即墨' ],
					[ 31, '抚顺' ],
					[ 31, '玉溪' ],
					[ 31, '张家口' ],
					[ 31, '阳泉' ],
					[ 32, '莱州' ],
					[ 32, '湖州' ],
					[ 32, '汕头' ],
					[ 33, '昆山' ],
					[ 33, '宁波' ],
					[ 33, '湛江' ],
					[ 34, '揭阳' ],
					[ 34, '荣成' ],
					[ 35, '连云港' ],
					[ 35, '葫芦岛' ],
					[ 36, '常熟' ],
					[ 36, '东莞' ],
					[ 36, '河源' ],
					[ 36, '淮安' ],
					[ 36, '泰州' ],
					[ 37, '南宁' ],
					[ 37, '营口' ],
					[ 37, '惠州' ],
					[ 37, '江阴' ],
					[ 37, '蓬莱' ],
					[ 38, '韶关' ],
					[ 38, '嘉峪关' ],
					[ 38, '广州' ],
					[ 38, '延安' ],
					[ 39, '太原' ],
					[ 39, '清远' ],
					[ 39, '中山' ],
					[ 39, '昆明' ],
					[ 40, '寿光' ],
					[ 40, '盘锦' ],
					[ 41, '长治' ],
					[ 41, '深圳' ],
					[ 42, '珠海' ],
					[ 43, '宿迁' ],
					[ 43, '咸阳' ],
					[ 44, '铜川' ],
					[ 44, '平度' ],
					[ 44, '佛山' ],
					[ 44, '海口' ],
					[ 45, '江门' ],
					[ 45, '章丘' ],
					[ 46, '肇庆' ],
					[ 47, '大连' ],
					[ 47, '临汾' ],
					[ 47, '吴江' ],
					[ 49, '石嘴山' ],
					[ 50, '沈阳' ],
					[ 50, '苏州' ],
					[ 50, '茂名' ],
					[ 51, '嘉兴' ],
					[ 51, '长春' ],
					[ 52, '胶州' ],
					[ 52, '银川' ],
					[ 52, '张家港' ],
					[ 53, '三门峡' ],
					[ 54, '锦州' ],
					[ 54, '南昌' ],
					[ 54, '柳州' ],
					[ 54, '三亚' ],
					[ 56, '自贡' ],
					[ 56, '吉林' ],
					[ 57, '阳江' ],
					[ 57, '泸州' ],
					[ 57, '西宁' ],
					[ 58, '宜宾' ],
					[ 58, '呼和浩特' ],
					[ 58, '成都' ],
					[ 58, '大同' ],
					[ 59, '镇江' ],
					[ 59, '桂林' ],
					[ 59, '张家界' ],
					[ 59, '宜兴' ],
					[ 60, '北海' ],
					[ 61, '西安' ],
					[ 62, '金坛' ],
					[ 62, '东营' ],
					[ 63, '牡丹江' ],
					[ 63, '遵义' ],
					[ 63, '绍兴' ],
					[ 64, '扬州' ],
					[ 64, '常州' ],
					[ 65, '潍坊' ],
					[ 66, '重庆' ],
					[ 67, '台州' ],
					[ 67, '南京' ],
					[ 70, '滨州' ],
					[ 71, '贵阳' ],
					[ 71, '无锡' ],
					[ 71, '本溪' ],
					[ 72, '克拉玛依' ],
					[ 72, '渭南' ],
					[ 72, '马鞍山' ],
					[ 72, '宝鸡' ],
					[ 75, '焦作' ],
					[ 75, '句容' ],
					[ 79, '北京' ],
					[ 79, '徐州' ],
					[ 80, '衡水' ],
					[ 80, '包头' ],
					[ 80, '绵阳' ],
					[ 84, '乌鲁木齐' ],
					[ 84, '枣庄' ],
					[ 84, '杭州' ],
					[ 85, '淄博' ],
					[ 86, '鞍山' ],
					[ 86, '溧阳' ],
					[ 86, '库尔勒' ],
					[ 90, '安阳' ],
					[ 90, '开封' ],
					[ 92, '济南' ],
					[ 93, '德阳' ],
					[ 95, '温州' ],
					[ 96, '九江' ],
					[ 98, '邯郸' ],
					[ 99, '临安' ],
					[ 99, '兰州' ],
					[ 100, '沧州' ],
					[ 103, '临沂' ],
					[ 104, '南充' ],
					[ 105, '天津' ],
					[ 106, '富阳' ],
					[ 112, '泰安' ],
					[ 112, '诸暨' ],
					[ 113, '郑州' ],
					[ 114, '哈尔滨' ],
					[ 116, '聊城' ],
					[ 117, '芜湖' ],
					[ 119, '唐山' ],
					[ 119, '平顶山' ],
					[ 119, '邢台' ],
					[ 120, '德州' ],
					[ 120, '济宁' ],
					[ 127, '荆州' ],
					[ 130, '宜昌' ],
					[ 132, '义乌' ],
					[ 133, '丽水' ],
					[ 134, '洛阳' ],
					[ 136, '秦皇岛' ],
					[ 143, '株洲' ],
					[ 147, '石家庄' ],
					[ 148, '莱芜' ],
					[ 152, '常德' ],
					[ 153, '保定' ],
					[ 154, '湘潭' ],
					[ 157, '金华' ],
					[ 169, '岳阳' ],
					[ 175, '长沙' ],
					[ 177, '衢州' ],
					[ 193, '廊坊' ],
					[ 194, '菏泽' ],
					[ 229, '合肥' ],
					[ 273, '武汉' ],
					[ 279, '大庆' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockChartData = async (reportId: string): Promise<ChartDataSet> => {
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