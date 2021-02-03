import React, { useEffect, useState } from 'react';
import { Topic } from '../../../../services/tuples/topic-types';
import { useCatalogEventBus } from '../catalog-event-bus';
import { CatalogEventTypes } from '../catalog-event-bus-types';
import { TopicNavigatorContainer, TopicNavigatorHeader } from './widgets';

export const TopicNavigator = () => {
	const { on, off } = useCatalogEventBus();
	const [ topic, setTopic ] = useState<Topic | null>(null);
	useEffect(() => {
		const onTopicSelected = (topic: Topic) => setTopic(topic);
		const onSubjectSelected = () => setTopic(null);
		const onSelectionClear = () => setTopic(null);

		on(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		on(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
		on(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);
		return () => {
			off(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
			off(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
			off(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);
		};
	}, [ on, off ]);

	return <TopicNavigatorContainer visible={topic != null}>
		<TopicNavigatorHeader>{topic?.name}</TopicNavigatorHeader>
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