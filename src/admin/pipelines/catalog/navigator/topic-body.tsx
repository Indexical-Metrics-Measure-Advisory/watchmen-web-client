import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {FactorRow} from './factor-row';
import {NoFactor, TopicBodyContainer} from './topic-widgets';

export const TopicBody = (props: { topic: Topic, visible: boolean }) => {
	const {topic, visible} = props;

	const factors = topic.factors;
	const hasFactor = factors.length !== 0;

	return <TopicBodyContainer visible={visible}>
		{hasFactor
			? [...factors].sort((f1, f2) => {
				return (f1.label || f1.name || '').localeCompare(f2.label || f2.name || '', void 0, {
					sensitivity: 'base',
					caseFirst: 'upper'
				});
			}).map(factor => {
				return <FactorRow topic={topic} factor={factor} key={factor.factorId}/>;
			})
			: <NoFactor>No factor defined.</NoFactor>
		}
	</TopicBodyContainer>;
};