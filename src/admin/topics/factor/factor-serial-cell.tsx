import {Factor} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {FactorSerialCellContainer} from './widgets';

export const FactorSerialCell = (props: { topic: Topic, factor: Factor }) => {
	const {topic, factor} = props;

	const index = topic.factors.indexOf(factor) + 1;

	return <FactorSerialCellContainer>{index}</FactorSerialCellContainer>;
};