import {MonitorRule} from '../../../services/data-quality/rules';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {DropdownOption} from '../../../basic-widgets/types';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React from 'react';
import {Topic} from '../../../services/tuples/topic-types';
import {Factor} from '../../../services/tuples/factor-types';

export const AnotherFactorParameter = (props: { rule: MonitorRule, topic?: Topic, factor?: Factor }) => {
	const {rule, topic, factor} = props;

	const forceUpdate = useForceUpdate();
	const onChanged = (option: DropdownOption) => {
		rule.params = (rule.params || {});
		rule.params.factorId = option.value;
		forceUpdate();
	};

	const options = (topic?.factors || []).filter(f => f !== factor).map(factor => {
		return {label: factor.name || 'Noname Factor', value: factor.factorId};
	});

	return <Dropdown options={options}
	                 value={(rule.params || {}).factorId}
	                 onChange={onChanged}/>;
};
