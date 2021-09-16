import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent} from 'react';
import {ICON_CREATED_AT, ICON_LAST_MODIFIED_AT, ICON_TOPIC_PROFILE} from '@/basic-widgets/constants';
import {TooltipAlignment} from '@/basic-widgets/types';
import {QueryTopic} from '@/services/tuples/query-topic-types';
import {
	TupleCard,
	TupleCardDescription,
	TupleCardStatistics,
	TupleCardStatisticsItem,
	TupleCardTitle,
	TupleProfileButton
} from '../widgets/tuple-workbench/tuple-card';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {useTopicProfileEventBus} from '../topic-profile/topic-profile-event-bus';
import {TopicProfileEventTypes} from '../topic-profile/topic-profile-event-bus-types';
import dayjs from 'dayjs';
import {fetchTopic} from '@/services/tuples/topic';
import {TopicType} from '@/services/tuples/topic-types';
import {isDataQualityCenterEnabled} from '@/feature-switch';
import {prettifyDateTimeToMinute} from '@/services/tuples/utils';

const TopicCard = (props: { topic: QueryTopic }) => {
	const {topic} = props;

	const {fire} = useTupleEventBus();
	const {fire: fireProfile} = useTopicProfileEventBus();

	const onEditClicked = () => {
		fire(TupleEventTypes.DO_EDIT_TUPLE, topic);
	};
	const onProfileClicked = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const {topic: topicData} = await fetchTopic(topic.topicId);
		fireProfile(TopicProfileEventTypes.SHOW_PROFILE, topicData, dayjs());
	};

	return <TupleCard key={topic.topicId} onClick={onEditClicked}>
		<TupleCardTitle>
			<span>{topic.name}</span>
			{isDataQualityCenterEnabled() && topic.type !== TopicType.RAW
				? <TupleProfileButton tooltip={{label: 'Profile', alignment: TooltipAlignment.CENTER}}
				                      onClick={onProfileClicked}>
					<FontAwesomeIcon icon={ICON_TOPIC_PROFILE}/>
				</TupleProfileButton>
				: null}
		</TupleCardTitle>
		<TupleCardDescription>{topic.description}</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem tooltip={{label: 'Created At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_CREATED_AT}/>
				<span>{prettifyDateTimeToMinute(topic.createTime)}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'Last Modified At', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_LAST_MODIFIED_AT}/>
				<span>{prettifyDateTimeToMinute(topic.lastModified)}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (topic: QueryTopic) => {
	return <TopicCard topic={topic}/>;
};