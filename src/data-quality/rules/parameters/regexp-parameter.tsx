import {MonitorRuleParameters} from '@/services/data/data-quality/rule-types';
import React, {ChangeEvent} from 'react';
import {NumberInput} from './widgets';

export const RegexpParameter = (props: { params: MonitorRuleParameters }) => {
	const {params} = props;

	const onChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value == null || value.trim().length === 0) {
			delete params.regexp;
		} else {
			params.regexp = value;
		}
	};

	return <NumberInput value={params.regexp} placeholder="Regexp here..."
	                    onChange={onChanged}/>;
};
