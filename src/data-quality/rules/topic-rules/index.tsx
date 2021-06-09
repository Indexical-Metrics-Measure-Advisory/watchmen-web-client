import React from 'react';
import {MonitorRules} from '../../../services/data-quality/rules';
import {TopicGradeRules} from './topic-grade-rules';
import {Topic} from '../../../services/tuples/topic-types';
import {FactorGradeRules} from './factor-grade-rules';

export const TopicRules = (props: { topic: Topic; rules: MonitorRules }) => {
	const {topic, rules} = props;

	return <>
		<TopicGradeRules topic={topic} rules={rules}/>
		<FactorGradeRules topic={topic} rules={rules}/>
	</>;
};