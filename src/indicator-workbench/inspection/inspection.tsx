import React from 'react';
import {CreateOrFind} from './create-or-find';
import {InspectionState} from './inspection-state';
import {PickIndicator} from './pick-indicator';
import {SelectMeasure} from './select-measure';
import {InspectionContainer} from './widgets';

export const Inspection = () => {
	return <InspectionContainer>
		<InspectionState/>
		<CreateOrFind/>
		<PickIndicator/>
		<SelectMeasure/>
	</InspectionContainer>;
};