import {Router} from '@/routes/types';
import {AvailableSpaceInConsole} from '@/services/data/console/settings-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {Fragment, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
// noinspection ES6PreferShortImport
import {useConsoleEventBus} from '../../../../console-event-bus';
// noinspection ES6PreferShortImport
import {ConsoleEventTypes} from '../../../../console-event-bus-types';
import {computeRelatedTopicIds} from '../../../subject-data-utils';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefData, SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {usePickedTopics} from './use-picked-topics';

const computePickedTopics = (subject: Subject, topics: Array<Topic>) => {
	const topicIds = computeRelatedTopicIds(subject.dataset);
	const topicMap: Map<string, Topic> = topics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());
	return Array.from(new Set(topicIds)).map(topicId => topicMap.get(topicId)).filter(x => !!x) as Array<Topic>;
};

export const SubjectDefDataHolder = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const {connectedSpace, subject} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireConsole} = useConsoleEventBus();
	const {fire} = useSubjectDefEventBus();
	const [data, setData] = useState<SubjectDefData>({availableTopics: [], pickedTopics: []});

	useEffect(() => {
		fireConsole(ConsoleEventTypes.ASK_AVAILABLE_SPACES, (spaces: Array<AvailableSpaceInConsole>) => {
			// eslint-disable-next-line
			const space = spaces.find(space => space.spaceId == connectedSpace.spaceId);
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
						const data = {availableTopics: topics, pickedTopics: computePickedTopics(subject, topics)};
						setData(data);
						fire(SubjectDefEventTypes.DATA_LOADED, data);
					}
				});
			}
		});
	}, [history, fireGlobal, fireConsole, fire, connectedSpace.spaceId, subject]);

	usePickedTopics(data.pickedTopics);

	return <Fragment/>;
};