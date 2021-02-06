import { ConnectedSpace } from '../tuples/connected-space-types';
import { Subject } from '../tuples/subject-types';

export const buildSubjectShareUrl = async (connectedSpace: ConnectedSpace, subject: Subject): Promise<string> => {
	// TODO use real api to retrieve subject share url
	return `${window.location.href}/share/subject/${subject.subjectId}`;
};