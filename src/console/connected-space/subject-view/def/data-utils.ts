import { ParameterFrom, TopicFactorParameter } from '../../../../services/tuples/factor-calculator-types';
import { Subject, SubjectDataSetColumn } from '../../../../services/tuples/subject-types';

export const createSubjectDataSetColumn = (subject: Subject): SubjectDataSetColumn => {
	const { columns } = subject.dataset;
	const existsNames = columns.map(column => (column.alias || '').trim().toLowerCase()).filter(x => !!x);
	let count = columns.length + 1;
	let newName = `Column${count++}`;
	while (existsNames.includes(newName.toLowerCase())) {
		newName = `Column${count++}`;
	}

	return {
		alias: newName,
		parameter: { from: ParameterFrom.TOPIC, topicId: '', factorId: '' } as TopicFactorParameter
	};
};