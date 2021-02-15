import React from 'react';
import { PipelineStage } from '../../../../../services/tuples/pipeline-stage-types';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { StageBody } from './body';
import { StageHeader } from './header';
import { Prerequisite } from './prerequisite';
import { StageEventBusProvider } from './stage-event-bus';
import { StageContainer } from './widgets';

export const StageEditor = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	topic: Topic;
}) => {
	const { pipeline, stage, topic } = props;

	return <StageEventBusProvider>
		<StageContainer>
			<StageHeader pipeline={pipeline} stage={stage}/>
			<StageBody>
				<Prerequisite stage={stage} topic={topic}/>
			</StageBody>
		</StageContainer>
	</StageEventBusProvider>;
};