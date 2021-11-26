import React from 'react';
import {CreateOrFind} from './create-or-find';
import {InspectionState} from './inspection-state';
import {InspectionContainer} from './widgets';

export const Inspection = () => {
	return <InspectionContainer>
		<InspectionState/>
		<CreateOrFind/>
	</InspectionContainer>;
};