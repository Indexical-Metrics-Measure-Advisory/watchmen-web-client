import React from 'react';
import {ParameterKind} from '../../../../../../services/tuples/factor-calculator-types';
import {
	FromFactor,
	ToFactor
} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {ParameterEventBusProvider} from '../../parameter/parameter/parameter-event-bus';
import {TopicFactorEditor} from '../../parameter/topic-factor';
import {Parameter2ActionBridge} from './parameter-2-action-bridge';
import {TopicFactorFinderContainer} from './widgets';

export const TopicFactorPicker = (props: { action: FromFactor | ToFactor, topics: Array<Topic> }) => {
	const {action, topics} = props;
	const {topicId, factorId} = action;

	const parameter = {kind: ParameterKind.TOPIC, topicId, factorId};

	return <ParameterEventBusProvider>
		<Parameter2ActionBridge action={action}/>
		<TopicFactorFinderContainer>
			<TopicFactorEditor parameter={parameter} topics={topics}/>
		</TopicFactorFinderContainer>
	</ParameterEventBusProvider>;
};