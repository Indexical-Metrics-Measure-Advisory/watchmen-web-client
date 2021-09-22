import {Parameter, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {ReportFilterExpression} from '@/services/data/tuples/report-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {ParameterEventBusProvider, useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {useEffect} from 'react';
import {ConstantValueEditor} from '../../parameter/constant';
import {TopicFactorEditor} from '../../parameter/topic-factor';
import {Parameter2FilterEventBridge} from '../parameter-2-filter-event-bridge';
import {ExpressionSide, ParameterFromEditorForExpression} from './widgets';

export const ExpressionBody = (props: {
	topics: Array<Topic>;
	filter: ReportFilterExpression;
	parameter: Parameter;
	availableKinds: Array<ParameterKind>;
	visible: boolean;
}) => {
	const {topics, filter, parameter, availableKinds, visible} = props;

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
		                                  parameter={parameter} availableKinds={availableKinds}/>
		<ConstantValueEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter} availableTopics={topics} pickedTopics={topics}/>
		{/*<ComputedEditor parameter={parameter} availableTopics={availableTopics} pickedTopics={pickedTopics}/>*/}
		<Parameter2FilterEventBridge filter={filter}/>
	</ExpressionSide>;
};

export const Expression = (props: {
	topics: Array<Topic>;
	filter: ReportFilterExpression;
	parameter: Parameter;
	availableKinds: Array<ParameterKind>;
	visible: boolean;
}) => {
	return <ParameterEventBusProvider>
		<ExpressionBody {...props}/>
	</ParameterEventBusProvider>;
};