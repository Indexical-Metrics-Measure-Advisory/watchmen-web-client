import {
	ComputedParameter,
	ConstantParameter,
	ParameterFrom,
	TopicFactorParameter
} from '../../../../services/tuples/factor-calculator-types';
import { ParameterCalculatorDefsMap } from '../../../../services/tuples/factor-calculator-utils';
import {
	FilterExpressionOperator,
	FilterJointType,
	Subject,
	SubjectDataSetColumn,
	SubjectDataSetFilterExpression,
	SubjectDataSetFilterJoint
} from '../../../../services/tuples/subject-types';

export const createTopicFactorParameter = (): TopicFactorParameter => {
	return { from: ParameterFrom.TOPIC, topicId: '', factorId: '' };
};
export const createConstantParameter = (): ConstantParameter => {
	return { from: ParameterFrom.CONSTANT, value: '' };
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
		jointType: FilterJointType.AND,
		filters: []
	}
}
export const createSubjectDataSetFilter = (subject: Subject): SubjectDataSetFilterExpression => {
	return {
		left: createTopicFactorParameter(),
		operator: FilterExpressionOperator.EQUALS,
		right: createConstantParameter()
	};
};

export const canDeleteAnyParameter = (parent: ComputedParameter) => {
	const computeType = parent.type;
	const calculatorDef = ParameterCalculatorDefsMap[computeType];
	const minParamCount = calculatorDef.minParameterCount || calculatorDef.parameterCount || 1;
	const currentCount = parent.parameters.length;
	return currentCount > minParamCount;
};

export const canAddMoreParameter = (parent: ComputedParameter) => {
	const computeType = parent.type;
	const calculatorDef = ParameterCalculatorDefsMap[computeType];
	const maxParamCount = calculatorDef.maxParameterCount || calculatorDef.parameterCount || Infinity;
	const currentCount = parent.parameters.length;
	return currentCount < maxParamCount;
};

export const defendParameters = (parent: ComputedParameter) => {
	const { type: computeType } = parent;
	const calculatorDef = ParameterCalculatorDefsMap[computeType];
	const maxParamCount = calculatorDef.maxParameterCount || calculatorDef.parameterCount || Infinity;
	if (parent.parameters.length > maxParamCount) {
		parent.parameters.length = maxParamCount;
	}
	const minParamCount = calculatorDef.minParameterCount || calculatorDef.parameterCount || 1;
	if (parent.parameters.length < minParamCount) {
		new Array(minParamCount - parent.parameters.length).fill(1).forEach(() => {
			parent.parameters.push(createTopicFactorParameter());
		});
	}
};