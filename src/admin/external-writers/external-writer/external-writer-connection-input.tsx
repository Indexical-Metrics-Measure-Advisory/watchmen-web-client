import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyInput} from '@/widgets/tuple-workbench/tuple-editor';
import React, {ChangeEvent} from 'react';
import {useExternalWriterEventBus} from '../external-writer-event-bus';
import {ExternalWriterEventTypes} from '../external-writer-event-bus-types';

export const ExternalWriterConnectInput = (props: { writer: ExternalWriter, propName: 'url' | 'pat' }) => {
	const {writer, propName} = props;

	const {fire} = useExternalWriterEventBus();
	const forceUpdate = useForceUpdate();
	const onCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (writer[propName] !== event.target.value) {
			writer[propName] = event.target.value;
			fire(ExternalWriterEventTypes.EXTERNAL_WRITER_CONNECT_PROP_CHANGED, writer);
			forceUpdate();
		}
	};

	return <TuplePropertyInput value={writer[propName] || ''} onChange={onCodeChange}/>;
};