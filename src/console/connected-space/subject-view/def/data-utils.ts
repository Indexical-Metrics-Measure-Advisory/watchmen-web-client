import {
	ComputedParameter,
	ConstantParameter,
	ParameterComputeType,
	ParameterExpressionOperator,
	ParameterKind,
	ParameterJointType,
	TopicFactorParameter
} from '../../../../services/tuples/factor-calculator-types';
import { ParameterCalculatorDefsMap } from '../../../../services/tuples/factor-calculator-utils';
import {
	Subject,
	SubjectDataSetColumn,
	SubjectDataSetFilterExpression,
	SubjectDataSetFilterJoint,
	SubjectDataSetJoin,
	TopicJoinType
} from '../../../../services/tuples/subject-types';

export const createTopicFactorParameter = (): TopicFactorParameter => {
	return { kind: ParameterKind.TOPIC, topicId: '', factorId: '' };
};
export const createConstantParameter = (): ConstantParameter => {
	return { kind: ParameterKind.CONSTANT, value: '' };
};
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
		parameter: createTopicFactorParameter()
	};
};
export const createSubjectDataSetTopFilter = (subject: Subject): SubjectDataSetFilterJoint => {
	return {
		jointType: ParameterJointType.AND,
		filters: []
	};
};
export const createSubjectDataSetFilter = (subject: Subject): SubjectDataSetFilterExpression => {
	return {
		left: createTopicFactorParameter(),
		operator: ParameterExpressionOperator.EQUALS,
		right: createConstantParameter()
	};
};
export const createSubjectDataSetJoint = (subject: Subject, parentJointType: ParameterJointType): SubjectDataSetFilterJoint => {
	return {
		jointType: parentJointType === ParameterJointType.AND ? ParameterJointType.OR : ParameterJointType.AND,
		filters: [ createSubjectDataSetFilter(subject) ]
	};
};
export const createSubjectDataSetJoin = (subject: Subject): SubjectDataSetJoin => {
	return {
		topicId: '',
		factorId: '',
		secondaryTopicId: '',
		secondaryFactorId: '',
		type: TopicJoinType.INNER
	};
};

export const defendComputedParameter = (parameter: ComputedParameter) => {
	parameter.type = parameter.type || ParameterComputeType.ADD;
	const calculatorDef = ParameterCalculatorDefsMap[parameter.type];
	const maxParamCount = calculatorDef.maxParameterCount || calculatorDef.parameterCount || Infinity;
	if (parameter.parameters.length > maxParamCount) {
		parameter.parameters.length = maxParamCount;
	}
	const minParamCount = calculatorDef.minParameterCount || calculatorDef.parameterCount || 1;
	if (parameter.parameters.length < minParamCount) {
		new Array(minParamCount - parameter.parameters.length).fill(1).forEach(() => {
			parameter.parameters.push(createTopicFactorParameter());
		});
	}
};