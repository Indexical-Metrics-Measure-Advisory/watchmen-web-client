import {MonitorRule} from '../../../services/data-quality/rules';
import {RuleParameterType} from '../utils';
import React from 'react';
import {StatisticalIntervalParameter} from './statistical-interval-parameter';
import {PercentageParameter} from './percentage-parameter';
import {NumberParameter} from './number-parameter';

export const RuleParameter = (props: { rule: MonitorRule, parameter: RuleParameterType }) => {
	const {rule, parameter} = props;

	if (parameter === RuleParameterType.TOPIC) {
		return null;
	} else if (parameter === RuleParameterType.FACTOR) {
		return null;
	} else if (parameter === RuleParameterType.STATISTICAL_INTERVAL) {
		return <StatisticalIntervalParameter rule={rule}/>;
	} else if ([RuleParameterType.COVERAGE_RATE, RuleParameterType.QUANTILE, RuleParameterType.AGGREGATION].includes(parameter)) {
		return <PercentageParameter rule={rule} parameter={parameter}/>;
	} else if (parameter === RuleParameterType.REGEXP) {
		return null;
	} else if (parameter === RuleParameterType.COMPARE_OPERATOR) {
		return null;
	} else if ([
		RuleParameterType.LENGTH, RuleParameterType.MIN_LENGTH, RuleParameterType.MAX_LENGTH,
		RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER
	].includes(parameter)) {
		return <NumberParameter rule={rule} parameter={parameter}/>;
	} else {
		return null;
	}
};
