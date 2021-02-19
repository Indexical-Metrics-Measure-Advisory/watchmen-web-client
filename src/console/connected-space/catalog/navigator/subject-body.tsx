import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AlertLabel } from '../../../../alert/widgets';
import { useEventBus } from '../../../../events/event-bus';
import { EventTypes } from '../../../../events/types';
import { Lang } from '../../../../langs';
import { Router } from '../../../../routes/types';
import { AvailableSpaceInConsole } from '../../../../services/console/settings-types';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { Topic } from '../../../../services/tuples/topic-types';
import { useConsoleEventBus } from '../../../console-event-bus';
import { ConsoleEventTypes } from '../../../console-event-bus-types';
import { SubjectDsl } from '../../subject-dsl';
import { BottomGap, SubjectBodyContainer } from './subject-widgets';

export const SubjectBody = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const history = useHistory();
	const { once: onceGlobal } = useEventBus();
	const { once: onceConsole } = useConsoleEventBus();
	const [ topics, setTopics ] = useState<Array<Topic>>([]);
	useEffect(() => {
		onceConsole(ConsoleEventTypes.REPLY_AVAILABLE_SPACES, (availableSpaces: Array<AvailableSpaceInConsole>) => {
			// eslint-disable-next-line
			const space = availableSpaces.find(space => space.spaceId == connectedSpace.spaceId);
			if (!space) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					history.replace(Router.CONSOLE);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.SPACE_NOT_FOUND}</AlertLabel>);
			} else {
				const topicIds = Array.from(new Set(space.topicIds));
				onceConsole(ConsoleEventTypes.REPLY_AVAILABLE_TOPICS, (availableTopics: Array<Topic>) => {
					const topicMap = availableTopics.reduce((map, topic) => {
						map.set(topic.topicId, topic);
						return map;
					}, new Map<string, Topic>());
					const topics = topicIds.map(topicId => topicMap.get(topicId)).filter(x => !!x) as Array<Topic>;
					if (topics.length === 0) {
						onceGlobal(EventTypes.ALERT_HIDDEN, () => {
							history.replace(Router.CONSOLE);
						}).fire(EventTypes.SHOW_ALERT,
							<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.TOPICS_NOT_FOUND}</AlertLabel>);
					} else if (topics.length !== topicIds.length) {
						onceGlobal(EventTypes.ALERT_HIDDEN, () => {
							history.replace(Router.CONSOLE);
						}).fire(EventTypes.SHOW_ALERT,
							<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.TOPICS_COUNT_MISMATCH}</AlertLabel>);
					} else {
						setTopics(topics);
					}
				}).fire(ConsoleEventTypes.ASK_AVAILABLE_TOPICS);
			}
		}).fire(ConsoleEventTypes.ASK_AVAILABLE_SPACES);
	}, [ connectedSpace.spaceId, connectedSpace.subjects, history, onceGlobal, onceConsole ]);

	if (topics.length === 0) {

	}

	return <SubjectBodyContainer>
		<SubjectDsl subject={subject} availableTopics={topics} pickedTopics={topics} visible={true}/>
		<BottomGap/>
	</SubjectBodyContainer>;
};