import {CreateOrFind} from '@/indicator-workbench/prepare/step-1';
import React from 'react';
import {IndicatorsContainer} from './widgets';

export const Indicators = () => {
	return <IndicatorsContainer>
		<CreateOrFind/>
	</IndicatorsContainer>;
};