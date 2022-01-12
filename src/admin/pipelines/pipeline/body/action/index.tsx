import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {VariablesEventBusProvider} from '../variables/variables-event-bus';
import {VariablesHelper} from '../variables/variables-helper';
import {ActionTypeEditor} from './action-type';
import {ActionBody} from './body';
import {Operators} from './operators';
import {ActionContainer, ActionFooterLeadLabel, ActionLeadLabel} from './widgets';

export const ActionEditor = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	triggerTopic: Topic;
}) => {
	const {pipeline, stage, unit, action, topics, triggerTopic} = props;

	const stageIndex = pipeline.stages.indexOf(stage) + 1;
	const unitIndex = stage.units.indexOf(unit) + 1;
	const actionIndex = unit.do.indexOf(action) + 1;

	return <ActionContainer>
		<VariablesEventBusProvider>
			<VariablesHelper pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics}/>
			<Operators action={action} unit={unit}/>
			<ActionLeadLabel>Action #{stageIndex}.{unitIndex}.{actionIndex}:</ActionLeadLabel>
			<ActionTypeEditor action={action}/>
			<ActionBody pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics}
			            triggerTopic={triggerTopic}/>
			<ActionFooterLeadLabel>End of Action #{stageIndex}.{unitIndex}.{actionIndex}</ActionFooterLeadLabel>
		</VariablesEventBusProvider>
	</ActionContainer>;
};