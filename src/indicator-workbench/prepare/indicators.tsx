import React from 'react';
import {CreateOrFind} from './create-or-find';
import {PickTopic} from './pick-topic';
import {IndicatorsContainer} from './widgets';

export const Indicators = () => {
	return <IndicatorsContainer>
		<CreateOrFind/>
		<PickTopic/>
	</IndicatorsContainer>;
};