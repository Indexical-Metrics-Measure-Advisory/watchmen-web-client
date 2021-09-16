import React from 'react';
import {DropdownOption} from '@/basic-widgets/types';
import {useForceUpdate} from '@/basic-widgets/utils';
import {Factor} from '@/services/tuples/factor-types';
import {FromFactor, ToFactor} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Topic} from '@/services/tuples/topic-types';
import {FactorDropdown, FactorFinderContainer, IncorrectOptionLabel} from './widgets';
import {findSelectedFactor} from '@/services/tuples/factor-calculator-utils';
import {buildFactorOptions} from '@/shared-widgets/tuples';

export const FactorPicker = (props: { holder: FromFactor | ToFactor | { factorId: string }, topic?: Topic, }) => {
	const {holder, topic} = props;

	const {factorId} = holder;

	const forceUpdate = useForceUpdate();

	const onFactorChange = ({value}: DropdownOption) => {
		const selectedFactor = value as Factor;
		if (selectedFactor.factorId === factorId) {
			return;
		}
		holder.factorId = selectedFactor.factorId;
		forceUpdate();
	};

	const {selected: selectedFactor, extra: extraFactor} = findSelectedFactor(topic, factorId);
	const factorOptions = buildFactorOptions({
		topic, extraFactor, toExtraNode: (factor: Factor) => {
			return <IncorrectOptionLabel>{factor.label || factor.name}</IncorrectOptionLabel>;
		}
	});

	return <FactorFinderContainer>
		<FactorDropdown value={selectedFactor} options={factorOptions} onChange={onFactorChange}
		                please="Factor?"/>
	</FactorFinderContainer>;
};