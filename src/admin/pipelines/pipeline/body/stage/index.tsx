import React from 'react';
import { PipelineStage } from '../../../../../services/tuples/pipeline-stage-types';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { StageBody } from './body';
import { StageFooter } from './footer';
import { StageHeader } from './header';
import { StagePrerequisite } from './prerequisite';
import { Units } from './units';
import { StageContainer } from './widgets';

export const StageEditor = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const { pipeline, stage, topics, topic } = props;

	return <StageContainer>
		<StageHeader pipeline={pipeline} stage={stage}/>
		<StageBody>
			<StagePrerequisite stage={stage} topic={topic}/>
			<Units pipeline={pipeline} stage={stage} topics={topics} topic={topic}/>
			<StageFooter pipeline={pipeline} stage={stage}/>
		</StageBody>
	</StageContainer>;
};