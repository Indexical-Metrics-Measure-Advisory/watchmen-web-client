import { saveTokenIntoSession } from '../account';
import { fetchMockSharedSubject } from '../mock/share/mock-subject';
import { Subject } from '../tuples/subject-types';
import { doFetch, getServiceHost, isMockService } from '../utils';

export interface SharedSubject {
	subject: Subject;
}

export const fetchSharedSubject = async (subjectId: string, token: string): Promise<SharedSubject> => {
	if (isMockService()) {
		return await fetchMockSharedSubject(subjectId, token);
	} else {
		const response = await doFetch(`${getServiceHost()}share/subject?subject_id=${subjectId}&&token=${token}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		saveTokenIntoSession(token);

		return await response.json();
	}
};
