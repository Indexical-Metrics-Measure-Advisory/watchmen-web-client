import {findAccount} from '../account';
import {Apis, get, post} from '../apis';
import {
	fetchMockInspection,
	fetchMockInspectionData,
	listMockInspections,
	saveMockInspection
} from '../mock/tuples/mock-inspection';
import {RowOfAny} from '../types';
import {isMockService} from '../utils';
import {Inspection, InspectionId} from './inspection-types';
import {QueryInspection} from './query-inspection-types';
import {isFakedUuid} from './utils';

export const listInspections = async (): Promise<Array<QueryInspection>> => {
	if (isMockService()) {
		return listMockInspections();
	} else {
		return await get({api: Apis.INSPECTION_LIST});
	}
};

export const fetchInspection = async (inspectionId: InspectionId): Promise<Inspection> => {
	if (isMockService()) {
		return fetchMockInspection(inspectionId);
	} else {
		return await get({api: Apis.INSPECTION_GET, search: {inspectionId}});
	}
};

export const saveInspection = async (inspection: Inspection): Promise<void> => {
	inspection.tenantId = findAccount()?.tenantId;
	if (isMockService()) {
		return saveMockInspection(inspection);
	} else if (isFakedUuid(inspection)) {
		const data = await post({api: Apis.INSPECTION_CREATE, data: inspection});
		inspection.inspectionId = data.inspectionId;
		inspection.tenantId = data.tenantId;
		inspection.lastModified = data.lastModified;
	} else {
		const data = await post({
			api: Apis.INSPECTION_SAVE,
			search: {inspectionId: inspection.inspectionId},
			data: inspection
		});
		inspection.tenantId = data.tenantId;
		inspection.lastModified = data.lastModified;
	}
};

export const fetchInspectionData = async (inspection: Inspection): Promise<Array<RowOfAny>> => {
	if (isMockService()) {
		return fetchMockInspectionData(inspection);
	} else {
		return await get({api: Apis.INSPECTION_DATA, search: {inspectionId: inspection.inspectionId}});
	}
};