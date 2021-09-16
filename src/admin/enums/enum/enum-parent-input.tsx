import React from 'react';
import {DropdownOption} from '@/basic-widgets/types';
import {useForceUpdate} from '@/basic-widgets/utils';
import {Enum} from '@/services/tuples/enum-types';
import {QueryEnumForHolder} from '@/services/tuples/query-enum-types';
import {TuplePropertyDropdown} from '../../widgets/tuple-workbench/tuple-editor';
import {useEnumEventBus} from '../enum-event-bus';
import {EnumEventTypes} from '../enum-event-bus-types';

export const EnumParentInput = (props: { enumeration: Enum, parents: Array<QueryEnumForHolder> }) => {
	const {enumeration, parents} = props;

	const {fire} = useEnumEventBus();
	const forceUpdate = useForceUpdate();

	const onTypeChange = (option: DropdownOption) => {
		enumeration.parentEnumId = option.value as string;
		if (!enumeration.parentEnumId) {
			delete enumeration.parentEnumId;
		}
		fire(EnumEventTypes.ENUM_PARENT_CHANGED, enumeration);
		forceUpdate();
	};

	const options: Array<DropdownOption> = parents.map(candidate => {
		return {value: candidate.enumId, label: candidate.name};
	});
	options.unshift({value: '', label: 'No Parent'} as DropdownOption);

	return <TuplePropertyDropdown value={enumeration.parentEnumId} options={options} onChange={onTypeChange}/>;
};