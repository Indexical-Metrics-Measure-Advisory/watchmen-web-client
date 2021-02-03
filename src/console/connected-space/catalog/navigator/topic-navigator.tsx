import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICON_CLOSE } from '../../../../basic-widgets/constants';
import { Topic } from '../../../../services/tuples/topic-types';
import { useCatalogEventBus } from '../catalog-event-bus';
import { CatalogEventTypes } from '../catalog-event-bus-types';
import {
	TopicNavigatorContainer,
	TopicNavigatorHeader,
	TopicNavigatorHeaderCloseButton,
	TopicNavigatorHeaderTitle
} from './widgets';

export const TopicNavigator = () => {
	const { on, off } = useCatalogEventBus();
	const [ visible, setVisible ] = useState(false);
	const [ topic, setTopic ] = useState<Topic | null>(null);
	useEffect(() => {
		const onTopicSelected = (topic: Topic) => {
			setTopic(topic);
			setVisible(true);
		};

		on(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		return () => {
			off(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		};
	}, [ on, off ]);

	const onCloseClicked = () => {
		setVisible(false);
	}

	return <TopicNavigatorContainer visible={visible}>
		<TopicNavigatorHeader>
			<TopicNavigatorHeaderTitle>{topic?.name}</TopicNavigatorHeaderTitle>
			<TopicNavigatorHeaderCloseButton onClick={onCloseClicked}>
				<FontAwesomeIcon icon={ICON_CLOSE}/>
			</TopicNavigatorHeaderCloseButton>
		</TopicNavigatorHeader>
		{/*<TopicBody>*/}
		{/*	{*/}
		{/*		topic*/}
		{/*			? topic.factors*/}
		{/*				.sort((f1, f2) => f1.label.localeCompare(f2.label))*/}
		{/*				.map(factor => {*/}
		{/*					return <TopicFactor key={factor.name} space={space} topic={topic} factor={factor}/>;*/}
		{/*				})*/}
		{/*			: <NoData>No Data</NoData>*/}
		{/*	}*/}
		{/*</TopicBody>*/}
	</TopicNavigatorContainer>;
};