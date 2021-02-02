import React from 'react';
import { Factor } from '../../../services/tuples/factor-types';
import { Topic } from '../../../services/tuples/topic-types';
import { FactorButtons } from './factor-buttons';
import { FactorDefaultValueCell } from './factor-default-value-cell';
import { FactorLabelCell } from './factor-label-cell';
import { FactorNameCell } from './factor-name-cell';
import { FactorSerialCell } from './factor-serial-cell';
import { FactorTypeCell } from './factor-type-cell';

export const FactorRow = (props: {
	topic: Topic;
	factor: Factor;
}) => {
	const { topic, factor } = props;

	return <>
		<FactorSerialCell topic={topic} factor={factor}/>
		<FactorNameCell topic={topic} factor={factor}/>
		<FactorLabelCell factor={factor}/>
		<FactorTypeCell topic={topic} factor={factor}/>
		<FactorDefaultValueCell factor={factor}/>
		<FactorButtons topic={topic} factor={factor}/>
	</>;
};