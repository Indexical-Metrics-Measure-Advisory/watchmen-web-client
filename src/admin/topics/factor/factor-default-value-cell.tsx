import React from 'react';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {Factor} from '../../../services/tuples/factor-types';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {FactorDefaultValueCellContainer, FactorPropInput} from './widgets';

export const FactorDefaultValueCell = (props: { factor: Factor }) => {
	const {factor} = props;

	const {fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();

	const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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