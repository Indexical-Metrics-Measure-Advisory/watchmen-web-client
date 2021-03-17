import React, { useEffect } from 'react';
import { DropdownOption } from '../../../basic-widgets/types';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { Factor, FactorType } from '../../../services/tuples/factor-types';
import { QueryEnumForHolder } from '../../../services/tuples/query-enum-types';
import { useTopicEventBus } from '../topic-event-bus';
import { TopicEventTypes } from '../topic-event-bus-types';
import { FactorEnumCellContainer, FactorPropDropdown, FactorPropLabel } from './widgets';

export const FactorEnumCell = (props: { factor: Factor, enums: Array<QueryEnumForHolder> }) => {
	const { factor, enums } = props;

	const { on, off, fire } = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onFactorTypeChanged = () => {
			forceUpdate();
		};
		on(TopicEventTypes.FACTOR_TYPE_CHANGED, onFactorTypeChanged);
		return () => {
			off(TopicEventTypes.FACTOR_TYPE_CHANGED, onFactorTypeChanged);
		};
	}, [ on, off, forceUpdate ]);

	const onEnumChange = (option: DropdownOption) => {
		const { value } = option;
		if (value === factor.enumId) {
			return;
		}
		factor.enumId = value;

		forceUpdate();
		fire(TopicEventTypes.FACTOR_ENUM_CHANGED, factor);
	};

	if (factor.type !== FactorType.ENUM) {
		return null;
	}

	const options: Array<DropdownOption> = (enums || []).map(item => {
		return { value: item.enumId, label: item.name };
	});

	return <>
		<FactorPropLabel>Enumeration</FactorPropLabel>
		<FactorEnumCellContainer>
			<FactorPropDropdown value={factor.enumId || ''} options={options} onChange={onEnumChange}/>
		</FactorEnumCellContainer>
	</>;
};