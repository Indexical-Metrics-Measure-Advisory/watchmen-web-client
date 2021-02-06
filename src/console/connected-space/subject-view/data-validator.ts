import { Subject } from '../../../services/tuples/subject-types';

export const isDefValid = (subject: Subject) => {
	const { dataset } = subject;
	if (!dataset) {
		return false;
	}

	const { filters, columns, joins } = dataset;
	if (!columns || columns.length === 0) {
		return false;
	}
};