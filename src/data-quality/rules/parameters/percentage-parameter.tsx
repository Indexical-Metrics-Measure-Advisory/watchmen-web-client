import {MonitorRuleParameters} from '@/services/data/data-quality/rule-types';
import {ICON_PERCENTAGE} from '@/widgets/basic/constants';
import {Input} from '@/widgets/basic/input';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ChangeEvent, useState} from 'react';
import {MonitorRuleParameterType} from '../../rule-defs';
import {PercentageContainer} from './widgets';

const getValue = (params: MonitorRuleParameters, propName: 'coverageRate' | 'aggregation' | 'quantile'): number | null => {
	return params[propName] ?? null;
};
const getDisplayValue = (value: number | null): string => {
	if (value == null) {
		return '';
	} else {
		return `${value}`;
	}
};
export const PercentageParameter = (props: { params: MonitorRuleParameters, parameter: MonitorRuleParameterType }) => {
	const {params, parameter} = props;

	let propName: 'coverageRate' | 'aggregation' | 'quantile';
	switch (parameter) {
		case MonitorRuleParameterType.COVERAGE_RATE:
			propName = 'coverageRate';
			break;
		case MonitorRuleParameterType.AGGREGATION:
			propName = 'aggregation';
			break;
		case MonitorRuleParameterType.QUANTILE:
			propName = 'quantile';
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

	return <PercentageContainer>
		<Input value={displayValue} placeholder="20% - 80% is recommended"
		       onChange={onChanged}/>
		<FontAwesomeIcon icon={ICON_PERCENTAGE}/>
	</PercentageContainer>;
};
