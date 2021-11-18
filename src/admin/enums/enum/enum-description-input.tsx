import {Enum} from '@/services/data/tuples/enum-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyInputLines} from '@/widgets/tuple-workbench/tuple-editor';
import React, {ChangeEvent} from 'react';
import {useEnumEventBus} from '../enum-event-bus';
import {EnumEventTypes} from '../enum-event-bus-types';

export const EnumDescriptionInput = (props: { enumeration: Enum }) => {
	const {enumeration} = props;

	const {fire} = useEnumEventBus();
	const forceUpdate = useForceUpdate();

	const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		if (enumeration.description !== event.target.value) {
			enumeration.description = event.target.value;
			fire(EnumEventTypes.ENUM_DESCRIPTION_CHANGED, enumeration);
			forceUpdate();
		}
	};

	return <TuplePropertyInputLines value={enumeration.description || ''} onChange={onDescriptionChange}/>;
};