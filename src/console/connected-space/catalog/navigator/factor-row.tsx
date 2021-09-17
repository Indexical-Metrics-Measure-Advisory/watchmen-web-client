import {Factor} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {FactorName, FactorRowContainer, FactorTypeSmall} from './topic-widgets';

export const FactorRow = (props: { topic: Topic, factor: Factor }) => {
	const {factor} = props;

	return <FactorRowContainer>
		<FactorName>{factor.label || factor.name}</FactorName>
		<FactorTypeSmall factor={factor}/>
	</FactorRowContainer>;
};