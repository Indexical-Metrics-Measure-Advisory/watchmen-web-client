import {Factor} from '@/services/data/tuples/factor-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {FactorIndexGroupCellContainer, FactorPropDropdown} from './widgets';

export const FactorIndexGroupCell = (props: { factor: Factor }) => {
	const {factor} = props;

	const {fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();

	const onIndexGroupChange = (option: DropdownOption) => {
		const {value} = option;
		if (value === factor.indexGroup) {
			return;
		}
		factor.indexGroup = value;

		forceUpdate();
		fire(TopicEventTypes.FACTOR_INDEX_GROUP_CHANGED, factor);
	};

	const options: Array<DropdownOption> = [
		{value: '', label: 'No Index'},
		...new Array(10).fill(1).map((item, index) => {
			return {value: `u-${index + 1}`, label: `Unique Index ${index + 1}`};
		}),
		...new Array(10).fill(1).map((item, index) => {
			return {value: `i-${index + 1}`, label: `Index ${index + 1}`};
		})
	];

	return <FactorIndexGroupCellContainer>
		<FactorPropDropdown value={factor.indexGroup || ''} options={options} onChange={onIndexGroupChange}/>
	</FactorIndexGroupCellContainer>;
};