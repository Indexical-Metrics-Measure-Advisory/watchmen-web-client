import React, {useEffect} from 'react';
import {CreateOrFind} from './create-or-find';
import {useIndicatorsEventBus} from './indicators-event-bus';
import {IndicatorsEventTypes} from './indicators-event-bus-types';
import {PickTopic} from './pick-topic';
import {PrepareStep} from './types';
import {IndicatorsContainer} from './widgets';

export const Indicators = () => {
	const {fire} = useIndicatorsEventBus();
	useEffect(() => {
		fire(IndicatorsEventTypes.SWITCH_STEP, PrepareStep.CREATE_OR_FIND);
	}, [fire]);

	return <IndicatorsContainer>
		<CreateOrFind/>
		<PickTopic/>
	</IndicatorsContainer>;
};