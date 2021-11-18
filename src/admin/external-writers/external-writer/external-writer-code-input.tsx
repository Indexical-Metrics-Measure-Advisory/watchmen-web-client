import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyInput} from '@/widgets/tuple-workbench/tuple-editor';
import React, {ChangeEvent} from 'react';
import {useExternalWriterEventBus} from '../external-writer-event-bus';
import {ExternalWriterEventTypes} from '../external-writer-event-bus-types';

export const ExternalWriterCodeInput = (props: { writer: ExternalWriter }) => {
	const {writer} = props;

	const {fire} = useExternalWriterEventBus();
	const forceUpdate = useForceUpdate();
	const onCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (writer.writerCode !== event.target.value) {
			writer.writerCode = event.target.value;
			fire(ExternalWriterEventTypes.EXTERNAL_WRITER_CODE_CHANGED, writer);
			forceUpdate();
		}
	};

	return <TuplePropertyInput value={writer.writerCode || ''} onChange={onCodeChange}/>;
};