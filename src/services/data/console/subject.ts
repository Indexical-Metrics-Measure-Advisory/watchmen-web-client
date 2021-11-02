import {Apis, post} from '../apis';
import {fetchMockSubjectData} from '../mock/console/mock-subject';
import {SubjectId} from '../tuples/subject-types';
import {isMockService} from '../utils';
import {DataSetPage} from './dataset';

export const fetchSubjectData = async (options: {
	subjectId: SubjectId;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataSetPage> => {
	const {subjectId, pageNumber = 1, pageSize = 100} = options;
	if (isMockService()) {
		return fetchMockSubjectData({subjectId, pageNumber, pageSize});
	} else {
		return await post({api: Apis.SUBJECT_DATA, search: {subjectId}, data: {pageNumber, pageSize}});
	}
};
