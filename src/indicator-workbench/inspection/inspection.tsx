import React from 'react';
import {CreateOrFind} from './create-or-find';
import {InspectionState} from './inspection-state';
import {Perspective} from './perspective';
import {PickIndicator} from './pick-indicator';
import {ValueOn} from './value-on';
import {InspectionContainer} from './widgets';

export const Inspection = () => {
	return <InspectionContainer>
		<InspectionState/>
		<CreateOrFind/>
		<PickIndicator/>
		<ValueOn/>
		<Perspective/>
	</InspectionContainer>;
};