import {MonitorRule} from '../../../services/data-quality/rules';
import React, {ChangeEvent, useState} from 'react';
import {PercentageContainer} from './widgets';
import {RuleParameterType} from '../utils';
import {Input} from '../../../basic-widgets/input';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_PERCENTAGE} from '../../../basic-widgets/constants';

const getValue = (rule: MonitorRule, propName: 'coverageRate' | 'aggregation' | 'quantile'): number | null => {
	return (rule.params || {[propName]: (void 0)})[propName] ?? null;
};
const getDisplayValue = (value: number | null): string => {
	if (value == null) {
		return '';
	} else {
		return `${value}`;
	}
};
export const PercentageParameter = (props: { rule: MonitorRule, parameter: RuleParameterType }) => {
	const {rule, parameter} = props;

	let propName: 'coverageRate' | 'aggregation' | 'quantile';
	switch (parameter) {
		case RuleParameterType.COVERAGE_RATE:
			propName = 'coverageRate';
			break;
		case RuleParameterType.AGGREGATION:
			propName = 'aggregation';
			break;
		case RuleParameterType.QUANTILE:
			propName = 'quantile';
			break;
		default:
			throw new Error(`Parameter[${parameter}] not supported.`);
	}

	const [displayValue, setDisplayValue] = useState(getDisplayValue(getValue(rule, propName)));
	const onChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value: displayValue} = event.target;
		setDisplayValue(displayValue);
		rule.params = (rule.params || {});
		if (displayValue == null || displayValue.trim().length === 0) {
			delete rule.params[propName];
		} else {
			try {
				rule.params[propName] = Number(displayValue);
			} catch {
				delete rule.params[propName];
			}
		}
	};

	return <PercentageContainer>
		<Input value={displayValue} placeholder='20% - 80% is recommended'
		       onChange={onChanged}/>
		<FontAwesomeIcon icon={ICON_PERCENTAGE}/>
	</PercentageContainer>;
};
