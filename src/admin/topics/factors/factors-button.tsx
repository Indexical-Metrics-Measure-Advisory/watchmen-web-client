import React, {useEffect} from 'react';
import {ButtonInk} from '@/basic-widgets/types';
import {useForceUpdate} from '@/basic-widgets/utils';
import {Topic} from '@/services/tuples/topic-types';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {FactorsTableButton} from './widgets';

export const FactorsButton = (props: { topic: Topic }) => {
	const {topic} = props;

	const {on, off} = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(TopicEventTypes.FACTOR_ADDED, forceUpdate);
		on(TopicEventTypes.FACTOR_REMOVED, forceUpdate);
		on(TopicEventTypes.FACTORS_IMPORTED, forceUpdate);
		return () => {
			off(TopicEventTypes.FACTOR_ADDED, forceUpdate);
			off(TopicEventTypes.FACTOR_REMOVED, forceUpdate);
			off(TopicEventTypes.FACTORS_IMPORTED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const factorCount = topic.factors.length;
	const buttonLabel = factorCount === 0 ? 'No Factor Defined' : (factorCount === 1 ? '1 Factor' : `${factorCount} Factors`);

	return <FactorsTableButton ink={ButtonInk.PRIMARY}>
		<span>{buttonLabel}</span>
	</FactorsTableButton>;
};
