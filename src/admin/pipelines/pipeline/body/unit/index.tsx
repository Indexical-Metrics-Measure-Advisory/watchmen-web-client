import React from 'react';
import {PipelineStage} from '../../../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '../../../../../services/tuples/pipeline-stage-unit-types';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../../services/tuples/topic-types';
import {Actions} from './actions';
import {UnitBody} from './body';
import {UnitFooter} from './footer';
import {UnitHeader} from './header';
import {UnitPrerequisite} from './prerequisite';
import {UnitContainer} from './widgets';
import {UnitLoopVariableName} from './loop';
import {VariablesHelper} from '../variables/variables-helper';
import {VariablesEventBusProvider} from '../variables/variables-event-bus';

export const UnitEditor = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const {pipeline, stage, unit, topics, topic} = props;

	return <UnitContainer>
		<UnitHeader pipeline={pipeline} stage={stage} unit={unit}/>
		<UnitBody pipeline={pipeline} stage={stage} unit={unit}>
			<VariablesEventBusProvider>
				<VariablesHelper pipeline={pipeline} stage={stage} unit={unit} topics={[topic]}/>
				<UnitLoopVariableName unit={unit} topic={topic}/>
				<UnitPrerequisite unit={unit} topic={topic}/>
				<Actions pipeline={pipeline} stage={stage} unit={unit} topics={topics} topic={topic}/>
				<UnitFooter pipeline={pipeline} stage={stage} unit={unit}/>
			</VariablesEventBusProvider>
		</UnitBody>
	</UnitContainer>;
};