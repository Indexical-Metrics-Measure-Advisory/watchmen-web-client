import React from 'react';
import {AggregateArithmetic} from './aggregate-arithmetic';
import {BucketOn} from './bucket-on';
import {BucketsState} from './buckets-state';
import {Buttons} from './buttons';
import {CreateOrFind} from './create-or-find';
import {Data} from './data';
import {EnumsState} from './enums-state';
import {InspectionState} from './inspection-state';
import {PickIndicator} from './pick-indicator';
import {TimeMeasureOn} from './time-measure-on';
import {TimePeriod} from './time-period';
import {IndicatorContainer, InspectionContainer} from './widgets';

export const Inspection = () => {
	return <InspectionContainer>
		<InspectionState/>
		<BucketsState/>
		<EnumsState/>
		<IndicatorContainer>
			<CreateOrFind/>
			<PickIndicator/>
		</IndicatorContainer>
		<AggregateArithmetic/>
		<TimePeriod/>
		<TimeMeasureOn/>
		<BucketOn/>
		<Buttons/>
		<Data/>
	</InspectionContainer>;
};