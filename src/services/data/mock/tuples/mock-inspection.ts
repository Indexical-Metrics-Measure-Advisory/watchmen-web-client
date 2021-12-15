import dayjs from 'dayjs';
import {
	IndicatorAggregateArithmetic,
	IndicatorAggregateArithmeticSort,
	MeasureMethod
} from '../../tuples/indicator-types';
import {Inspection, InspectionId, InspectMeasureOn} from '../../tuples/inspection-types';
import {QueryInspection} from '../../tuples/query-inspection-types';
import {isFakedUuid} from '../../tuples/utils';
import {RowOfAny} from '../../types';
import {formatTime, getCurrentTime, isNotNull} from '../../utils';
import {
	Amounts,
	BUCKET_AMOUNT_ID,
	BUCKET_CITIES_ID,
	BUCKET_CITIES_ISLAND_ID,
	Cities,
	CitiesIsland
} from './mock-data-buckets';
import {INDICATOR_ORDER_PREMIUM_ID} from './mock-data-indicators';

export const INSPECTION_ORDER_PREMIUM_ID = '1';

const OrderPremiumInspection: Inspection = {
	inspectionId: INSPECTION_ORDER_PREMIUM_ID,
	name: 'Order Premium',
	indicatorId: INDICATOR_ORDER_PREMIUM_ID,
	aggregateArithmetics: [IndicatorAggregateArithmetic.SUM, IndicatorAggregateArithmetic.AVG],
	measureOn: InspectMeasureOn.VALUE,
	measureOnBucketId: BUCKET_AMOUNT_ID,
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

export const DemoInspections = [OrderPremiumInspection];

export const listMockInspections = async (): Promise<Array<QueryInspection>> => {
	return new Promise<Array<QueryInspection>>((resolve) => {
		setTimeout(() => {
			resolve([...DemoInspections]);
		}, 500);
	});
};

export const fetchMockInspection = async (inspectionId: InspectionId): Promise<Inspection> => {
	// eslint-disable-next-line
	const found = DemoInspections.find(({inspectionId: id}) => id == inspectionId);
	if (found) {
		return JSON.parse(JSON.stringify(found));
	} else {
		return {...OrderPremiumInspection, inspectionId};
	}
};

let newInspectionId = 10000;
export const saveMockInspection = async (inspection: Inspection): Promise<void> => {
	return new Promise<void>((resolve) => {
		if (isFakedUuid(inspection)) {
			inspection.inspectionId = `${newInspectionId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

const MockCities = [
	{code: '001', label: 'New York City'},
	{code: '002', label: 'Portland'},
	{code: '003', label: 'Manchester'},
	{code: '004', label: 'Burlington'},
	{code: '005', label: 'Providence'},
	{code: '006', label: 'Bridgeport'},
	{code: '007', label: 'Boston'}
];

interface OrderPremiumRow {
	quoteCreateDate: string;
	orderIssueDate: string;
	premium: number;
	city: string;
	// computed
	orderSize?: string;
	cityGroup?: string;
	year?: number;
	month?: number;
}

interface GroupedOrderPremiumRow extends OrderPremiumRow {
	count: number;
	sum: number;
	avg: number;
	min: number;
	max: number;
}

const months = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const daysInMonth = (year: number, month: number) => dayjs(`${year}-${month}`).daysInMonth();
const randomRows = (days: number) => new Array(20 + Math.ceil(Math.random() * 30)).fill(1).map(() => Math.ceil(Math.random() * days));
const randomDays = () => Math.ceil(Math.random() * 14);
const randomPremium = () => {
	const segment = Math.ceil(Math.random() * 3);
	switch (segment) {
		case 1:
			return 5000 + Math.ceil(Math.random() * 5000);
		case 3:
			return 100000 + Math.ceil(Math.random() * 50000);
		case 2:
		default:
			return 10000 + Math.ceil(Math.random() * 90000);
	}
};
const randomCity = () => MockCities[Math.floor(Math.random() * 7)];
const buildMockInspectionData = (years: Array<number>): Array<OrderPremiumRow> => {
	return years.map(year => {
		return months().map(month => {
			return randomRows(daysInMonth(year, month)).map(day => {
				const createDate = dayjs().year(year).month(month - 1).date(day);
				let issueDate = createDate.add(randomDays(), 'day');
				if (issueDate.year() !== createDate.year()) {
					issueDate = createDate.date(31);
				}
				return {
					quoteCreateDate: formatTime(createDate),
					orderIssueDate: formatTime(issueDate),
					premium: randomPremium(),
					city: randomCity().code
				} as OrderPremiumRow;
			});
		}).flat();
	}).flat();
};
const buildRangeYears = (inspection: Inspection): Array<number> => {
	const timeRanges = (inspection.timeRanges == null || inspection.timeRanges.length === 0)
		? []
		: inspection.timeRanges.filter(isNotNull);
	if (timeRanges.length !== 0) {
		return timeRanges.map(({value}) => value as number);
	} else {
		const currentYear = new Date().getFullYear();
		return new Array(10).fill(1).map((_, index) => currentYear - index);
	}
};
const gatherInspectionData = (inspection: Inspection): Array<RowOfAny> => {
	// dataset built according to time filter
	const dataset = buildMockInspectionData(buildRangeYears(inspection));

	const transformers: Array<(row: OrderPremiumRow) => OrderPremiumRow> = [];
	// bucketing
	if (inspection.measureOn === InspectMeasureOn.VALUE) {
		transformers.push((row: OrderPremiumRow) => {
			return {
				...row,
				orderSize: Amounts.segments.find(({value: {min = 0, max = 99999999}}) => {
					return row.premium >= min && row.premium <= max;
				})?.name
			};
		});
	} else if (inspection.measureOn === InspectMeasureOn.OTHER) {
		// eslint-disable-next-line
		if (inspection.measureOnBucketId == BUCKET_CITIES_ID) {
			transformers.push((row: OrderPremiumRow) => {
				return {
					...row,
					cityGroup: Cities.segments.find(({value}) => {
						return value.includes(row.city) || value.includes('&others');
					})?.name
				};
			});
			// eslint-disable-next-line
		} else if (inspection.measureOnBucketId == BUCKET_CITIES_ISLAND_ID) {
			transformers.push((row: OrderPremiumRow) => {
				return {
					...row,
					cityGroup: CitiesIsland.segments.find(({value}) => {
						return value.includes(row.city) || value.includes('&others');
					})?.name
				};
			});
		} else {
			transformers.push((row: OrderPremiumRow) => {
				return {...row, cityGroup: MockCities.find(city => city.code === row.city)?.code};
			});
		}
	}

	// time grouping
	if (inspection.measureOnTimeFactorId === '203') {
		// quote create date
		if (inspection.measureOnTime === MeasureMethod.YEAR) {
			transformers.push((row: OrderPremiumRow) => {
				return {...row, year: dayjs(row.quoteCreateDate).year()};
			});
		} else if (inspection.measureOnTime === MeasureMethod.MONTH) {
			transformers.push((row: OrderPremiumRow) => {
				return {...row, month: dayjs(row.quoteCreateDate).month() + 1};
			});
		}
	} else if (inspection.measureOnTimeFactorId === '205') {
		// issue date
		if (inspection.measureOnTime === MeasureMethod.YEAR) {
			transformers.push((row: OrderPremiumRow) => {
				return {...row, year: dayjs(row.orderIssueDate).year()};
			});
		} else if (inspection.measureOnTime === MeasureMethod.MONTH) {
			transformers.push((row: OrderPremiumRow) => {
				return {...row, month: dayjs(row.orderIssueDate).month() + 1};
			});
		}
	}

	// arithmetics
	const buildKey = (row: OrderPremiumRow) => [row.orderSize, row.cityGroup, row.year, row.month].map(x => x ?? '').join('-');
	const data = dataset.map(row => transformers.reduce((row, transform) => transform(row), row))
		.reduce((map, row) => {
			const key = buildKey(row);
			let exists = map[key];
			if (exists == null) {
				map[key] = {...row, count: 1, sum: row.premium, avg: row.premium, max: row.premium, min: row.premium};
			} else {
				map[key] = {
					...exists,
					count: exists.count + 1,
					sum: exists.sum + row.premium,
					avg: (exists.sum + row.premium) / (exists.count + 1),
					max: Math.max(exists.max, row.premium),
					min: Math.min(exists.min, row.premium)
				};
			}
			return map;
		}, {} as Record<string, GroupedOrderPremiumRow>);

	const sorters = [
		(r1: GroupedOrderPremiumRow, r2: GroupedOrderPremiumRow) => (r1.orderSize || '').localeCompare(r2.orderSize || ''),
		(r1: GroupedOrderPremiumRow, r2: GroupedOrderPremiumRow) => (r1.cityGroup || '').localeCompare(r2.cityGroup || ''),
		(r1: GroupedOrderPremiumRow, r2: GroupedOrderPremiumRow) => (r1.year || 0) - (r2.year || 0),
		(r1: GroupedOrderPremiumRow, r2: GroupedOrderPremiumRow) => (r1.month || 0) - (r2.month || 0)
	];
	const rows = Object.values(data).sort((r1, r2) => {
		return sorters.reduce((r, sort) => r !== 0 ? r : sort(r1, r2), 0);
	});

	const arithmetics = (inspection.aggregateArithmetics || [])
		.sort((a1, a2) => IndicatorAggregateArithmeticSort[a1] - IndicatorAggregateArithmeticSort[a2]);
	return rows.map(row => {
		return [
			row.orderSize, row.cityGroup, row.year, row.month,
			arithmetics.includes(IndicatorAggregateArithmetic.COUNT) ? row.count : null,
			arithmetics.includes(IndicatorAggregateArithmetic.SUM) ? row.sum : null,
			arithmetics.includes(IndicatorAggregateArithmetic.AVG) ? Number(Number(row.avg).toFixed(2)) : null,
			arithmetics.includes(IndicatorAggregateArithmetic.MAX) ? row.max : null,
			arithmetics.includes(IndicatorAggregateArithmetic.MIN) ? row.min : null
		].filter(isNotNull);
	}) as Array<RowOfAny>;
};

export const fetchMockInspectionData = async (inspection: Inspection): Promise<Array<RowOfAny>> => {
	// eslint-disable-next-line
	if (inspection.inspectionId == INSPECTION_ORDER_PREMIUM_ID) {
		return new Promise<Array<RowOfAny>>((resolve) => {
			setTimeout(() => resolve(gatherInspectionData(inspection)), 500);
		});
	} else {
		return new Promise<Array<RowOfAny>>(resolve => {
			setTimeout(() => {
				resolve([]);
			}, 300);
		});
	}
};