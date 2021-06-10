import {MonitorRule} from '../../../services/data-quality/rules';
import React, {ChangeEvent, useState} from 'react';
import {RuleParameterType} from '../utils';
import {NumberInput} from './widgets';

const getValue = (rule: MonitorRule, propName: 'length' | 'max' | 'min'): number | null => {
	return (rule.params || {[propName]: (void 0)})[propName] ?? null;
};
const getDisplayValue = (value: number | null): string => {
	if (value == null) {
		return '';
	} else {
		return `${value}`;
	}
};

export const NumberParameter = (props: { rule: MonitorRule, parameter: RuleParameterType }) => {
	const {rule, parameter} = props;

	let propName: 'length' | 'max' | 'min';
	switch (parameter) {
		case RuleParameterType.MAX_NUMBER:
		case RuleParameterType.MAX_LENGTH:
			propName = 'max';
			break;
		case RuleParameterType.MIN_NUMBER:
		case RuleParameterType.MIN_LENGTH:
			propName = 'min';
			break;
		case RuleParameterType.LENGTH:
			propName = 'length';
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

	return <NumberInput value={displayValue} placeholder="numeric value here..."
	                    onChange={onChanged}/>;
};
