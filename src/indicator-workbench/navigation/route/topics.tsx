import {fetchTopic} from '@/services/data/tuples/topic';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Fragment, useEffect, useState} from 'react';
import {useNavigationEventBus} from '../navigation-event-bus';
import {NavigationEventTypes} from '../navigation-event-bus-types';

type AskingRequest = (topic?: Topic) => void;
type AskingRequestQueue = Array<AskingRequest>;

export const Topics = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useNavigationEventBus();
	const [loadingQueue] = useState<Record<TopicId, AskingRequestQueue>>({});
	const [topics] = useState<Record<TopicId, Topic>>({});
	useEffect(() => {
			const onAskTopic = (topicId: TopicId, onData: (topic?: Topic) => void) => {
				const existing = topics[topicId];
				if (existing != null) {
					onData(existing);
					return;
				}

				const queue = loadingQueue[topicId];
				if (queue != null && queue.length !== 0) {
					// loading now
					queue.push(onData);
				} else {
					loadingQueue[topicId] = [onData];

					fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
						async () => {
							const {topic} = await fetchTopic(topicId);
							return topic;
						},
						(topic: Topic) => {
							topics[topicId] = topic;
							loadingQueue[topicId].forEach(onData => onData(topic));
							delete loadingQueue[topicId];
						},
						() => {
							loadingQueue[topicId].forEach(onData => onData());
							delete loadingQueue[topicId];
						});
				}
			};
			on(NavigationEventTypes.ASK_TOPIC, onAskTopic);
			return () => {
				off(NavigationEventTypes.ASK_TOPIC, onAskTopic);
			};
		}, [fireGlobal, on, off, loadingQueue, topics]
	);

	return <Fragment/>;
};