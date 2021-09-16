import React from 'react';
import {TopicGradeRules} from './topic-grade-rules';
import {Topic} from '@/services/tuples/topic-types';
import {FactorGradeRules} from './factor-grade-rules';
import {MonitorRules} from '@/services/data-quality/rule-types';

export const TopicRules = (props: { topic: Topic; rules: MonitorRules }) => {
	const {topic, rules} = props;

	return <>
		<TopicGradeRules topic={topic} rules={rules}/>
		<FactorGradeRules topic={topic} rules={rules}/>
	</>;
};