import React from 'react';
import {IndicatorDetect} from './indicator-detect';
import {IndicatorSearchBar} from './indicator-search-bar';
import {IndicatorsContainer, IndicatorsHeaderContainer} from './widgets';

export const Indicators = () => {
	return <IndicatorsContainer>
		<IndicatorsHeaderContainer>
			<IndicatorSearchBar/>
			<IndicatorDetect/>
		</IndicatorsHeaderContainer>
	</IndicatorsContainer>;
};