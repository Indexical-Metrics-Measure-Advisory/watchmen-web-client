import {AnyFactorType} from '@/services/data/tuples/factor-calculator-types';
import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isReadFactorAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {useActionType} from '../action-effect/use-action-type';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';
import {AggregateArithmeticEditor} from '../aggregate-arithmetic';
import {FindByCondition} from '../find-by';
import {TopicFactorPicker} from '../topic-factor-picker';
import {VariableName} from '../variable-name';
import {ActionLeadLabelThin} from '../widgets';

export const ReadFactor = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	triggerTopic: Topic;
}) => {
	const {action, topics, triggerTopic} = props;

	const {fire} = useActionEventBus();
	useActionType(action);

	if (!isReadFactorAction(action)) {
		return null;
	}

	const onArithmeticChanged = () => {
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
	};

	return <>
		<ActionLeadLabelThin>Variable Name:</ActionLeadLabelThin>
		<VariableName action={action}/>
		<ActionLeadLabelThin>Source Topic & Factor:</ActionLeadLabelThin>
		{/* any type can be read and copied to memory variable */}
		<TopicFactorPicker action={action} topics={topics} expectedTypes={[AnyFactorType.ANY]}/>
		<ActionLeadLabelThin>Aggregate:</ActionLeadLabelThin>
		<AggregateArithmeticEditor holder={action} onChange={onArithmeticChanged}/>
		<ActionLeadLabelThin>By:</ActionLeadLabelThin>
		<FindByCondition action={action} topics={topics} topic={triggerTopic}/>
	</>;
};