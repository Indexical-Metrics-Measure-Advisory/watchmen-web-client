import {Factor} from '@/services/data/tuples/factor-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent} from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {FactorDescriptionCellContainer, FactorPropInputLines} from './widgets';

export const FactorDescriptionCell = (props: { factor: Factor }) => {
	const {factor} = props;

	const {fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();

	const onDescriptionChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === factor.label) {
			return;
		}
		factor.label = value;

		forceUpdate();
		fire(TopicEventTypes.FACTOR_DESCRIPTION_CHANGED, factor);
	};

	return <FactorDescriptionCellContainer>
		<FactorPropInputLines value={factor.description || ''} onChange={onDescriptionChanged}/>
	</FactorDescriptionCellContainer>;
};