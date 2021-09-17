import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {VariablesEventBusProvider} from '../variables/variables-event-bus';
import {VariablesHelper} from '../variables/variables-helper';
import {StageBody} from './body';
import {StageFooter} from './footer';
import {StageHeader} from './header';
import {StagePrerequisite} from './prerequisite';
import {Units} from './units';
import {StageContainer} from './widgets';

export const StageEditor = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const {pipeline, stage, topics, topic} = props;

	return <StageContainer>
		<StageHeader pipeline={pipeline} stage={stage}/>
		<StageBody pipeline={pipeline} stage={stage}>
			<VariablesEventBusProvider>
				<VariablesHelper pipeline={pipeline} stage={stage} topics={[topic]}/>
				<StagePrerequisite stage={stage} topic={topic}/>
				<Units pipeline={pipeline} stage={stage} topics={topics} topic={topic}/>
				<StageFooter pipeline={pipeline} stage={stage}/>
			</VariablesEventBusProvider>
		</StageBody>
	</StageContainer>;
};