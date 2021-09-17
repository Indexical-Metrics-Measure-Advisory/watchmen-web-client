import {MonitorRules} from '@/services/data/data-quality/rule-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {FactorGradeRules} from './factor-grade-rules';
import {TopicGradeRules} from './topic-grade-rules';

export const TopicRules = (props: { topic: Topic; rules: MonitorRules }) => {
	const {topic, rules} = props;

	return <>
		<TopicGradeRules topic={topic} rules={rules}/>
		<FactorGradeRules topic={topic} rules={rules}/>
	</>;
};