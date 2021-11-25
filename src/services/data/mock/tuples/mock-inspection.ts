import {Inspection} from '../../tuples/inspection-types';
import {isFakedUuid} from '../../tuples/utils';

let newInspectionId = 10000;
export const saveMockInspection = async (inspection: Inspection): Promise<void> => {
	return new Promise<void>((resolve) => {
		if (isFakedUuid(inspection)) {
			inspection.inspectionId = `${newInspectionId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};
