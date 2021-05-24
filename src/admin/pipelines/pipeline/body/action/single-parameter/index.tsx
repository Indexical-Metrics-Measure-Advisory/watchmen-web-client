import React from 'react';
import {Parameter, ValidFactorType} from '../../../../../../services/tuples/factor-calculator-types';
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
	validTypes: Array<ValidFactorType>;
}) => {
	const {action, parameter, topics, validTypes} = props;

	return <ParameterEventBusProvider>
		<Parameter2ActionBridge action={action}/>
		<SingleParameterContainer>
			<ParameterFromEditor parameter={parameter}/>
			<TopicFactorEditor parameter={parameter} topics={topics} validTypes={validTypes}/>
			<ConstantEditor parameter={parameter} validTypes={validTypes}/>
			<ComputedEditor parameter={parameter} topics={topics} validTypes={validTypes}/>
		</SingleParameterContainer>
	</ParameterEventBusProvider>;
};