import {useTopicProfileEventBus} from './topic-profile-event-bus';
import {useEffect, useState} from 'react';
import {TopicProfileEventTypes} from './topic-profile-event-bus-types';
import {Topic} from '../../services/tuples/topic-types';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {TopicProfileData} from '../../services/data-quality/topic-profile-types';
import {fetchTopicProfileData} from '../../services/data-quality/topic-profile';
import dayjs, {Dayjs} from 'dayjs';
import {
	TopicProfileDialog,
	TopicProfileDialogBody,
	TopicProfileDialogFooter,
	TopicProfileDialogHeader,
	TopicProfileDialogWrapper
} from './widgets';
import {Button} from '../../basic-widgets/button';
import {ButtonInk} from '../../basic-widgets/types';

interface Data {
	topic: Topic;
	date: Dayjs;
	data?: TopicProfileData
}

const getTopicName = (topic: Topic): string => {
	return (topic.name || 'Noname Topic') + ` #${topic.topicId}`;
};

export const TopicProfile = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useTopicProfileEventBus();
	const [destroy, setDestroy] = useState(true);
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<Data | null>(null);

	useEffect(() => {
		const onShowProfile = (topic: Topic, date?: Dayjs) => {
			const profileDate = date ?? dayjs().add(-1, 'day');
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => {
					await fetchTopicProfileData({topicId: topic.topicId, date: profileDate});
				},
				(data?: TopicProfileData) => {
					setData({topic, date: profileDate, data});
					setVisible(true);
					setDestroy(false);
				});
		};
		on(TopicProfileEventTypes.SHOW_PROFILE, onShowProfile);
		return () => {
			off(TopicProfileEventTypes.SHOW_PROFILE, onShowProfile);
		};
	}, [on, off, fireGlobal]);

	if (destroy) {
		return null;
	}

	const onAnimationEnd = () => {
		if (!visible) {
			setDestroy(true);
		}
	};
	const onCloseClicked = () => {
		setVisible(false);
	};

	if (!data) {
		// TODO
		return null;
	}

	return <TopicProfileDialog visible={visible} onAnimationEnd={onAnimationEnd}>
		<TopicProfileDialogWrapper>
			<TopicProfileDialogHeader>Topic Profile of [{getTopicName(data.topic)}]</TopicProfileDialogHeader>
			<TopicProfileDialogBody>

			</TopicProfileDialogBody>
			<TopicProfileDialogFooter>
				<Button ink={ButtonInk.PRIMARY} onClick={onCloseClicked}>Close</Button>
			</TopicProfileDialogFooter>
		</TopicProfileDialogWrapper>
	</TopicProfileDialog>;
};
