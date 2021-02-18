import React from 'react';
import { DropdownOption } from '../../../../../../basic-widgets/types';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { Factor, FactorType } from '../../../../../../services/tuples/factor-types';
import {
	FromFactor,
	ToFactor
} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { getCurrentTime } from '../../../../../../services/utils';
import { FactorDropdown, FactorFinderContainer, IncorrectOptionLabel } from './widgets';

const createUnknownFactor = (factorId: string): Factor => {
	return {
		factorId,
		name: 'Unknown Factor',
		type: FactorType.TEXT,
		label: '',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};

export const FactorPicker = (props: { holder: FromFactor | ToFactor | { factorId: string }, topic?: Topic, }) => {
	const { holder, topic } = props;

	const { factorId } = holder;

	const forceUpdate = useForceUpdate();

	const onFactorChange = ({ value }: DropdownOption) => {
		const selectedFactor = value as Factor;
		if (selectedFactor.factorId === factorId) {
			return;
		}
		holder.factorId = selectedFactor.factorId;
		forceUpdate();
	};

	let selectedFactor: Factor | null = null, extraFactor: Factor | null = null;
	if (factorId) {
		if (topic) {
			// find factor in selected topic
			// eslint-disable-next-line
			selectedFactor = topic.factors.find(factor => factor.factorId == factorId) || null;
		}
		if (!selectedFactor) {
			extraFactor = createUnknownFactor(factorId);
			selectedFactor = extraFactor;
		}
	}

	const factorOptions = ([ ...(topic?.factors || []), extraFactor ].filter(x => !!x) as Array<Factor>)
		.sort((f1, f2) => (f1.label || f1.name).toLowerCase().localeCompare((f2.label || f2.name).toLowerCase()))
		.map(factor => {
			return {
				value: factor,
				label: ({ value }) => {
					if (value === extraFactor) {
						return {
							node: <IncorrectOptionLabel>{value.label || value.name}</IncorrectOptionLabel>,
							label: value.label || value.name
						};
					} else {
						return value.label || value.name;
					}
				},
				key: factor.factorId
			} as DropdownOption;
		});

	return <FactorFinderContainer>
		<FactorDropdown value={selectedFactor} options={factorOptions} onChange={onFactorChange}
		                please='Factor?'/>
	</FactorFinderContainer>;
};