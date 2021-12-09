import {Parameter, ValueTypes} from '@/services/data/tuples/factor-calculator-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ParameterEventBusProvider} from '@/widgets/parameter/parameter-event-bus';
import React from 'react';
import {ComputedEditor} from '../../parameter/computed';
import {ConstantEditor} from '../../parameter/constant';
import {ParameterFromEditor} from '../../parameter/param-from';
import {TopicFactorEditor} from '../../parameter/topic-factor';
import {Parameter2ActionBridge} from './parameter-2-action-bridge';
import {SingleParameterContainer} from './widgets';

export const SingleParameter = (props: {
	action: PipelineStageUnitAction;
	parameter: Parameter;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
}) => {
	const {action, parameter, topics, expectedTypes} = props;

	return <ParameterEventBusProvider>
		<Parameter2ActionBridge action={action}/>
		<SingleParameterContainer>
			<ParameterFromEditor parameter={parameter}/>
			<TopicFactorEditor parameter={parameter} topics={topics} expectedTypes={expectedTypes}/>
			<ConstantEditor parameter={parameter} expectedTypes={expectedTypes} expectArray={false}/>
			<ComputedEditor parameter={parameter} topics={topics} expectedTypes={expectedTypes} expectArray={false}/>
		</SingleParameterContainer>
	</ParameterEventBusProvider>;
};