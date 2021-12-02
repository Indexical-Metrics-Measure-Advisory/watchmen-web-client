import {Inspection, InspectionId} from '../../tuples/inspection-types';
import {QueryInspection} from '../../tuples/query-inspection-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';
import {INDICATOR_ORDER_PREMIUM_ID} from './mock-indicator';

export const INSPECTION_ORDER_PREMIUM_ID = '1';

const OrderPremiumInspection: Inspection = {
	inspectionId: INSPECTION_ORDER_PREMIUM_ID,
	name: 'Order Premium',
	indicatorId: INDICATOR_ORDER_PREMIUM_ID,
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