import React, {useEffect} from 'react';
import {Categories} from './categories';
import {CreateOrFind} from './create-or-find';
import {DefineBuckets} from './define-buckets';
import {Description} from './description';
import {IndicatorState} from './indicator-state';
import {useIndicatorsEventBus} from './indicators-event-bus';
import {IndicatorsEventTypes} from './indicators-event-bus-types';
import {LastStep} from './last-step';
import {MeasureMethods} from './measure-methods';
import {PickTopic} from './pick-topic';
import {Relevant} from './relevant';
import {SaveIndicator} from './save-indicator';
import {IndicatorDeclarationStep} from './types';
import {IndicatorsContainer} from './widgets';

export const Indicators = () => {
	const {fire} = useIndicatorsEventBus();
	useEffect(() => {
		fire(IndicatorsEventTypes.SWITCH_STEP, IndicatorDeclarationStep.CREATE_OR_FIND);
	}, [fire]);

	return <IndicatorsContainer>
		<IndicatorState/>
		<CreateOrFind/>
		<PickTopic/>
		<MeasureMethods/>
		<DefineBuckets/>
		<SaveIndicator/>
		<Relevant/>
		<Categories/>
		<Description/>
		<LastStep/>
	</IndicatorsContainer>;
};