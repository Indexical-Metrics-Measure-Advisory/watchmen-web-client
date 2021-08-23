import React, {useEffect} from 'react';
import {Parameter2FilterEventBridge} from '../parameter-2-filter-event-bridge';
import {ExpressionSide, ParameterFromEditorForExpression} from './widgets';
import {Report, ReportFilterExpression} from '../../../../../../../services/tuples/report-types';
import {Subject} from '../../../../../../../services/tuples/subject-types';
import {Parameter, ParameterKind} from '../../../../../../../services/tuples/factor-calculator-types';
import {ComputedEditor} from '../../../../../parameter/computed';
import {TopicFactorEditor} from '../../../../../parameter/topic-factor';
import {ConstantValueEditor} from '../../../../../parameter/constant';
import {ParameterEventTypes} from '../../../../../parameter/parameter-event-bus-types';
import {useForceUpdate} from '../../../../../../../basic-widgets/utils';
import {ParameterEventBusProvider, useParameterEventBus} from '../../../../../parameter/parameter-event-bus';
import {Topic} from '../../../../../../../services/tuples/topic-types';
import {Factor} from '../../../../../../../services/tuples/factor-types';

export const ExpressionBody = (props: {
	subject: Subject;
	report: Report;
	filter: ReportFilterExpression;
	parameter: Parameter
	visible: boolean;
}) => {
	const {
		subject,
		filter, parameter,
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

	const availableTopics: Array<Topic> = [{
		// 1 is factor, always be subject itself
		topicId: '1',
		name: '',
		factors: (subject.dataset.columns || []).map(column => {
			return {
				factorId: column.columnId,
				name: column.alias || 'Noname Column'
			} as Factor;
		})
	} as Topic];
	const pickedTopics = availableTopics;

	return <ExpressionSide shorten={parameter.kind === ParameterKind.COMPUTED} visible={visible}>
		<ParameterFromEditorForExpression shorten={parameter.kind === ParameterKind.COMPUTED}
		                                  parameter={parameter}/>
		<ConstantValueEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<ComputedEditor parameter={parameter} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<Parameter2FilterEventBridge filter={filter}/>
	</ExpressionSide>;
};

export const Expression = (props: {
	subject: Subject;
	report: Report;
	filter: ReportFilterExpression;
	parameter: Parameter
	visible: boolean;
}) => {
	return <ParameterEventBusProvider>
		<ExpressionBody {...props}/>
	</ParameterEventBusProvider>;
};