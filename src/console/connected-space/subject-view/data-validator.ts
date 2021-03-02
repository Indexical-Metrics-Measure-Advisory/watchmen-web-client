import { useEffect, useState } from 'react';
import { AvailableSpaceInConsole } from '../../../services/console/settings-types';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { isParameterValid } from '../../../services/tuples/factor-calculator-utils';
import { Subject } from '../../../services/tuples/subject-types';
import { Topic } from '../../../services/tuples/topic-types';
import { useConsoleEventBus } from '../../console-event-bus';
import { ConsoleEventTypes } from '../../console-event-bus-types';
import { useSubjectEventBus } from './subject-event-bus';
import { SubjectEventTypes } from './subject-event-bus-types';

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