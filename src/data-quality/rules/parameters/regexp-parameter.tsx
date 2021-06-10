import {MonitorRule} from '../../../services/data-quality/rules';
import React, {ChangeEvent} from 'react';
import {NumberInput} from './widgets';

export const RegexpParameter = (props: { rule: MonitorRule }) => {
	const {rule} = props;

	const onChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		rule.params = (rule.params || {});
		if (value == null || value.trim().length === 0) {
			delete rule.params.regexp;
		} else {
			rule.params.regexp = value;
		}
	};

	return <NumberInput value={(rule.params || {}).regexp} placeholder="Regexp here..."
	                    onChange={onChanged}/>;
};
