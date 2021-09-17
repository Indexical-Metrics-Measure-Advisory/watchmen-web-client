import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {PipelineStageUnitAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {Alarm} from '../alarm';
import {CopyToMemory} from '../copy-to-memory';
import {InsertRow} from '../insert-row';
import {MergeRow} from '../merge-row';
import {ReadFactor} from '../read-factor';
import {ReadFactors} from '../read-factors';
import {ReadRow} from '../read-row';
import {ReadRows} from '../read-rows';
import {TopicRowExists} from '../topic-row-exists';
import {WriteFactor} from '../write-factor';
import {ActionBodyContainer} from './widgets';

export const ActionBody = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const {pipeline, stage, unit, action, topics, topic} = props;

	return <ActionBodyContainer>
		<Alarm pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<CopyToMemory pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<TopicRowExists pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<ReadRow pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<ReadRows pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<ReadFactor pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<ReadFactors pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<WriteFactor pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<InsertRow pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<MergeRow pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
	</ActionBodyContainer>;
};