import {findSelectedFactor} from '@/services/data/tuples/factor-calculator-utils';
import {Factor, FactorId} from '@/services/data/tuples/factor-types';
import {FromFactor, ToFactor} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {buildFactorOptions} from '@/widgets/tuples';
import React from 'react';
import {FactorDropdown, FactorFinderContainer, IncorrectOptionLabel} from './widgets';

export const FactorPicker = (props: {
	holder: FromFactor | ToFactor | { factorId: FactorId };
	topic?: Topic;
	onChange: () => void;
}) => {
	const {holder, topic, onChange} = props;

	const {factorId} = holder;

	const forceUpdate = useForceUpdate();

	const onFactorChange = ({value}: DropdownOption) => {
		const selectedFactor = value as Factor;
		if (selectedFactor.factorId === factorId) {
			return;
		}
		holder.factorId = selectedFactor.factorId;
		forceUpdate();
		onChange();
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