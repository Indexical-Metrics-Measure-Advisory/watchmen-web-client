import {Factor} from '@/services/data/tuples/factor-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent} from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {FactorLabelCellContainer, FactorPropInput} from './widgets';

export const FactorLabelCell = (props: { factor: Factor }) => {
	const {factor} = props;

	const {fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();

	const onLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === factor.label) {
			return;
		}
		factor.label = value;

		forceUpdate();
		fire(TopicEventTypes.FACTOR_LABEL_CHANGED, factor);
	};

	return <FactorLabelCellContainer>
		<FactorPropInput value={factor.label || ''} onChange={onLabelChange}/>
	</FactorLabelCellContainer>;
};