import {Apis, get, post} from '../apis';
import {deleteMockSubject, renameMockSubject, saveMockSubject} from '../mock/tuples/mock-subject';
import {isMockService} from '../utils';
import {Subject} from './subject-types';
import {isFakedUuid} from './utils';

export const saveSubject = async (subject: Subject, connectedSpaceId: string): Promise<void> => {
	if (isMockService()) {
		return saveMockSubject(subject);
	} else if (isFakedUuid(subject)) {
		const data = await post({api: Apis.SUBJECT_CREATE, search: {connectId: connectedSpaceId}, data: subject});
		subject.subjectId = data.subjectId;
		subject.lastModifyTime = data.lastModifyTime;
	} else {
		const data = await post({api: Apis.SUBJECT_SAVE, data: subject});
		subject.lastModifyTime = data.lastModifyTime;
	}
};

export const renameSubject = async (subject: Subject): Promise<void> => {
	if (isMockService()) {
		return renameMockSubject(subject);
	} else {
		await get({api: Apis.SUBJECT_RENAME, search: {subjectId: subject.subjectId, name: subject.name}});
	}
};

export const deleteSubject = async (subject: Subject): Promise<void> => {
	if (isMockService()) {
		return deleteMockSubject(subject);
	} else {
		await get({api: Apis.SUBJECT_DELETE, search: {subjectId: subject.subjectId}});
	}
};
