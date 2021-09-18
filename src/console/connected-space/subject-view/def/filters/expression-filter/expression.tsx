import {Parameter, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {SubjectDataSetFilterExpression} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {ParameterEventBusProvider, useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {useEffect} from 'react';
import {ComputedEditor} from '../../../../widgets/parameter/computed';
import {ConstantValueEditor} from '../../../../widgets/parameter/constant';
import {TopicFactorEditor} from '../../../../widgets/parameter/topic-factor';
import {Parameter2FilterEventBridge} from '../parameter-2-filter-event-bridge';
import {ExpressionSide, ParameterFromEditorForExpression} from './widgets';

export const ExpressionBody = (props: {
	filter: SubjectDataSetFilterExpression;
	parameter: Parameter
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	visible: boolean;
}) => {
	const {
		filter, parameter,
		availableTopics, pickedTopics,
		visible
	} = props;

	const {on, off} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	return <ExpressionSide shorten={parameter.kind === ParameterKind.COMPUTED} visible={visible}>
		<ParameterFromEditorForExpression shorten={parameter.kind === ParameterKind.COMPUTED}
		                                  parameter={parameter}/>
		<ConstantValueEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter}
		                   availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<ComputedEditor parameter={parameter}
		                availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<Parameter2FilterEventBridge filter={filter}/>
	</ExpressionSide>;
};

export const Expression = (props: {
	filter: SubjectDataSetFilterExpression;
	parameter: Parameter
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	visible: boolean;
}) => {
	return <ParameterEventBusProvider>
		<ExpressionBody {...props}/>
	</ParameterEventBusProvider>;
};