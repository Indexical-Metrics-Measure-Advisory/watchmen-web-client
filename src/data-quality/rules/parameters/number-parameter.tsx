import {MonitorRuleParameters} from '@/services/data/data-quality/rule-types';
import React, {ChangeEvent, useState} from 'react';
import {MonitorRuleParameterType} from '../../rule-defs';
import {NumberInput} from './widgets';

const getValue = (params: MonitorRuleParameters, propName: 'length' | 'max' | 'min'): number | null => {
	return params[propName] ?? null;
};
const getDisplayValue = (value: number | null): string => {
	if (value == null) {
		return '';
	} else {
		return `${value}`;
	}
};

export const NumberParameter = (props: { params: MonitorRuleParameters, parameter: MonitorRuleParameterType }) => {
	const {params, parameter} = props;

	let propName: 'length' | 'max' | 'min';
	switch (parameter) {
		case MonitorRuleParameterType.MAX_NUMBER:
		case MonitorRuleParameterType.MAX_LENGTH:
			propName = 'max';
			break;
		case MonitorRuleParameterType.MIN_NUMBER:
		case MonitorRuleParameterType.MIN_LENGTH:
			propName = 'min';
			break;
		case MonitorRuleParameterType.LENGTH:
			propName = 'length';
			break;
		default:
			throw new Error(`Parameter[${parameter}] not supported.`);
	}

	const [displayValue, setDisplayValue] = useState(getDisplayValue(getValue(params, propName)));
	const onChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value: displayValue} = event.target;
		setDisplayValue(displayValue);
		if (displayValue == null || displayValue.trim().length === 0) {
			delete params[propName];
		} else {
			try {
				params[propName] = Number(displayValue);
			} catch {
				delete params[propName];
			}
		}
	};

	return <NumberInput value={displayValue} placeholder="Number here..."
	                    onChange={onChanged}/>;
};
