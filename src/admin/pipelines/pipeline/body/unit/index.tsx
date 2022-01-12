import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {VariablesEventBusProvider} from '../variables/variables-event-bus';
import {VariablesHelper} from '../variables/variables-helper';
import {Actions} from './actions';
import {UnitBody} from './body';
import {UnitFooter} from './footer';
import {UnitHeader} from './header';
import {UnitLoopVariableName} from './loop';
import {UnitPrerequisite} from './prerequisite';
import {UnitContainer} from './widgets';

export const UnitEditor = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	topics: Array<Topic>;
	triggerTopic: Topic;
}) => {
	const {pipeline, stage, unit, topics, triggerTopic} = props;

	return <UnitContainer>
		<UnitHeader pipeline={pipeline} stage={stage} unit={unit}/>
		<UnitBody pipeline={pipeline} stage={stage} unit={unit}>
			<VariablesEventBusProvider>
				<VariablesHelper pipeline={pipeline} stage={stage} unit={unit} topics={topics}/>
				<UnitLoopVariableName unit={unit} triggerTopic={triggerTopic}/>
				<UnitPrerequisite unit={unit} triggerTopic={triggerTopic}/>
				<Actions pipeline={pipeline} stage={stage} unit={unit} topics={topics} triggerTopic={triggerTopic}/>
				<UnitFooter pipeline={pipeline} stage={stage} unit={unit}/>
			</VariablesEventBusProvider>
		</UnitBody>
	</UnitContainer>;
};