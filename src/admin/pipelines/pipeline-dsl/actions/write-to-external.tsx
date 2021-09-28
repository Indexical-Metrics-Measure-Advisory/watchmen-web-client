import {PipelineStageUnitAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isWriteToExternalAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {PropName, VariableName} from '../dsl-widgets';

export const WriteToExternal = (props: { action: PipelineStageUnitAction, topicsMap: Map<string, Topic> }) => {
	const {action} = props;

	if (!isWriteToExternalAction(action)) {
		return null;
	}

	return <>
		<PropName indent={7}>adapter</PropName>
		<VariableName>{action.adapter}</VariableName>
	</>;
};