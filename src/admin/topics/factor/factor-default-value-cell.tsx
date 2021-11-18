import {Factor} from '@/services/data/tuples/factor-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent} from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {FactorDefaultValueCellContainer, FactorPropInput} from './widgets';

export const FactorDefaultValueCell = (props: { factor: Factor }) => {
	const {factor} = props;

	const {fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();

	const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === factor.defaultValue) {
			return;
		}
		factor.defaultValue = value;

		forceUpdate();
		fire(TopicEventTypes.FACTOR_DEFAULT_VALUE_CHANGED, factor);
	};

	return <FactorDefaultValueCellContainer>
		<FactorPropInput value={factor.defaultValue || ''} onChange={onValueChange}/>
	</FactorDefaultValueCellContainer>;
};