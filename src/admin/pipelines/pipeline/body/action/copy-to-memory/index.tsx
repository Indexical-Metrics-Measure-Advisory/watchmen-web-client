import React from 'react';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnitAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { isCopyToMemoryAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import { PipelineStageUnit } from '../../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { useActionType } from '../action-effect/use-action-type';
import { SingleParameter } from '../single-parameter';
import { VariableName } from '../variable-name';
import { ActionLeadLabelThin } from '../widgets';

export const CopyToMemory = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const { action, topic } = props;

	useActionType(action);

	if (!isCopyToMemoryAction(action)) {
		return null;
	}

	return <>
		<ActionLeadLabelThin>Variable Name:</ActionLeadLabelThin>
		<VariableName action={action}/>
		<ActionLeadLabelThin>Value From:</ActionLeadLabelThin>
		<SingleParameter action={action} parameter={action.source} topics={[ topic ]}/>
	</>;
};