import { findToken } from '../account';
import { deleteMockSubject, renameMockSubject, saveMockSubject } from '../mock/tuples/mock-subject';
import { getServiceHost, isMockService } from '../utils';
import { Subject } from './subject-types';
import { isFakedUuid } from './utils';

export const saveSubject = async (subject: Subject, connectedSpaceId: string): Promise<void> => {
	if (isMockService()) {
		return saveMockSubject(subject);
	} else if (isFakedUuid(subject)) {
		const token = findToken();
		const response = await fetch(`${getServiceHost()}console_space/subject?connect_id=${connectedSpaceId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				body: JSON.stringify(subject)
			}
		);

		const data = await response.json();
		subject.subjectId = data.subjectId;
		subject.lastModifyTime = data.lastModifyTime;
	} else {
		const token = findToken();
		const response = await fetch(`${getServiceHost()}console_space/subject/save`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			},
			body: JSON.stringify(subject)
		});

		const data = await response.json();
		subject.lastModifyTime = data.lastModifyTime;
	}
};

export const renameSubject = async (subject: Subject): Promise<void> => {
	if (isMockService()) {
		return renameMockSubject(subject);
	} else {
		// TODO use real api
		// const token = findToken();
		// await fetch(`${getServiceHost()}subject/rename?subject_id=${subject.subjectId}&name=${subject.name}`, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: 'Bearer ' + token
		// 	}
		// });
	}
};

export const deleteSubject = async (subject: Subject): Promise<void> => {
	if (isMockService()) {
		return deleteMockSubject(subject);
	} else {
		const token = findToken();
		await fetch(`${getServiceHost()}console_space/subject/delete?subject_id=${subject.subjectId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		});
	}
};
