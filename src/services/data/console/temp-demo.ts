import {
	BarChartSettings,
	BarChartSettingsLabel,
	BarChartSettingsSeries,
	BarLabelPosition
} from '@/services/data/tuples/chart-def/chart-bar';
import {CustomizedChartSettings} from '@/services/data/tuples/chart-def/chart-customized';
import {LineChartSettings} from '@/services/data/tuples/chart-def/chart-line';
import {PieLabelPosition} from '@/services/data/tuples/chart-def/chart-pie';
import {SunburstChartSettings} from '@/services/data/tuples/chart-def/chart-sunburst';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {
	EChartsHorizontalAlignment,
	EChartsVerticalAlignment
} from '@/services/data/tuples/echarts/echarts-alignment-types';
import {EchartsScriptHolder} from '@/services/data/tuples/echarts/echarts-script-types';
import {EChartsTitle} from '@/services/data/tuples/echarts/echarts-title-types';
import {EChartsXAxis} from '@/services/data/tuples/echarts/echarts-xaxis-types';
import {
	ComputedParameter,
	ParameterComputeType,
	ParameterJointType,
	ParameterKind,
	TopicFactorParameter
} from '@/services/data/tuples/factor-calculator-types';
import {FactorType} from '@/services/data/tuples/factor-types';
import {ReportId, ReportIndicatorArithmetic} from '@/services/data/tuples/report-types';
import {Space} from '@/services/data/tuples/space-types';
import {SubjectDataSetFilter, SubjectId} from '@/services/data/tuples/subject-types';
import {Topic, TopicKind, TopicType} from '@/services/data/tuples/topic-types';
import {formatTime, getCurrentTime} from '@/services/data/utils';
import dayjs, {Dayjs} from 'dayjs';
import {CountChartSettings} from '../tuples/chart-def/chart-count';
import {ChartDataSet, ChartFontStyle, ChartFontWeight, ChartType} from '../tuples/chart-types';
import {DataSetPage} from './dataset';

const TOPIC_ID = '930571578272587776';
const FACTOR_ID_POLICY_NO = '93973a5464c2464b8731c71f23073d46';
const FACTOR_ID_CUSTOMER_NO = 'ed32241dd72d4f0ba6bc90ed7cd9176c';
const FACTOR_ID_POLICY_TYPE = '1789fce0fdf342eb90657b320f4f8a80';
const FACTOR_ID_ISSUE_DATE = '6ad7ad3a692347eeb361d370117a5cf5';
const FACTOR_ID_LOB = '7fcdbfc9191642f492247831aa04a265';
const FACTOR_ID_SI = '03671003f74e4e4a91001813490b21d4';
const FACTOR_ID_PREMIUM = 'd15521b0797341eabeba0c0404fafa15';
const FACTOR_ID_ENDORSEMENT_NO = 'fa2426b4d2f4444faba174708c9473ef';
const FACTOR_ID_EFFECTIVE_DATE = 'e99b757edc7948f3b31ba5b0d1565de6';
const FACTOR_ID_EXPIRY_DATE = 'acabf5649be144c4954247e3da85bcc6';
const FACTOR_ID_TRANS_TYPE = '0518fc4efebd4e3f8119f3a3c590d037';
const FACTOR_ID_MAIN_COVERAGE_LIMIT = '22962e2effab437487dcad36a0b3f7dc';
const FACTOR_ID_MAIN_COVERAGE_PREMIUM = '544c22884e5e4124a6e16eaaf8df3154';
const FACTOR_ID_CUSTOMER_GENDER = 'ce26decc102c445eba687d173291a88e';
const FACTOR_ID_AGENCY_CODE = '401e07a0ce1e42e19fc9492795c49fd6';

const COLUMN_ID_EFFECTIVE_MONTH = '1';
const COLUMN_ID_EXPIRY_MONTH = '2';
const COLUMN_ID_ISSUE_MONTH = '3';

export const DEMO_TOPIC: Topic = {
	topicId: TOPIC_ID,
	name: 'demo_policy_detail_report',
	type: TopicType.DISTINCT,
	kind: TopicKind.BUSINESS,
	factors: [{
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.TEXT,
		factorId: FACTOR_ID_POLICY_NO,
		name: 'policy_no',
		label: 'policy_no'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.TEXT,
		factorId: FACTOR_ID_CUSTOMER_NO,
		name: 'customer_no',
		label: 'customer_no'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.TEXT,
		factorId: FACTOR_ID_POLICY_TYPE,
		name: 'policy_type',
		label: 'policy_type'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.DATETIME,
		factorId: FACTOR_ID_ISSUE_DATE,
		name: 'issue_date',
		label: 'issue_date'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.ENUM,
		factorId: FACTOR_ID_LOB,
		name: 'line_of_business',
		label: 'line_of_business'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.NUMBER,
		factorId: FACTOR_ID_SI,
		name: 'sum_insured',
		label: 'sum_insured'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.NUMBER,
		factorId: FACTOR_ID_PREMIUM,
		name: 'premium',
		label: 'premium'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.TEXT,
		factorId: FACTOR_ID_ENDORSEMENT_NO,
		name: 'endo_no',
		label: 'endo_no'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.DATETIME,
		factorId: FACTOR_ID_EFFECTIVE_DATE,
		name: 'eff_date',
		label: 'eff_date'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.DATETIME,
		factorId: FACTOR_ID_EXPIRY_DATE,
		name: 'exp_date',
		label: 'exp_date'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.ENUM,
		factorId: FACTOR_ID_TRANS_TYPE,
		name: 'type_of_transaction',
		label: 'type_of_transaction'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.NUMBER,
		factorId: FACTOR_ID_MAIN_COVERAGE_LIMIT,
		name: 'main_coverage_limit',
		label: 'main_coverage_limit'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.NUMBER,
		factorId: FACTOR_ID_MAIN_COVERAGE_PREMIUM,
		name: 'main_coverage_premium',
		label: 'main_coverage_premium'
	}, {
		lastModified: getCurrentTime(),
		createTime: getCurrentTime(),
		type: FactorType.TEXT,
		factorId: FACTOR_ID_CUSTOMER_GENDER,
		name: 'customer_gender',
		label: 'customer_gender'
	}, {
		factorId: FACTOR_ID_AGENCY_CODE,
		name: 'agency_code',
		label: 'agency code',
		type: FactorType.TEXT,
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	}],
	tenantId: '1',
	lastModified: getCurrentTime(),
	createTime: getCurrentTime()
};
export const DEMO_SPACE: Space = {
	spaceId: '100',
	name: 'Demo Space',
	tenantId: '1',
	topicIds: ['930571578272587776'],
	userGroupIds: [],
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const DEMO_CONNECTED_SPACE: ConnectedSpace = {
	connectId: '100',
	spaceId: '100',
	name: 'Demo Connected Space',
	subjects: [{
		subjectId: '100',
		name: 'Demo Subject',
		dataset: {
			columns: [
				{id: FACTOR_ID_POLICY_NO, label: 'Policy_No'},
				// {id: FACTOR_ID_POLICY_TYPE, label: 'Policy_Type'},
				{id: FACTOR_ID_LOB, label: 'Line_of_Business'},
				{id: FACTOR_ID_SI, label: 'Sum_Insured'},
				{id: FACTOR_ID_PREMIUM, label: 'Premium'},
				{id: FACTOR_ID_MAIN_COVERAGE_LIMIT, label: 'Main_Coverage_Limit'},
				{id: FACTOR_ID_MAIN_COVERAGE_PREMIUM, label: 'Main_Coverage_Premium'},
				{id: FACTOR_ID_EFFECTIVE_DATE, label: 'Effective_Date'},
				{label: 'Effective_Month'},
				{id: FACTOR_ID_EXPIRY_DATE, label: 'Expiry_Date'},
				{label: 'Expiry_Month'},
				{id: FACTOR_ID_ISSUE_DATE, label: 'Issue_Date'},
				{label: 'Issue_Month'},
				{id: FACTOR_ID_ENDORSEMENT_NO, label: 'Endorsement_No'},
				// {id: FACTOR_ID_TRANS_TYPE, label: 'Transaction_Type'},
				{id: FACTOR_ID_CUSTOMER_NO, label: 'Customer_No'},
				{id: FACTOR_ID_CUSTOMER_GENDER, label: 'Customer_Gender'},
				{id: FACTOR_ID_AGENCY_CODE, label: 'Agency_Code'}
			].map(({id, label}) => {
				switch (label) {
					case 'Effective_Month':
					case 'Expiry_Month':
					case 'Issue_Month':
						return {
							columnId: label === 'Effective_Month' ? COLUMN_ID_EFFECTIVE_MONTH : (label === 'Expiry_Month' ? COLUMN_ID_EXPIRY_MONTH : COLUMN_ID_ISSUE_MONTH),
							parameter: {
								kind: ParameterKind.COMPUTED,
								type: ParameterComputeType.MONTH_OF,
								parameters: [{
									kind: ParameterKind.TOPIC,
									topicId: TOPIC_ID,
									factorId: label === 'Effective_Month' ? FACTOR_ID_EFFECTIVE_DATE : (label === 'Expiry_Month' ? FACTOR_ID_EXPIRY_DATE : FACTOR_ID_ISSUE_DATE)
								} as TopicFactorParameter]
							} as ComputedParameter,
							alias: label
						};
					default:
						return {
							columnId: id as string,
							parameter: {kind: ParameterKind.TOPIC, topicId: TOPIC_ID, factorId: id},
							alias: label
						};
				}
			}),
			filters: {jointType: ParameterJointType.AND, filters: [] as Array<SubjectDataSetFilter>},
			joins: []
		},
		reports: [
			{
				reportId: '100',
				name: 'Policy Count',
				indicators: [{
					columnId: FACTOR_ID_POLICY_NO,
					name: 'Policy_No',
					arithmetic: ReportIndicatorArithmetic.COUNT
				}],
				dimensions: [],
				chart: {
					type: ChartType.COUNT,
					settings: {
						countText: {
							formatUseGrouping: true,
							font: {
								family: 'Verdana', size: 64, color: '#666',
								weight: ChartFontWeight.W900, style: ChartFontStyle.ITALIC
							}
						},
						title: {
							text: {
								text: 'Total Count',
								font: {
									family: 'Verdana', size: 64, color: '#666',
									weight: ChartFontWeight.W900, style: ChartFontStyle.ITALIC
								}
							},
							position: {bottom: 50, left: 50},
							verticalAlign: EChartsVerticalAlignment.MIDDLE,
							horizontalAlign: EChartsHorizontalAlignment.CENTER
						} as EChartsTitle
					} as CountChartSettings
				},
				rect: {x: 0, y: 0, width: 800, height: 640},
				lastVisitTime: getCurrentTime(), createTime: getCurrentTime(), lastModified: getCurrentTime()
			},
			{
				reportId: '101',
				name: 'Premium Summary',
				indicators: [{
					columnId: FACTOR_ID_PREMIUM,
					name: 'Premium',
					arithmetic: ReportIndicatorArithmetic.SUMMARY
				}],
				dimensions: [],
				chart: {
					type: ChartType.COUNT,
					settings: {
						countText: {
							formatUseGrouping: true,
							font: {
								family: 'Verdana', size: 64, color: '#666',
								weight: ChartFontWeight.W900, style: ChartFontStyle.ITALIC
							}
						},
						title: {
							text: {
								text: 'Total Premium',
								font: {
									family: 'Verdana', size: 64, color: '#666',
									weight: ChartFontWeight.W900, style: ChartFontStyle.ITALIC
								}
							},
							position: {bottom: 50, left: 50},
							verticalAlign: EChartsVerticalAlignment.MIDDLE,
							horizontalAlign: EChartsHorizontalAlignment.CENTER
						} as EChartsTitle
					} as CountChartSettings
				},
				rect: {x: 0, y: 0, width: 800, height: 640},
				lastVisitTime: getCurrentTime(), createTime: getCurrentTime(), lastModified: getCurrentTime()
			},
			{
				reportId: '102',
				name: 'Premium By Agency',
				indicators: [{
					columnId: FACTOR_ID_PREMIUM,
					name: 'Premium',
					arithmetic: ReportIndicatorArithmetic.SUMMARY
				}],
				dimensions: [{columnId: FACTOR_ID_AGENCY_CODE, name: 'Agency_Code'}],
				chart: {
					type: ChartType.BAR,
					settings: {
						title: {
							text: {
								text: 'Premium on Channels',
								font: {
									family: 'Verdana', size: 24, color: '#666',
									weight: ChartFontWeight.W700, style: ChartFontStyle.ITALIC
								}
							},
							position: {top: 5, left: 50},
							verticalAlign: EChartsVerticalAlignment.MIDDLE,
							horizontalAlign: EChartsHorizontalAlignment.CENTER
						} as EChartsTitle,
						series: {transformAxis: true} as BarChartSettingsSeries,
						label: {
							position: BarLabelPosition.INSIDE,
							font: {family: 'Verdana', size: 14, color: '#fff', weight: ChartFontWeight.W600}
						} as BarChartSettingsLabel,
						xaxis: {
							label: {
								font: {family: 'Verdana', size: 14, weight: ChartFontWeight.W600, color: '#666'},
								rotate: 45
							}
						} as EChartsXAxis
					} as BarChartSettings
				},
				rect: {x: 0, y: 0, width: 800, height: 640},
				lastVisitTime: getCurrentTime(), createTime: getCurrentTime(), lastModified: getCurrentTime()
			},
			{
				reportId: '103',
				name: 'Issue Count Monthly',
				indicators: [{
					columnId: FACTOR_ID_POLICY_NO,
					name: 'Policy_No',
					arithmetic: ReportIndicatorArithmetic.COUNT
				}],
				dimensions: [{columnId: COLUMN_ID_ISSUE_MONTH, name: 'Issue_Month'}],
				chart: {
					type: ChartType.LINE,
					settings: {
						title: {
							text: {
								text: 'Issue Count / Month',
								font: {
									family: 'Verdana', size: 24, color: '#666',
									weight: ChartFontWeight.W700, style: ChartFontStyle.ITALIC
								}
							},
							position: {top: 5, left: 50},
							verticalAlign: EChartsVerticalAlignment.MIDDLE,
							horizontalAlign: EChartsHorizontalAlignment.CENTER
						} as EChartsTitle,
						// series: {smooth: true} as LineChartSettingsSeries,
						label: {
							position: BarLabelPosition.TOP,
							font: {family: 'Verdana', size: 14, weight: ChartFontWeight.W600, color: '#666'}
						} as BarChartSettingsLabel,
						xaxis: {
							label: {font: {family: 'Verdana', size: 14, weight: ChartFontWeight.W600, color: '#666'}}
						} as EChartsXAxis
					} as LineChartSettings
				},
				rect: {x: 0, y: 0, width: 800, height: 640},
				lastVisitTime: getCurrentTime(), createTime: getCurrentTime(), lastModified: getCurrentTime()
			},
			{
				reportId: '104',
				name: 'Premium of LOB',
				indicators: [{
					columnId: FACTOR_ID_PREMIUM,
					name: 'Premium',
					arithmetic: ReportIndicatorArithmetic.SUMMARY
				}],
				dimensions: [
					{columnId: FACTOR_ID_AGENCY_CODE, name: 'Agency_Code'},
					{columnId: FACTOR_ID_LOB, name: 'Line_of_Business'}
				],
				chart: {
					type: ChartType.SUNBURST,
					settings: {
						title: {
							text: {
								text: 'Premium of LOB',
								font: {
									family: 'Verdana', size: 24, color: '#666',
									weight: ChartFontWeight.W700, style: ChartFontStyle.ITALIC
								}
							},
							position: {top: 5, left: 50},
							verticalAlign: EChartsVerticalAlignment.MIDDLE,
							horizontalAlign: EChartsHorizontalAlignment.CENTER
						} as EChartsTitle,
						label: {position: PieLabelPosition.INSIDE}
					} as SunburstChartSettings
				},
				rect: {x: 0, y: 0, width: 800, height: 640},
				lastVisitTime: getCurrentTime(), createTime: getCurrentTime(), lastModified: getCurrentTime()
			},
			{
				reportId: '105',
				name: 'LOB Distribution',
				indicators: [{
					columnId: FACTOR_ID_PREMIUM,
					name: 'Premium',
					arithmetic: ReportIndicatorArithmetic.SUMMARY
				}],
				dimensions: [
					{columnId: FACTOR_ID_AGENCY_CODE, name: 'Agency_Code'},
					{columnId: FACTOR_ID_LOB, name: 'Line_of_Business'}
				],
				chart: {
					type: ChartType.CUSTOMIZED,
					settings: {
						script: `(() => {
	const agencies = (options.data || []).reduce((agencies, row) => {
		const agency = row[2];
		if (agencies.indexOf(agency) === -1) {
			agencies.push(agency)
		}
		return agencies;
	}, []).sort((agency1, agency2) => agency1.localeCompare(agency2, void 0, {sensitivity: 'base', caseFirst: 'upper'}));
	const lobs = (options.data || []).reduce((lobs, row) => {
		const lob = row[1];
		if (lobs.indexOf(lob) === -1) {
			lobs.push(lob)
		}
		return lobs;
	}, []).sort((lob1, lob2) => lob1.localeCompare(lob2, void 0, {sensitivity: 'base', caseFirst: 'upper'}));
	const data = (options.data || []).map(row => {
		return [row[2], row[1], row[0]];
	});
	console.log(agencies, lobs, data);
	return {
		tooltip: {},
		visualMap: {
			max: data.reduce((max, row) => Math.max(max, row[2]), 0) * 1.1,
			inRange: {
				color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
			}
		},
		xAxis3D: { type: 'category', data: agencies },
		yAxis3D: { type: 'category', data: lobs },
		zAxis3D: { type: 'value' },
		grid3D: {},
		series: [
			{
				type: 'bar3D',
				data: data.map(function (item) {
					return {
						value: [item[0], item[1], item[2]]
					};
				}),
				shading: 'realistic',
				label: { fontSize: 48, borderWidth: 10 },
				emphasis: {
					label: { textStyle: { fontSize: 24, color: '#666', fontFamily: 'Verdana' } }
				}
			}
		]
	};
})();
`
					} as CustomizedChartSettings & EchartsScriptHolder
				},
				rect: {x: 0, y: 0, width: 800, height: 640},
				lastVisitTime: getCurrentTime(), createTime: getCurrentTime(), lastModified: getCurrentTime()
			}
		],
		lastVisitTime: getCurrentTime(),
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	}],
	isTemplate: true,
	lastVisitTime: getCurrentTime(),
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

type LOB = 'Vehicle' | 'SME' | 'Health';
const generate = () => {
	const lobs: Array<LOB> = ['Vehicle', 'SME', 'Health'];
	const askLob = (): LOB => lobs[Math.floor(Math.random() * 3)];
	const askPremium = (lob: LOB): number => {
		switch (lob) {
			case 'Vehicle':
				return Math.random() * 7000 + 3000;
			case 'SME':
				return Math.random() * 5000 + 2000;
			case 'Health':
			default:
				return Math.random() * 2500 + 500;
		}
	};
	const askSI = (lob: LOB, premium: number): number => {
		switch (lob) {
			case 'Vehicle':
				return Math.floor((Math.random() * 30 + 10) * premium / 1000) * 1000;
			case 'SME':
				return Math.floor((Math.random() * 10 + 30 * premium / 100) * 100);
			case 'Health':
			default:
				return Math.floor((Math.random() * 20 + 100 * premium / 1000) * 1000);
		}
	};
	const askMainCoverageLimit = (si: number): number => {
		return Number((Math.floor(si * (Math.random() * 0.5 + 0.5) * 1000) / 1000).toFixed(0));
	};
	const askMainCoveragePremium = (premium: number): number => {
		return Number((premium * (Math.random() * 0.5 + 0.5)).toFixed(2));
	};
	const askEffectiveDate = () => {
		const month = [10, 11, 12][Math.floor(Math.random() * 3)] - 1;
		const date = new Array(month === 11 ? 30 : 31).fill(1).map((_, index) => index + 1)[Math.floor(Math.random() * (month === 11 ? 30 : 31))];
		return dayjs().year(2021).month(month).date(date).hour(0).minute(0).second(0).millisecond(0);
	};
	const askExpiryDate = (effectiveDate: Dayjs): Dayjs => {
		return effectiveDate.add(1, 'year').subtract(1, 'day').subtract(1, 'millisecond');
	};
	const askIssueDate = (effectiveDate: Dayjs): Dayjs => {
		return effectiveDate.subtract(Math.floor(Math.random() * 7 + 5), 'day')
			.hour(Math.floor(Math.random() * 24))
			.minute(Math.floor(Math.random() * 60))
			.second(Math.floor(Math.random() * 60));
	};
	let endorsementNoStart = 1;
	const askEndorsementNo = (): string | null => {
		const has = [1, 0, 0, 0, 0][Math.floor(Math.random() * 5)];
		if (has === 1) {
			return `E${10000 + endorsementNoStart++}`;
		} else {
			return '';
		}
	};
	const customerNoMap: Record<string, boolean> = {};
	const askCustomerNo = (): string => {
		let customerNo = `C${1000000 + Math.floor(Math.random() * 10000)}`;
		if (!customerNoMap[customerNo]) {
			customerNoMap[customerNo] = true;
			return customerNo;
		} else {
			return askCustomerNo();
		}
	};
	const askCustomerGender = (): string => {
		const has = [1, 0, 0][Math.floor(Math.random() * 3)];
		if (has === 1) {
			return 'Female';
		} else {
			return 'Male';
		}
	};
	const askAgencyCode = (): string => {
		return ['AC_SH', 'AC_BJ', 'AC_GZ', 'AC_SZ'][Math.floor(Math.random() * 4)];
	};

	return new Array(Math.floor(Math.random() * 100 + 400)).fill(1).map((_, index) => {
		const lob = askLob();
		const premium = Number(askPremium(lob).toFixed(2));
		const si = askSI(lob, premium);
		const effectiveDate = askEffectiveDate();
		const expiryDate = askExpiryDate(effectiveDate);
		const issueDate = askIssueDate(effectiveDate);
		return [
			`Q${10000 + index}`,                        // policy no
			lob,                                        // line of business
			si,                                         // sum insured
			premium,                                    // premium
			askMainCoverageLimit(si),                   // main coverage limit
			askMainCoveragePremium(premium),            // main coverage premium
			formatTime(effectiveDate),                  // effective date
			effectiveDate.month() + 1,                  // effective month
			formatTime(expiryDate),                     // expiry date
			expiryDate.month() + 1,                     // expiry month
			formatTime(issueDate),                      // issue date
			issueDate.month() + 1,                      // issue month
			askEndorsementNo(),                         // endorsement no
			askCustomerNo(),                            // customer no
			askCustomerGender(),                        // customer gender
			askAgencyCode()                             // agency code
		];
	});
};

const DemoData = generate();
export const fetchDemoSubjectData = async (options: {
	subjectId: SubjectId;
	pageNumber: number;
	pageSize: number;
}): Promise<DataSetPage> => {
	const {pageNumber, pageSize} = options;

	const maxPageNumber = Math.ceil(DemoData.length / pageSize);
	const returnPageNumber = Math.min(pageNumber, maxPageNumber);

	return {
		data: DemoData.slice(returnPageNumber - 1, pageSize),
		itemCount: DemoData.length,
		pageNumber: returnPageNumber,
		pageSize,
		pageCount: maxPageNumber
	};
};

const LOB_INDEX = 1;
const PREMIUM_INDEX = 3;
const ISSUE_MONTH_INDEX = 11;
const AGENCY_INDEX = 15;

const DEMO_CHART_DATA: Record<ReportId, () => Promise<ChartDataSet>> = {
	'100': async (): Promise<ChartDataSet> => {
		return {data: [[DemoData.length]]};
	},
	'101': async (): Promise<ChartDataSet> => {
		return {data: [[DemoData.reduce((total, row) => total + (row[PREMIUM_INDEX] as number), 0).toFixed(2)]]};
	},
	'102': async (): Promise<ChartDataSet> => {
		const data = DemoData.reduce((data, row) => {
			const agency = row[AGENCY_INDEX] as string;
			const total = data[agency] ?? 0;
			data[agency] = total + (row[PREMIUM_INDEX] as number);
			return data;
		}, {} as Record<string, number>);
		return {
			data: Object.keys(data)
				.sort((a, b) => a.localeCompare(b, void 0, {sensitivity: 'base', caseFirst: 'upper'}))
				.map(agency => [Number(data[agency].toFixed(0)), agency])
		};
	},
	'103': async (): Promise<ChartDataSet> => {
		const data = DemoData.reduce((data, row) => {
			const month = `${row[ISSUE_MONTH_INDEX]}` as string;
			data[month] = (data[month] ?? 0) + 1;
			return data;
		}, {} as Record<string, number>);
		return {
			data: Object.keys(data)
				.sort((a, b) => Number(a) - Number(b))
				.map(month => [data[month], month])
		};
	},
	'104': async (): Promise<ChartDataSet> => {
		const data = DemoData.reduce((data, row) => {
			const lob = row[LOB_INDEX] as string;
			const agency = row[AGENCY_INDEX] as string;
			const key = `${lob}-${agency}`;
			const existing = data[key];
			if (existing == null) {
				data[key] = [lob, agency, row[PREMIUM_INDEX] as number];
			} else {
				data[key] = [lob, agency, data[key][2] + (row[PREMIUM_INDEX] as number)];
			}
			return data;
		}, {} as Record<string, [string, string, number]>);
		return {
			data: Object.keys(data)
				.sort((a, b) => a.localeCompare(b, void 0, {sensitivity: 'base', caseFirst: 'upper'}))
				.map(key => {
					const row = data[key];
					return [Number(row[2].toFixed(0)), row[1], row[0]];
				})
		};
	},
	'105': async (): Promise<ChartDataSet> => {
		const data = DemoData.reduce((data, row) => {
			const lob = row[LOB_INDEX] as string;
			const agency = row[AGENCY_INDEX] as string;
			const key = `${lob}-${agency}`;
			const existing = data[key];
			if (existing == null) {
				data[key] = [lob, agency, row[PREMIUM_INDEX] as number];
			} else {
				data[key] = [lob, agency, data[key][2] + (row[PREMIUM_INDEX] as number)];
			}
			return data;
		}, {} as Record<string, [string, string, number]>);
		return {
			data: Object.keys(data)
				.sort((a, b) => a.localeCompare(b, void 0, {sensitivity: 'base', caseFirst: 'upper'}))
				.map(key => {
					const row = data[key];
					return [Number(row[2].toFixed(0)), row[1], row[0]];
				})
		};
	}
};
export const fetchDemoChartData = async (reportId: ReportId): Promise<ChartDataSet> => {
	return DEMO_CHART_DATA[reportId]();
};
