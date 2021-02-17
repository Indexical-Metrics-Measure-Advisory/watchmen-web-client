import React from 'react';
import { PipelineStageUnitAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { isCopyToMemoryAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { PropName, VariableName } from '../dsl-widgets';
import { ParameterLines } from '../parameter';

export const CopyToMemory = (props: { action: PipelineStageUnitAction, topicsMap: Map<string, Topic> }) => {
	const { action, topicsMap } = props;

	if (!isCopyToMemoryAction(action)) {
		return null;
	}

	return <>
		<PropName indent={7}>variable-name</PropName>
		<VariableName>{action.variableName}</VariableName>
		<PropName indent={7}>source</PropName>
		<ParameterLines parameter={action.source} topicsMap={topicsMap} indent={8}/>
	</>;
};