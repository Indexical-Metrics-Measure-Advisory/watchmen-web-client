import {Factor} from '@/services/data/tuples/factor-types';
import {isNotRawTopic} from '@/services/data/tuples/topic';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {FactorFlattenCellContainer, FactorPropCheckBox, FactorPropLabel} from './widgets';

export const FactorFlattenCell = (props: { topic: Topic, factor: Factor }) => {
	const {topic, factor} = props;

	const {on, off, fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTopicTypeChanged = () => {
			if (isNotRawTopic(topic)) {
				delete factor.flatten;
			}
			forceUpdate();
		};
		on(TopicEventTypes.TOPIC_TYPE_CHANGED, onTopicTypeChanged);
		return () => {
			off(TopicEventTypes.TOPIC_TYPE_CHANGED, onTopicTypeChanged);
		};
	}, [on, off, topic, factor, forceUpdate]);
	useEffect(() => {
		const onFactorNameChanged = (changed: Factor) => {
			if (changed === factor) {
				if (changed.name.includes('.')) {
					delete changed.flatten;
				}
				forceUpdate();
			}
		};
		on(TopicEventTypes.FACTOR_NAME_CHANGED, onFactorNameChanged);
		return () => {
			off(TopicEventTypes.FACTOR_NAME_CHANGED, onFactorNameChanged);
		};
	}, [on, off, factor, forceUpdate]);
	// useEffect(() => {
	// 	const onFactorTypeChanged = (changed: Factor) => {
	// 		if (changed === factor) {
	// 			if ([FactorType.OBJECT, FactorType.ARRAY].includes(changed.type)) {
	// 				delete changed.flatten;
	// 			}
	// 			forceUpdate();
	// 		}
	// 	};
	// 	on(TopicEventTypes.FACTOR_TYPE_CHANGED, onFactorTypeChanged);
	// 	return () => {
	// 		off(TopicEventTypes.FACTOR_TYPE_CHANGED, onFactorTypeChanged);
	// 	};
	// }, [on, off, factor, forceUpdate]);

	const onFactorFlattenChange = (value: boolean) => {
		if (value) {
			factor.flatten = value;
		} else {
			delete factor.flatten;
		}
		forceUpdate();
		fire(TopicEventTypes.FACTOR_FLATTEN_CHANGED, factor);
	};

	if (isNotRawTopic(topic) || factor.name.includes('.')) {
		return null;
	}

	return <>
		<FactorPropLabel>Flatten Column</FactorPropLabel>
		<FactorFlattenCellContainer>
			<FactorPropCheckBox value={factor.flatten || false} onChange={onFactorFlattenChange}/>
		</FactorFlattenCellContainer>
	</>;
};