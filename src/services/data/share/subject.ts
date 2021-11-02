import {saveTokenIntoSession} from '../account';
import {Apis, get} from '../apis';
import {fetchMockSharedSubject} from '../mock/share/mock-subject';
import {Subject, SubjectId} from '../tuples/subject-types';
import {Token} from '../types';
import {isMockService} from '../utils';

export interface SharedSubject {
	subject: Subject;
}

export const fetchSharedSubject = async (subjectId: SubjectId, token: Token): Promise<SharedSubject> => {
	if (isMockService()) {
		return await fetchMockSharedSubject(subjectId, token);
	} else {
		const subject = await get({api: Apis.SUBJECT_SHARE_GET, search: {subjectId, token}, auth: false});
		saveTokenIntoSession(token);
		return await subject;
	}
};
