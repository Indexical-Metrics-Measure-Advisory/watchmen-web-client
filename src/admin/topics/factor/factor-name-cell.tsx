import {Factor, FactorType} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent, useEffect} from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {FactorNameCellContainer, FactorPropInput} from './widgets';

const findParentFactor = (topic: Topic, factor: Factor): Factor | undefined => {
	const factorIndex = topic.factors.indexOf(factor);
	if (factorIndex === 0) {
		return (void 0);
	}

	for (let index = factorIndex - 1; index >= 0; index--) {
		const f = topic.factors[index];
		if (f.type === FactorType.OBJECT || f.type === FactorType.ARRAY) {
			return f;
		}
	}

	return (void 0);
};

export const FactorNameCell = (props: { topic: Topic, factor: Factor }) => {
	const {topic, factor} = props;

	const {on, off, fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(TopicEventTypes.FACTOR_TYPE_CHANGED, forceUpdate);
		return () => {
			off(TopicEventTypes.FACTOR_TYPE_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const onFactorNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === factor.name) {
			return;
		}
		if (value === '.') {
			const parent = findParentFactor(topic, factor);
			if (parent) {
				const {name = ''} = parent;
				factor.name = name.endsWith('.') ? name : `${name}.`;
			} else {
				factor.name = value;
			}
		} else {
			factor.name = value;
		}
		forceUpdate();
		fire(TopicEventTypes.FACTOR_NAME_CHANGED, factor);
	};

	const namePlaceholder = findParentFactor(topic, factor) ? 'Dot to append into nested' : (void 0);

	return <FactorNameCellContainer>
		<FactorPropInput value={factor.name || ''} onChange={onFactorNameChange}
		                 placeholder={namePlaceholder}/>
	</FactorNameCellContainer>;
};