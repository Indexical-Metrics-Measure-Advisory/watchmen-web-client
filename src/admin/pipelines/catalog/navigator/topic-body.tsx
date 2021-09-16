import React from 'react';
import {Topic} from '@/services/tuples/topic-types';
import {FactorRow} from './factor-row';
import {NoFactor, TopicBodyContainer} from './topic-widgets';

export const TopicBody = (props: { topic: Topic, visible: boolean }) => {
	const {topic, visible} = props;

	const factors = topic.factors;
	const hasFactor = factors.length !== 0;

	return <TopicBodyContainer visible={visible}>
		{hasFactor
			? factors.map(factor => {
				return <FactorRow topic={topic} factor={factor} key={factor.factorId}/>;
			})
			: <NoFactor>No factor defined.</NoFactor>
		}
	</TopicBodyContainer>;
};