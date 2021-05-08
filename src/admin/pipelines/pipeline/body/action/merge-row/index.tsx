import React from 'react';
import {PipelineStage} from '../../../../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnitAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isMergeRowAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {PipelineStageUnit} from '../../../../../../services/tuples/pipeline-stage-unit-types';
import {Pipeline} from '../../../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {useActionType} from '../action-effect/use-action-type';
import {FactorsMapping} from '../factors-mapping';
import {FindByCondition} from '../find-by';
import {TopicPicker} from '../topic-picker';
import {ActionLeadLabelThin} from '../widgets';

export const MergeRow = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const {action, topics, topic} = props;

	useActionType(action);

	if (!isMergeRowAction(action)) {
		return null;
	}

	return <>
		<ActionLeadLabelThin>Target Topic:</ActionLeadLabelThin>
		<TopicPicker action={action} topics={topics}/>
		<ActionLeadLabelThin>Use Mapping:</ActionLeadLabelThin>
		<FactorsMapping action={action} topics={topics} topic={topic}/>
		<ActionLeadLabelThin>By:</ActionLeadLabelThin>
		<FindByCondition action={action} topics={topics} topic={topic}/>
	</>;
};