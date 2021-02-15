import React, { useEffect } from 'react';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { Parameter, ParameterFrom } from '../../../../../../services/tuples/factor-calculator-types';
import { Subject, SubjectDataSetFilterExpression } from '../../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { ComputedEditor } from '../../parameter/computed';
import { ConstantValueEditor } from '../../parameter/constant';
import { ParameterEventBusProvider, useParameterEventBus } from '../../parameter/parameter-event-bus';
import { ParameterEventTypes } from '../../parameter/parameter-event-bus-types';
import { TopicFactorEditor } from '../../parameter/topic-factor';
import { Parameter2FilterEventBridge } from '../parameter-2-filter-event-bridge';
import { ExpressionSide, ParameterFromEditorForExpression } from './widgets';

export const ExpressionBody = (props: {
	subject: Subject;
	filter: SubjectDataSetFilterExpression;
	parameter: Parameter
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {
		subject,
		filter, parameter,
		availableTopics, pickedTopics
	} = props;

	const { on, off } = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	return <ExpressionSide shorten={parameter.from === ParameterFrom.COMPUTED}>
		<ParameterFromEditorForExpression shorten={parameter.from === ParameterFrom.COMPUTED}
		                                  parameter={parameter}/>
		<ConstantValueEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter}
		                   availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<ComputedEditor parameter={parameter}
		                availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<Parameter2FilterEventBridge subject={subject} filter={filter}/>
	</ExpressionSide>;
};

export const Expression = (props: {
	subject: Subject;
	filter: SubjectDataSetFilterExpression;
	parameter: Parameter
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	return <ParameterEventBusProvider>
		<ExpressionBody {...props}/>
	</ParameterEventBusProvider>;
};