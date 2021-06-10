import {MonitorRule} from '../../../services/data-quality/rules';
import {RuleParameterType} from '../utils';
import React from 'react';
import {StatisticalIntervalParameter} from './statistical-interval-parameter';
import {PercentageParameter} from './percentage-parameter';
import {NumberParameter} from './number-parameter';
import {RegexpParameter} from './regexp-parameter';
import {CompareOperatorParameter} from './compare-operator-parameter';
import {Topic} from '../../../services/tuples/topic-types';
import {Factor} from '../../../services/tuples/factor-types';
import {AnotherTopicParameter} from './another-topic-parameter';
import {AnotherFactorParameter} from './another-factor-parameter';

export const RuleParameter = (props: {
	rule: MonitorRule;
	parameter: RuleParameterType;
	topic?: Topic;
	factor?: Factor;
	topics: Array<Topic>;
}) => {
	const {rule, parameter, topic, factor, topics} = props;

	if (parameter === RuleParameterType.TOPIC) {
		return <AnotherTopicParameter rule={rule} currentTopic={topic} topics={topics}/>;
	} else if (parameter === RuleParameterType.FACTOR) {
		return <AnotherFactorParameter rule={rule} topic={topic} factor={factor}/>;
	} else if (parameter === RuleParameterType.STATISTICAL_INTERVAL) {
		return <StatisticalIntervalParameter rule={rule}/>;
	} else if ([RuleParameterType.COVERAGE_RATE, RuleParameterType.QUANTILE, RuleParameterType.AGGREGATION].includes(parameter)) {
		return <PercentageParameter rule={rule} parameter={parameter}/>;
	} else if (parameter === RuleParameterType.REGEXP) {
		return <RegexpParameter rule={rule}/>;
	} else if (parameter === RuleParameterType.COMPARE_OPERATOR) {
		return <CompareOperatorParameter rule={rule}/>;
	} else if ([
		RuleParameterType.LENGTH, RuleParameterType.MIN_LENGTH, RuleParameterType.MAX_LENGTH,
		RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER
	].includes(parameter)) {
		return <NumberParameter rule={rule} parameter={parameter}/>;
	} else {
		return null;
	}
};
