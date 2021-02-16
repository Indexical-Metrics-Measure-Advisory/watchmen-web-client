import React from 'react';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnitAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { isExistsAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import { PipelineStageUnit } from '../../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { useActionType } from '../action-effect/use-action-type';
import { FindByCondition } from '../find-by';
import { TopicPicker } from '../topic-picker';
import { VariableName } from '../variable-name';
import { ActionLeadLabelThin } from '../widgets';

export const TopicRowExists = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const { action, topics, topic } = props;

	useActionType(action);

	if (!isExistsAction(action)) {
		return null;
	}

	return <>
		<ActionLeadLabelThin>Variable Name:</ActionLeadLabelThin>
		<VariableName action={action}/>
		<ActionLeadLabelThin>Topic:</ActionLeadLabelThin>
		<TopicPicker action={action} topics={topics}/>
		<ActionLeadLabelThin>By:</ActionLeadLabelThin>
		<FindByCondition action={action} topics={topics} topic={topic}/>
	</>;
};