import {
	CompatibleEncryptMethods,
	Factor,
	FactorEncryptMethod,
	FactorEncryptMethodLabels
} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {FactorEncryptCellContainer, FactorPropDropdown, FactorPropLabel} from './widgets';

export const FactorEncryptCell = (props: { topic: Topic, factor: Factor }) => {
	const {factor} = props;

	const {on, off, fire} = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onFactorTypeChanged = (changed: Factor) => {
			if (changed !== factor) {
				return;
			}
			const methods = CompatibleEncryptMethods[factor.type];
			if (factor.encrypt && factor.encrypt !== FactorEncryptMethod.NONE && !methods.includes(factor.encrypt)) {
				factor.encrypt = FactorEncryptMethod.NONE;
			}
			forceUpdate();
		};
		on(TopicEventTypes.FACTOR_TYPE_CHANGED, onFactorTypeChanged);
		return () => {
			off(TopicEventTypes.FACTOR_TYPE_CHANGED, onFactorTypeChanged);
		};
	}, [on, off, factor, forceUpdate]);

	const onFactorEncryptChange = (option: DropdownOption) => {
		if (factor.encrypt !== option.value) {
			factor.encrypt = option.value as FactorEncryptMethod;
			forceUpdate();
			fire(TopicEventTypes.FACTOR_ENCRYPT_CHANGED, factor);
		}
	};

	const methods = CompatibleEncryptMethods[factor.type] ?? [];
	const options = [
		{value: FactorEncryptMethod.NONE, label: FactorEncryptMethodLabels[FactorEncryptMethod.NONE]},
		...methods.map((method) => {
			return {value: method, label: FactorEncryptMethodLabels[method]};
		})
	];

	return <>
		<FactorPropLabel>Encryption</FactorPropLabel>
		<FactorEncryptCellContainer>
			<FactorPropDropdown value={factor.encrypt || FactorEncryptMethod.NONE} options={options}
			                    onChange={onFactorEncryptChange}/>
		</FactorEncryptCellContainer>
	</>;
};