import { useEffect, useState } from 'react';
import { AvailableSpaceInConsole } from '../../../services/console/settings-types';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { Parameter, ParameterExpressionOperator } from '../../../services/tuples/factor-calculator-types';
import {
	isComputedParameter,
	isExpressionValid,
	isJointValid,
	isParameterValid,
	isTopicFactorParameter
} from '../../../services/tuples/factor-calculator-utils';
import { Subject, SubjectDataSetFilterJoint } from '../../../services/tuples/subject-types';
import { isExpressionFilter, isJointFilter } from '../../../services/tuples/subject-utils';
import { Topic } from '../../../services/tuples/topic-types';
import { useConsoleEventBus } from '../../console-event-bus';
import { ConsoleEventTypes } from '../../console-event-bus-types';
import { useSubjectEventBus } from './subject-event-bus';
import { SubjectEventTypes } from './subject-event-bus-types';

const getTopicIdsFromParameter = (parameter: Parameter): Array<string> => {
	if (isTopicFactorParameter(parameter)) {
		return [ parameter.topicId ];
	} else if (isComputedParameter(parameter)) {
		const { parameters } = parameter;
		return parameters.map(parameter => getTopicIdsFromParameter(parameter)).flat();
	} else {
		return [];
	}
};

const getTopicIdsFromFilter = (joint: SubjectDataSetFilterJoint): Array<string> => {
	return joint.filters.map(filter => {
		if (isJointFilter(filter)) {
			return getTopicIdsFromFilter(filter);
		} else if (isExpressionFilter(filter)) {
			const { left, operator, right } = filter;
			return getTopicIdsFromParameter(left)
				|| (operator !== ParameterExpressionOperator.EMPTY
					&& operator !== ParameterExpressionOperator.NOT_EMPTY
					&& getTopicIdsFromParameter(right));
		} else {
			return [];
		}
	}).flat();
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
	const hasInvalidColumn = columns.some(({ parameter, alias }) => {
		return !alias || alias.trim().length === 0 || !isParameterValid(parameter, topics).pass;
	});
	if (hasInvalidColumn) {
		return false;
	}

	const { filters } = dataset;
	if (!filters || !filters.jointType) {
		return false;
	}
	if (filters.filters.length !== 0) {
		const hasInvalidFilter = filters.filters.some(filter => {
			if (isJointFilter(filter)) {
				return !isJointValid(filter, topics);
			} else if (isExpressionFilter(filter)) {
				return !isExpressionValid(filter, topics);
			} else {
				return true;
			}
		});
		if (hasInvalidFilter) {
			return false;
		}
	}

	const { joins } = dataset;
	const hasInvalidJoin = (joins || []).some(({ topicId, factorId, secondaryTopicId, secondaryFactorId, type }) => {
		if (!type || !topicId || !factorId || !secondaryTopicId || !secondaryFactorId) {
			return true;
		}
		// eslint-disable-next-line
		const topic = topics.find(topic => topic.topicId == topicId);
		if (!topic) {
			return true;
		}
		// eslint-disable-next-line
		const factor = topic.factors.find(factor => factor.factorId == factorId);
		if (!factor) {
			return true;
		}
		// eslint-disable-next-line
		const secondaryTopic = topics.find(topic => topic.topicId == secondaryTopicId);
		if (!secondaryTopic) {
			return true;
		}
		// eslint-disable-next-line
		const secondaryFactor = secondaryTopic.factors.find(factor => factor.factorId == secondaryFactorId);
		if (!secondaryFactor) {
			return true;
		}

		return false;
	});
	if (hasInvalidJoin) {
		return false;
	}
	const topicIdsInJoins = Array.from(new Set((joins || []).reduce((topicIds, { topicId, secondaryTopicId }) => {
		topicIds.push(topicId, secondaryTopicId);
		return topicIds;
	}, [] as Array<string>)));
	const topicIdsInColumns = Array.from(new Set(columns.map(({ parameter }) => getTopicIdsFromParameter(parameter)).flat()));
	const topicIdsInFilters = Array.from(new Set(getTopicIdsFromFilter(filters)));
	if (topicIdsInJoins.length === 0) {
		// no join, single source topic
		if (topicIdsInColumns.length > 1 || topicIdsInFilters.length > 1) {
			return false;
		}
		if (topicIdsInColumns.length === 1 && topicIdsInFilters.length === 1) {
			return topicIdsInColumns[0] == topicIdsInFilters[0];
		}
	} else {
		const columnTopicNotInJoin = topicIdsInColumns.some(topicId => !topicIdsInJoins.includes(topicId));
		if (columnTopicNotInJoin) {
			return false;
		}
		const filterTopicNotInJoin = topicIdsInFilters.some(topicId => !topicIdsInJoins.includes(topicId));
		if (filterTopicNotInJoin) {
			return false;
		}
		if (topicIdsInColumns.length !== topicIdsInJoins.length) {
			// every topic in column must be declared in joins
			return false;
		}
	}

	return true;
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