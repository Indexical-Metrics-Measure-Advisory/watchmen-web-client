import React from 'react';
import {AggregateArithmetic} from './aggregate-arithmetic';
import {BucketOn} from './bucket-on';
import {CreateOrFind} from './create-or-find';
import {InspectionState} from './inspection-state';
import {PickIndicator} from './pick-indicator';
import {TimePeriod} from './time-period';
import {InspectionContainer} from './widgets';

export const Inspection = () => {
	return <InspectionContainer>
		<InspectionState/>
		<CreateOrFind/>
		<PickIndicator/>
		<AggregateArithmetic/>
		<BucketOn/>
		<TimePeriod/>
	</InspectionContainer>;
};