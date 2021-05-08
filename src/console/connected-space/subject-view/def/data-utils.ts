import {
	ComputedParameter,
	ConstantParameter,
	ParameterComputeType,
	ParameterExpressionOperator,
	ParameterJointType,
	ParameterKind,
	TopicFactorParameter
} from '../../../../services/tuples/factor-calculator-types';
import {ParameterCalculatorDefsMap} from '../../../../services/tuples/factor-calculator-utils';
import {
	Subject,
	SubjectDataSetColumn,
	SubjectDataSetFilterExpression,
	SubjectDataSetFilterJoint,
	SubjectDataSetJoin,
	TopicJoinType
} from '../../../../services/tuples/subject-types';
import {generateUuid} from '../../../../services/tuples/utils';

export const createTopicFactorParameter = (): TopicFactorParameter => {
	return {kind: ParameterKind.TOPIC, topicId: '', factorId: ''};
};
export const createConstantParameter = (): ConstantParameter => {
	return {kind: ParameterKind.CONSTANT, value: ''};
};
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