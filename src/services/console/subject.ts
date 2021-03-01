import { findToken } from '../account';
import { fetchMockSubjectData } from '../mock/console/mock-subject';
import { doFetch, getServiceHost, isMockService } from '../utils';
import { DataSetPage } from './dataset';

export const fetchSubjectData = async (options: {
	subjectId: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataSetPage<Array<any>>> => {
	const { subjectId, pageNumber = 1, pageSize = 100 } = options;
	if (isMockService()) {
		return fetchMockSubjectData({ subjectId, pageNumber, pageSize });
	} else {
		const token = findToken();
		const response = await doFetch(
			`${getServiceHost()}console_space/subject/dataset?subject_id=${subjectId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				body: JSON.stringify({ pageNumber, pageSize })
			}
		);

		return await response.json();
	}
};
