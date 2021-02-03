import { findToken } from '../account';
import { saveMockSubject } from '../mock/tuples/mock-subject';
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
