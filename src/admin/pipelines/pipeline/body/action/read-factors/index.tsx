import React from 'react';
import {PipelineStage} from '../../../../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnitAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isReadFactorsAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {PipelineStageUnit} from '../../../../../../services/tuples/pipeline-stage-unit-types';
import {Pipeline} from '../../../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {useActionType} from '../action-effect/use-action-type';
import {FindByCondition} from '../find-by';
import {TopicFactorPicker} from '../topic-factor-picker';
import {VariableName} from '../variable-name';
import {ActionLeadLabelThin} from '../widgets';
import {AnyFactorType} from '../../../../../../services/tuples/factor-calculator-types';

export const ReadFactors = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const {action, topics, topic} = props;

	useActionType(action);

	if (!isReadFactorsAction(action)) {
		return null;
	}

	return <>
		<ActionLeadLabelThin>Variable Name:</ActionLeadLabelThin>
		<VariableName action={action}/>
		<ActionLeadLabelThin>Source Topic & Factor:</ActionLeadLabelThin>
		{/* any type can be read and copied to memory variable */}
		<TopicFactorPicker action={action} topics={topics} expectedTypes={[AnyFactorType.ANY]}/>
		<ActionLeadLabelThin>By:</ActionLeadLabelThin>
		<FindByCondition action={action} topics={topics} topic={topic}/>
	</>;
};