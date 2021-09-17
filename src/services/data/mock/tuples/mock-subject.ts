import {Subject} from '../../tuples/subject-types';
import {isFakedUuid} from '../../tuples/utils';

let newSubjectId = 10000;
export const saveMockSubject = async (subject: Subject): Promise<void> => {
	return new Promise((resolve) => {
		if (isFakedUuid(subject)) {
			subject.subjectId = `${newSubjectId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const renameMockSubject = async (subject: Subject): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 500);
	});
};

export const deleteMockSubject = async (subject: Subject): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 500);
	});
};
