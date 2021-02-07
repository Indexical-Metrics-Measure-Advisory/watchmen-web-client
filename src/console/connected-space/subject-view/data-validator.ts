import { useEffect, useState } from 'react';
import { AvailableSpaceInConsole } from '../../../services/console/settings-types';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import {
	Computed,
	Parameter,
	ParameterCalculatorType,
	ParameterType
} from '../../../services/tuples/factor-calculator-types';
import {
	isComputedParameter,
	isConstantParameter,
	isConstantValueTypeMatched,
	isFactorType,
	isParameterType,
	isTopicFactorParameter,
	ParameterAndFactorTypeMapping,
	ParameterCalculatorDefsMap,
	ParameterCalculatorSupporting
} from '../../../services/tuples/factor-calculator-utils';
import { FactorType } from '../../../services/tuples/factor-types';
import { Subject } from '../../../services/tuples/subject-types';
import { Topic } from '../../../services/tuples/topic-types';
import { useConsoleEventBus } from '../../console-event-bus';
import { ConsoleEventTypes } from '../../console-event-bus-types';
import { useSubjectEventBus } from './subject-event-bus';
import { SubjectEventTypes } from './subject-event-bus-types';

export interface Validation {
	pass: boolean;
	resultType?: FactorType;
}

export const isComputedValid = ({ type, parameters }: Computed, topics: Array<Topic>): Validation => {
	if (!type) {
		// type must exists
		return { pass: false };
	}
	const calculatorDef = ParameterCalculatorDefsMap[type];
	// no calculator
	if (parameters.length !== calculatorDef.parameterCount) {
		// parameters length mismatch
		return { pass: false };
	}
	const hasEmptyParameter = parameters.some(param => !param);
	if (hasEmptyParameter) {
		return { pass: false };
	}
	let availableParameterTypes = calculatorDef.supports;
	const hasInvalidParameter = parameters.some((param, paramIndex) => {
		let matched: Array<ParameterCalculatorSupporting> = [];
		if (isConstantParameter(param)) {
			const value = param.value;
			// match value and type, get valid supporting
			matched = availableParameterTypes.filter(({ parameterTypes }) => isConstantValueTypeMatched(value, parameterTypes[paramIndex]));
		} else if (isTopicFactorParameter(param)) {
			if (!param.topicId || !param.factorId) {
				// no topic or no factor, failure
				return true;
			}
			// test factor type and parameter type
			// eslint-disable-next-line
			const topic = topics.find(topic => topic.topicId == param.topicId);
			if (!topic) {
				// topic not found, failure
				return true;
			}
			// eslint-disable-next-line
			const factor = topic.factors.find(factor => factor.factorId == param.factorId);
			if (!factor) {
				// factor not found, failure
				return true;
			}
			matched = availableParameterTypes.filter(({ parameterTypes }) => {
				if (isParameterType(parameterTypes[paramIndex])) {
					// check result type and parameter type, match use pre-definition
					return ParameterAndFactorTypeMapping[parameterTypes[paramIndex] as ParameterType](factor.type);
				} else if (isFactorType(parameterTypes[paramIndex])) {
					// check result type and factor type, exactly match
					return parameterTypes[paramIndex] === factor.type;
				} else {
					// never occurred
					return false;
				}
			});
		} else if (isComputedParameter(param)) {
			// test computed parameter
			const result = isComputedValid(param, topics);
			if (!result.pass) {
				// failed on computed valid check
				return true;
			}
			if (!result.resultType) {
				// return can be any, cannot check here, ignore.
				return false;
			}
			matched = availableParameterTypes.filter(({ parameterTypes }) => {
				if (isParameterType(parameterTypes[paramIndex])) {
					// check result type and parameter type, match use pre-definition
					return ParameterAndFactorTypeMapping[parameterTypes[paramIndex] as ParameterType](result.resultType!);
				} else if (isFactorType(parameterTypes[paramIndex])) {
					// check result type and factor type, exactly match
					return parameterTypes[paramIndex] === result.resultType;
				} else {
					// never occurred
					return false;
				}
			});
		}
		if (matched.length === 0) {
			// no matched, parameter is invalid, failure
			return true;
		} else {
			availableParameterTypes = matched;
			return false;
		}
	});
	return { pass: !hasInvalidParameter, resultType: availableParameterTypes[0].resultType };
};

export const isParameterValid = (parameter: Parameter, topics: Array<Topic>): Validation => {
	if (!parameter) {
		return { pass: false };
	}
	return isComputedValid({ type: ParameterCalculatorType.NONE, parameters: [ parameter ] }, topics);
};

export const isDefValid = (subject: Subject, topics: Array<Topic>) => {
	const { dataset } = subject;
	if (!dataset) {
		return false;
	}

	// validate subject definition
	const { columns } = dataset;
	if (!columns || columns.length === 0) {
		return false;
	}
	// TODO validate filters/joins
	return !columns.some(({ parameter }) => !isParameterValid(parameter, topics).pass);
};

export const useSubjectValid = (options: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	setValid: (options: { valid: boolean, subject: Subject }) => void;
	detectSubjectDefChange?: boolean;
}) => {
	const { connectedSpace, subject, setValid, detectSubjectDefChange = false } = options;

	const { once: onceConsole } = useConsoleEventBus();
	const { on, off } = useSubjectEventBus();
	const [ validateSubject ] = useState(() => (connectedSpace: ConnectedSpace, subject: Subject) => {
		onceConsole(ConsoleEventTypes.REPLY_AVAILABLE_SPACES, (spaces: Array<AvailableSpaceInConsole>) => {
			// eslint-disable-next-line
			const space = spaces.find(space => space.spaceId == connectedSpace.spaceId);
			if (!space) {
				setValid({ valid: isDefValid(subject, []), subject });
			} else {
				const topicIds = Array.from(new Set(space.topicIds));
				onceConsole(ConsoleEventTypes.REPLY_AVAILABLE_TOPICS, (availableTopics: Array<Topic>) => {
					const topicMap = availableTopics.reduce((map, topic) => {
						map.set(topic.topicId, topic);
						return map;
					}, new Map<string, Topic>());
					const topics = topicIds.map(topicId => topicMap.get(topicId)).filter(x => !!x) as Array<Topic>;
					setValid({ valid: isDefValid(subject, topics), subject });
				}).fire(ConsoleEventTypes.ASK_AVAILABLE_TOPICS);
			}
		}).fire(ConsoleEventTypes.ASK_AVAILABLE_SPACES);
	});
	useEffect(() => {
		validateSubject(connectedSpace, subject);
	}, [ connectedSpace, subject, validateSubject ]);
	useEffect(() => {
		if (detectSubjectDefChange) {
			const onSubjectDefChanged = () => {
				validateSubject(connectedSpace, subject);
			};
			on(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
			return () => {
				off(SubjectEventTypes.SUBJECT_DEF_CHANGED, onSubjectDefChanged);
			};
		}
	}, [ on, off, detectSubjectDefChange, connectedSpace, subject, validateSubject ]);
};