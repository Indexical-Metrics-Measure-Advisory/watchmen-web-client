import React, {useEffect} from 'react';
import {CreateOrFind} from './create-or-find';
import {DefineBuckets} from './define-buckets';
import {IndicatorState} from './indicator-state';
import {useIndicatorsEventBus} from './indicators-event-bus';
import {IndicatorsEventTypes} from './indicators-event-bus-types';
import {LastStep} from './last-step';
import {MeasureMethods} from './measure-methods';
import {PickTopic} from './pick-topic';
import {Relevant} from './relevant';
import {SaveIndicator} from './save-indicator';
import {PrepareStep} from './types';
import {IndicatorsContainer} from './widgets';

export const Indicators = () => {
	const {fire} = useIndicatorsEventBus();
	useEffect(() => {
		fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.CREATE_OR_FIND);
	}, [fire]);

	return <IndicatorsContainer>
		<IndicatorState/>
		<CreateOrFind/>
		<PickTopic/>
		<MeasureMethods/>
		<DefineBuckets/>
		<SaveIndicator/>
		<Relevant/>
		<LastStep/>
	</IndicatorsContainer>;
};