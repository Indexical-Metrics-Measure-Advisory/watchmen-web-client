import React from 'react';
import {useForceUpdate} from '@/basic-widgets/utils';
import {Enum} from '@/services/tuples/enum-types';
import {TuplePropertyInput} from '../../widgets/tuple-workbench/tuple-editor';
import {useEnumEventBus} from '../enum-event-bus';
import {EnumEventTypes} from '../enum-event-bus-types';

export const EnumNameInput = (props: { enumeration: Enum }) => {
	const {enumeration} = props;

	const {fire} = useEnumEventBus();
	const forceUpdate = useForceUpdate();
	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (enumeration.name !== event.target.value) {
			enumeration.name = event.target.value;
			fire(EnumEventTypes.ENUM_NAME_CHANGED, enumeration);
			forceUpdate();
		}
	};

	return <TuplePropertyInput value={enumeration.name || ''} onChange={onNameChange}/>;
};