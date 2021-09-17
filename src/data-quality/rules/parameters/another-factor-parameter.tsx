import {MonitorRuleParameters} from '@/services/data/data-quality/rule-types';
import {Factor} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';

export const AnotherFactorParameter = (props: { params: MonitorRuleParameters, topic?: Topic, factor?: Factor }) => {
	const {params, topic, factor} = props;

	const forceUpdate = useForceUpdate();
	const onChanged = (option: DropdownOption) => {
		params.factorId = option.value;
		forceUpdate();
	};

	const options = (topic?.factors || []).filter(f => f !== factor).map(factor => {
		return {label: factor.name || 'Noname Factor', value: factor.factorId};
	});

	return <Dropdown options={options}
	                 value={params.factorId}
	                 onChange={onChanged}/>;
};
