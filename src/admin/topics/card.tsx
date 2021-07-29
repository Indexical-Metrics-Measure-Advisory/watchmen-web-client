import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent} from 'react';
import {ICON_FACTOR, ICON_REPORT, ICON_SPACE, ICON_TOPIC_PROFILE, ICON_USER_GROUP} from '../../basic-widgets/constants';
import {TooltipAlignment} from '../../basic-widgets/types';
import {QueryTopic} from '../../services/tuples/query-topic-types';
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
import {fetchTopic} from '../../services/tuples/topic';
import {TopicType} from '../../services/tuples/topic-types';

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
		fireProfile(TopicProfileEventTypes.SHOW_PROFILE, topicData, dayjs().add(-1, 'day'));
	};

	return <TupleCard key={topic.topicId} onClick={onEditClicked}>
		<TupleCardTitle>
			<span>{topic.name}</span>
			{topic.type !== TopicType.RAW
				? <TupleProfileButton tooltip={{label: 'Profile', alignment: TooltipAlignment.CENTER}}
				                      onClick={onProfileClicked}>
					<FontAwesomeIcon icon={ICON_TOPIC_PROFILE}/>
				</TupleProfileButton>
				: null}
		</TupleCardTitle>
		<TupleCardDescription>{topic.description}</TupleCardDescription>
		<TupleCardStatistics>
			<TupleCardStatisticsItem tooltip={{label: 'Factors Count', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_FACTOR}/>
				<span>{topic.factorCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'In User Groups', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_USER_GROUP}/>
				<span>{topic.groupCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'In Spaces', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_SPACE}/>
				<span>{topic.spaceCount}</span>
			</TupleCardStatisticsItem>
			<TupleCardStatisticsItem tooltip={{label: 'In Reports', alignment: TooltipAlignment.CENTER}}>
				<FontAwesomeIcon icon={ICON_REPORT}/>
				<span>{topic.reportCount}</span>
			</TupleCardStatisticsItem>
		</TupleCardStatistics>
	</TupleCard>;
};

export const renderCard = (topic: QueryTopic) => {
	return <TopicCard topic={topic}/>;
};