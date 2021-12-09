import {AnyFactorType} from '@/services/data/tuples/factor-calculator-types';
import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isCopyToMemoryAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {useActionType} from '../action-effect/use-action-type';
import {SingleParameter} from '../single-parameter';
import {VariableName} from '../variable-name';
import {ActionLeadLabelThin} from '../widgets';

export const CopyToMemory = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	triggerTopic: Topic;
}) => {
	const {action, triggerTopic} = props;

	useActionType(action);

	if (!isCopyToMemoryAction(action)) {
		return null;
	}

	return <>
		<ActionLeadLabelThin>Variable Name:</ActionLeadLabelThin>
		<VariableName action={action}/>
		<ActionLeadLabelThin>Value From:</ActionLeadLabelThin>
		{/* any type can be copied to memory variable */}
		<SingleParameter action={action} parameter={action.source} topics={[triggerTopic]}
		                 expectedTypes={[AnyFactorType.ANY]}/>
	</>;
};