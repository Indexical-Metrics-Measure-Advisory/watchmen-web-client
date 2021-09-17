import {Parameter, ParameterExpressionOperator} from '@/services/data/tuples/factor-calculator-types';
import {SubjectDataSetFilterExpression} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {useFilterEventBus} from '../filter-event-bus';
import {FilterEventTypes} from '../filter-event-bus-types';
import {Expression} from './expression';

export const ExpressionRight = (props: {
	filter: SubjectDataSetFilterExpression;
	parameter: Parameter
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {filter, parameter, availableTopics, pickedTopics} = props;

	const {on, off} = useFilterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(FilterEventTypes.CONTENT_CHANGED, forceUpdate);
		return () => {
			off(FilterEventTypes.CONTENT_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const visible = filter.operator !== ParameterExpressionOperator.NOT_EMPTY
		&& filter.operator !== ParameterExpressionOperator.EMPTY;

	return <Expression filter={filter} parameter={parameter}
	                   availableTopics={availableTopics} pickedTopics={pickedTopics}
	                   visible={visible}/>;
};