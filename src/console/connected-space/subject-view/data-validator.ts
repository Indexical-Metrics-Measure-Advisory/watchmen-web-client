import { Subject } from '../../../services/tuples/subject-types';

export const isDefValid = (subject: Subject) => {
	const { dataset } = subject;
	if (!dataset) {
		return false;
	}

	// TODO validate subject definition
	const { columns } = dataset;
	if (!columns || columns.length === 0) {
		return false;
	}

	return true;
};