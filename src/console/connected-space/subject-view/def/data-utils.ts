import {ParameterExpressionOperator, ParameterJointType} from '@/services/data/tuples/factor-calculator-types';
import {createConstantParameter, createTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {
	Subject,
	SubjectDataSetColumn,
	SubjectDataSetFilterExpression,
	SubjectDataSetFilterJoint,
	SubjectDataSetJoin,
	TopicJoinType
} from '@/services/data/tuples/subject-types';
import {generateUuid} from '@/services/data/tuples/utils';

export const createSubjectDataSetColumn = (subject: Subject): SubjectDataSetColumn => {
	const {columns} = subject.dataset;
	const existsNames = columns.map(column => (column.alias || '').trim().toLowerCase()).filter(x => !!x);
	let count = columns.length + 1;
	let newName = `Column${count++}`;
	while (existsNames.includes(newName.toLowerCase())) {
		newName = `Column${count++}`;
	}
	let columnId = generateUuid();
	const existsColumnIds = columns.map(column => column.columnId);
	while (existsColumnIds.includes(columnId)) {
		columnId = generateUuid();
	}

	return {
		columnId,
		alias: newName,
		parameter: createTopicFactorParameter()
	};
};
export const createSubjectDataSetTopFilter = (): SubjectDataSetFilterJoint => {
	return {
		jointType: ParameterJointType.AND,
		filters: []
	};
};
export const createSubjectDataSetFilter = (): SubjectDataSetFilterExpression => {
	return {
		left: createTopicFactorParameter(),
		operator: ParameterExpressionOperator.EQUALS,
		right: createConstantParameter()
	};
};
export const createSubjectDataSetJoint = (parentJointType: ParameterJointType): SubjectDataSetFilterJoint => {
	return {
		jointType: parentJointType === ParameterJointType.AND ? ParameterJointType.OR : ParameterJointType.AND,
		filters: [createSubjectDataSetFilter()]
	};
};
export const createSubjectDataSetJoin = (): SubjectDataSetJoin => {
	return {
		topicId: '',
		factorId: '',
		secondaryTopicId: '',
		secondaryFactorId: '',
		type: TopicJoinType.INNER
	};
};