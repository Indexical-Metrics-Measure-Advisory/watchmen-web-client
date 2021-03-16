import React from 'react';
import { Factor } from '../../../services/tuples/factor-types';
import { Topic } from '../../../services/tuples/topic-types';
import { FactorButtons } from './factor-buttons';
import { FactorDefaultValueCell } from './factor-default-value-cell';
import { FactorLabelCell } from './factor-label-cell';
import { FactorNameCell } from './factor-name-cell';
import { FactorTypeCell } from './factor-type-cell';
import { FactorPropLabel, FactorRowContainer } from './widgets';

export const FactorRow = (props: {
	topic: Topic;
	factor: Factor;
}) => {
	const { topic, factor } = props;

	return <FactorRowContainer>
		{/*<FactorSerialCell topic={topic} factor={factor}/>*/}
		<FactorPropLabel><span>#{topic.factors.indexOf(factor) + 1}</span> Name</FactorPropLabel>
		<FactorNameCell topic={topic} factor={factor}/>
		<FactorPropLabel>Label</FactorPropLabel>
		<FactorLabelCell factor={factor}/>
		<FactorPropLabel>Type</FactorPropLabel>
		<FactorTypeCell topic={topic} factor={factor}/>
		<FactorPropLabel>Default Value</FactorPropLabel>
		<FactorDefaultValueCell factor={factor}/>
		<FactorButtons topic={topic} factor={factor}/>
	</FactorRowContainer>;
};