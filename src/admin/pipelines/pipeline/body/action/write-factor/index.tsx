import React from 'react';
import {PipelineStage} from '@/services/tuples/pipeline-stage-types';
import {PipelineStageUnitAction} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isWriteFactorAction} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {PipelineStageUnit} from '@/services/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/tuples/pipeline-types';
import {Topic} from '@/services/tuples/topic-types';
import {useActionType} from '../action-effect/use-action-type';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';
import {AggregateArithmeticEditor} from '../aggregate-arithmetic';
import {FindByCondition} from '../find-by';
import {SingleParameter} from '../single-parameter';
import {TopicFactorPicker} from '../topic-factor-picker';
import {ActionLeadLabelThin} from '../widgets';
import {AnyFactorType} from '@/services/tuples/factor-calculator-types';

export const WriteFactor = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const {action, topics, topic} = props;

	const {fire} = useActionEventBus();
	useActionType(action);

	if (!isWriteFactorAction(action)) {
		return null;
	}

	const onArithmeticChanged = () => {
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
	};

	return <>
		<ActionLeadLabelThin>Value From:</ActionLeadLabelThin>
		{/*TODO expected types of source parameter and target factor should be matched */}
		{/* assume any type is valid now */}
		<SingleParameter action={action} parameter={action.source} topics={[topic]}
		                 expectedTypes={[AnyFactorType.ANY]}/>
		<ActionLeadLabelThin>Write As:</ActionLeadLabelThin>
		<AggregateArithmeticEditor holder={action} onChange={onArithmeticChanged}/>
		<ActionLeadLabelThin>Target Topic & Factor:</ActionLeadLabelThin>
		{/* any type is valid here, factor has high priority here */}
		<TopicFactorPicker action={action} topics={topics} expectedTypes={[AnyFactorType.ANY]}/>
		<ActionLeadLabelThin>By:</ActionLeadLabelThin>
		<FindByCondition action={action} topics={topics} topic={topic}/>
	</>;
};