import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {
	isWriteToExternalAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
// noinspection ES6PreferShortImport
import {useExternalWriters} from '../../../cache/use-external-writers';
import {ExternalWriterName, PropName} from '../dsl-widgets';

export const WriteToExternal = (props: { action: PipelineStageUnitAction, topicsMap: Map<string, Topic> }) => {
	const {action} = props;

	const [externalWriters] = useExternalWriters();

	if (!isWriteToExternalAction(action)) {
		return null;
	}

	// eslint-disable-next-line
	const writer = externalWriters.find(writer => writer.writerId == action.externalWriterId);

	return <>
		<PropName indent={7}>adapter</PropName>
		<ExternalWriterName>{writer?.writerCode}</ExternalWriterName>
	</>;
};