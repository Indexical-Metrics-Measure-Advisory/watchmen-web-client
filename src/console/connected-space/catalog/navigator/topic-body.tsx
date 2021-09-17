import {Topic} from '@/services/data/tuples/topic-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {FactorRow} from './factor-row';
import {NoFactor, TopicBodyContainer} from './topic-widgets';

export const TopicBody = (props: { topic: Topic }) => {
	const {topic} = props;

	const factors = topic.factors;
	const hasFactor = factors.length !== 0;

	return <TopicBodyContainer>
		{hasFactor
			? factors.map(factor => {
				return <FactorRow topic={topic} factor={factor} key={factor.factorId}/>;
			})
			: <NoFactor>{Lang.CONSOLE.CONNECTED_SPACE.TOPIC_WITH_NO_FACTOR}</NoFactor>
		}
	</TopicBodyContainer>;
};