import {ParameterEventBusProvider} from '@/data-filter/parameter-event-bus';
import {ParameterKind, ValueTypes} from '@/services/tuples/factor-calculator-types';
import {FromFactor, ToFactor} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Topic} from '@/services/tuples/topic-types';
import React from 'react';
import {TopicFactorEditor} from '../../parameter/topic-factor';
import {Parameter2ActionBridge} from './parameter-2-action-bridge';
import {TopicFactorFinderContainer} from './widgets';

export const TopicFactorPicker = (props: {
	action: FromFactor | ToFactor;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
}) => {
	const {action, topics, expectedTypes} = props;
	const {topicId, factorId} = action;

	const parameter = {kind: ParameterKind.TOPIC, topicId, factorId};

	return <ParameterEventBusProvider>
		<Parameter2ActionBridge action={action}/>
		<TopicFactorFinderContainer>
			<TopicFactorEditor parameter={parameter} topics={topics} expectedTypes={expectedTypes}/>
		</TopicFactorFinderContainer>
	</ParameterEventBusProvider>;
};