import React from 'react';
import {Parameter, ValueTypes} from '../../../../../../services/tuples/factor-calculator-types';
import {PipelineStageUnitAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {ComputedEditor} from '../../parameter/compute';
import {ConstantEditor} from '../../parameter/constant';
import {ParameterFromEditor} from '../../parameter/param-from';
import {ParameterEventBusProvider} from '../../parameter/parameter/parameter-event-bus';
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
			<ConstantEditor parameter={parameter} expectedTypes={expectedTypes}/>
			<ComputedEditor parameter={parameter} topics={topics} expectedTypes={expectedTypes}/>
		</SingleParameterContainer>
	</ParameterEventBusProvider>;
};