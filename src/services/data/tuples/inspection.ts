import {findAccount} from '../account';
import {Apis, post} from '../apis';
import {saveMockInspection} from '../mock/tuples/mock-inspection';
import {isMockService} from '../utils';
import {Inspection} from './inspection-types';
import {isFakedUuid} from './utils';

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
