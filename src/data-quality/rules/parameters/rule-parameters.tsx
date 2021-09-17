import {MonitorRuleParameters} from '@/services/data/data-quality/rule-types';
import {Factor} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {MonitorRuleParameterType} from '../../rule-defs';
import {AnotherFactorParameter} from './another-factor-parameter';
import {AnotherTopicParameter} from './another-topic-parameter';
import {CompareOperatorParameter} from './compare-operator-parameter';
import {NumberParameter} from './number-parameter';
import {PercentageParameter} from './percentage-parameter';
import {RegexpParameter} from './regexp-parameter';
import {StatisticalIntervalParameter} from './statistical-interval-parameter';

export const RuleParameter = (props: {
	params: MonitorRuleParameters;
	type: MonitorRuleParameterType;
	topic?: Topic;
	factor?: Factor;
	topics: Array<Topic>;
}) => {
	const {params, type, topic, factor, topics} = props;

	if (type === MonitorRuleParameterType.TOPIC) {
		return <AnotherTopicParameter params={params} currentTopic={topic} topics={topics}/>;
	} else if (type === MonitorRuleParameterType.FACTOR) {
		return <AnotherFactorParameter params={params} topic={topic} factor={factor}/>;
	} else if (type === MonitorRuleParameterType.STATISTICAL_INTERVAL) {
		return <StatisticalIntervalParameter params={params}/>;
	} else if ([MonitorRuleParameterType.COVERAGE_RATE, MonitorRuleParameterType.QUANTILE, MonitorRuleParameterType.AGGREGATION].includes(type)) {
		return <PercentageParameter params={params} parameter={type}/>;
	} else if (type === MonitorRuleParameterType.REGEXP) {
		return <RegexpParameter params={params}/>;
	} else if (type === MonitorRuleParameterType.COMPARE_OPERATOR) {
		return <CompareOperatorParameter params={params}/>;
	} else if ([
		MonitorRuleParameterType.LENGTH, MonitorRuleParameterType.MIN_LENGTH, MonitorRuleParameterType.MAX_LENGTH,
		MonitorRuleParameterType.MIN_NUMBER, MonitorRuleParameterType.MAX_NUMBER
	].includes(type)) {
		return <NumberParameter params={params} parameter={type}/>;
	} else {
		return null;
	}
};
