import {Router} from '@/routes/types';
import {AvailableSpaceInConsole} from '@/services/data/console/settings-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useConsoleEventBus} from '../../../console-event-bus';
import {ConsoleEventTypes} from '../../../console-event-bus-types';
import {SubjectDsl} from '../../subject-dsl';
import {BottomGap, SubjectBodyContainer} from './subject-widgets';

export const SubjectBody = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireConsole} = useConsoleEventBus();
	const [topics, setTopics] = useState<Array<Topic>>([]);
	useEffect(() => {
		fireConsole(ConsoleEventTypes.ASK_AVAILABLE_SPACES, (availableSpaces: Array<AvailableSpaceInConsole>) => {
			// eslint-disable-next-line
			const space = availableSpaces.find(space => space.spaceId == connectedSpace.spaceId);
			if (!space) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					{Lang.CONSOLE.CONNECTED_SPACE.SPACE_NOT_FOUND}
				</AlertLabel>, () => {
					history.replace(Router.CONSOLE);
				});
			} else {
				const topicIds = Array.from(new Set(space.topicIds));
				fireConsole(ConsoleEventTypes.ASK_AVAILABLE_TOPICS, (availableTopics: Array<Topic>) => {
					const topicMap = availableTopics.reduce((map, topic) => {
						map.set(topic.topicId, topic);
						return map;
					}, new Map<string, Topic>());
					const topics = topicIds.map(topicId => topicMap.get(topicId)).filter(x => !!x) as Array<Topic>;
					if (topics.length === 0) {
						fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
							{Lang.CONSOLE.CONNECTED_SPACE.TOPICS_NOT_FOUND}
						</AlertLabel>, () => {
							history.replace(Router.CONSOLE);
						});
					} else if (topics.length !== topicIds.length) {
						fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
							{Lang.CONSOLE.CONNECTED_SPACE.TOPICS_COUNT_MISMATCH}
						</AlertLabel>, () => {
							history.replace(Router.CONSOLE);
						});
					} else {
						setTopics(topics);
					}
				});
			}
		});
	}, [connectedSpace.spaceId, connectedSpace.subjects, history, fireGlobal, fireConsole]);

	return <SubjectBodyContainer>
		<SubjectDsl subject={subject} availableTopics={topics} pickedTopics={topics} visible={true}/>
		<BottomGap/>
	</SubjectBodyContainer>;
};