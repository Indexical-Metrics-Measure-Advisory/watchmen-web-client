import React, { useEffect } from 'react';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { Parameter, ParameterExpressionOperator } from '../../../../../../services/tuples/factor-calculator-types';
import { Subject, SubjectDataSetFilterExpression } from '../../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { useFilterEventBus } from '../filter-event-bus';
import { FilterEventTypes } from '../filter-event-bus-types';
import { Expression } from './expression';

export const ExpressionRight = (props: {
	subject: Subject;
	filter: SubjectDataSetFilterExpression;
	parameter: Parameter
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const { subject, filter, parameter, availableTopics, pickedTopics } = props;

	const { on, off } = useFilterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(FilterEventTypes.CONTENT_CHANGED, forceUpdate);
		return () => {
			off(FilterEventTypes.CONTENT_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	const visible = filter.operator !== ParameterExpressionOperator.NOT_EMPTY
		&& filter.operator !== ParameterExpressionOperator.EMPTY;

	return <Expression subject={subject} filter={filter} parameter={parameter}
	                   availableTopics={availableTopics} pickedTopics={pickedTopics}
	                   visible={visible}/>;
};