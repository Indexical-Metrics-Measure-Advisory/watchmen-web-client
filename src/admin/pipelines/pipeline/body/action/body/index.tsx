import React from 'react';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnitAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { PipelineStageUnit } from '../../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { Alarm } from '../alarm';
import { CopyToMemory } from '../copy-to-memory';
import { InsertRow } from '../insert-row';
import { MergeRow } from '../merge-row';
import { ReadFactor } from '../read-factor';
import { ReadRow } from '../read-row';
import { TopicRowExists } from '../topic-row-exists';
import { WriteFactor } from '../write-factor';
import { ActionBodyContainer } from './widgets';

export const ActionBody = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const { pipeline, stage, unit, action, topics, topic } = props;

	return <ActionBodyContainer>
		<Alarm pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<CopyToMemory pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<TopicRowExists pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<ReadRow pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<ReadFactor pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<WriteFactor pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<InsertRow pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<MergeRow pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
	</ActionBodyContainer>;
};