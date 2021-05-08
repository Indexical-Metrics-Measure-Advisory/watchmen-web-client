import {ConnectedSpace} from '../tuples/connected-space-types';
import {Subject} from '../tuples/subject-types';

export const buildSubjectShareUrl = async (connectedSpace: ConnectedSpace, subject: Subject): Promise<string> => {
	// REMOTE use real api to retrieve subject share url
	const {protocol, host} = window.location;
	return `${protocol}//${host}/share/subject/${subject.subjectId}`;
};
