import {Factor, FactorType} from '@/services/data/tuples/factor-types';
import {isNotRawTopic} from '@/services/data/tuples/topic';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {FactorFlattenCellContainer, FactorPropCheckBox, FactorPropLabel} from './widgets';

const isSubFactorCanBeFlatten = (topic: Topic, parentFactorName: string): boolean => {
	const parentFactor = (topic.factors || []).find(factor => factor.name === parentFactorName);
	if (!parentFactor) {
		return true;
	} else if (parentFactor.type === FactorType.ARRAY) {
		return false;
	} else if (!parentFactorName.includes('.')) {
		return true;
	} else {
		const [, ...names] = parentFactorName.split('.').reverse();
		return isSubFactorCanBeFlatten(topic, names.reverse().join('.'));
	}
};
const isFactorCanBeFlatten = (topic: Topic, factor: Factor): boolean => {
	if (isNotRawTopic(topic)) {
		return false;
	}

	if (!factor.name.includes('.')) {
		return false;
	}
	if (factor.type === FactorType.OBJECT || factor.type === FactorType.ARRAY) {
		return false;
	}

	const name = factor.name || '';
	if (!name) {
		return true;
	}

	const [, ...names] = name.split('.').reverse();
	return isSubFactorCanBeFlatten(topic, names.reverse().join('.'));
};

export const FactorFlattenCell = (props: { topic: Topic, factor: Factor }) => {
	const {topic, factor} = props;

	const {on, off, fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTopicTypeChanged = () => {
			if (!isFactorCanBeFlatten(topic, factor)) {
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
				if (!isFactorCanBeFlatten(topic, factor)) {
					delete changed.flatten;
				}
				forceUpdate();
			}
		};
		on(TopicEventTypes.FACTOR_NAME_CHANGED, onFactorNameChanged);
		return () => {
			off(TopicEventTypes.FACTOR_NAME_CHANGED, onFactorNameChanged);
		};
	}, [on, off, topic, factor, forceUpdate]);
	useEffect(() => {
		const onFactorTypeChanged = (changed: Factor) => {
			if (changed === factor || factor.name.startsWith(`${changed.name}.`)) {
				if (!isFactorCanBeFlatten(topic, factor)) {
					delete changed.flatten;
				}
				forceUpdate();
			}
		};
		on(TopicEventTypes.FACTOR_TYPE_CHANGED, onFactorTypeChanged);
		return () => {
			off(TopicEventTypes.FACTOR_TYPE_CHANGED, onFactorTypeChanged);
		};
	}, [on, off, factor, forceUpdate]);

	const onFactorFlattenChange = (value: boolean) => {
		if (value) {
			factor.flatten = value;
		} else {
			delete factor.flatten;
		}
		forceUpdate();
		fire(TopicEventTypes.FACTOR_FLATTEN_CHANGED, factor);
	};

	if (!isFactorCanBeFlatten(topic, factor)) {
		return null;
	}

	return <>
		<FactorPropLabel>Flatten Column</FactorPropLabel>
		<FactorFlattenCellContainer>
			<FactorPropCheckBox value={factor.flatten || false} onChange={onFactorFlattenChange}/>
		</FactorFlattenCellContainer>
	</>;
};