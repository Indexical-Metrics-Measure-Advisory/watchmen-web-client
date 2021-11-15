import {ExternalWriter, ExternalWriterType} from '@/services/data/tuples/external-writer-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyDropdown} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {useExternalWriterEventBus} from '../external-writer-event-bus';
import {ExternalWriterEventTypes} from '../external-writer-event-bus-types';

export const ExternalWriterTypeInput = (props: { writer: ExternalWriter }) => {
	const {writer} = props;

	const {fire} = useExternalWriterEventBus();
	const forceUpdate = useForceUpdate();

	const onTypeChange = (option: DropdownOption) => {
		writer.type = option.value as ExternalWriterType;
		fire(ExternalWriterEventTypes.EXTERNAL_WRITER_TYPE_CHANGED, writer);
		forceUpdate();
	};

	const options: Array<DropdownOption> = [
		{value: ExternalWriterType.STANDARD_WRITER, label: 'Standard Embedded Writer'},
		{value: ExternalWriterType.ELASTIC_SEARCH_WRITER, label: 'Standard Elastic Search Writer'}
	];

	return <TuplePropertyDropdown value={writer.type} options={options} onChange={onTypeChange}/>;
};