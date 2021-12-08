import {IndicatorAggregateArithmetic} from '../../tuples/indicator-types';
import {Inspection, InspectionId, InspectMeasureOn} from '../../tuples/inspection-types';
import {QueryInspection} from '../../tuples/query-inspection-types';
import {isFakedUuid} from '../../tuples/utils';
import {RowOfAny} from '../../types';
import {getCurrentTime} from '../../utils';
import {BUCKET_AMOUNT_ID} from './mock-data-buckets';
import {INDICATOR_ORDER_PREMIUM_ID} from './mock-indicator';

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

export const fetchMockInspectionData = async (inspection: Inspection): Promise<Array<RowOfAny>> => {
	return new Promise<Array<RowOfAny>>((resolve) => {
		setTimeout(() => resolve([
			['Small Order', 571234, 8737.5],
			['Typical Order', 34569423, 47669.22],
			['VIP Order', 3465697, 547390]
		]), 500);
	});
};