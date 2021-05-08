import React from 'react';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {Enum} from '../../../services/tuples/enum-types';
import {TuplePropertyInputLines} from '../../widgets/tuple-workbench/tuple-editor';
import {useEnumEventBus} from '../enum-event-bus';
import {EnumEventTypes} from '../enum-event-bus-types';

export const EnumDescriptionInput = (props: { enumeration: Enum }) => {
	const {enumeration} = props;

	const {fire} = useEnumEventBus();
	const forceUpdate = useForceUpdate();

	const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (enumeration.description !== event.target.value) {
			enumeration.description = event.target.value;
			fire(EnumEventTypes.ENUM_DESCRIPTION_CHANGED, enumeration);
			forceUpdate();
		}
	};

	return <TuplePropertyInputLines value={enumeration.description || ''} onChange={onDescriptionChange}/>;
};