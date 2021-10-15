import {Parameter, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {Factor} from '@/services/data/tuples/factor-types';
import {Report, ReportFilterExpression} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {ParameterEventBusProvider, useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {useEffect} from 'react';
import {ConstantValueEditor} from '../../../../../widgets/parameter/constant';
import {TopicFactorEditor} from '../../../../../widgets/parameter/topic-factor';
import {Parameter2FilterEventBridge} from '../parameter-2-filter-event-bridge';
import {ExpressionSide, ParameterFromEditorForExpression} from './widgets';

export const ExpressionBody = (props: {
	subject: Subject;
	report: Report;
	filter: ReportFilterExpression;
	parameter: Parameter;
	availableKinds: Array<ParameterKind>;
	visible: boolean;
}) => {
	const {subject, filter, parameter, availableKinds, visible} = props;

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
				name: column.alias || Lang.CHART.NONAME_COLUMN
			} as Factor;
		})
	} as Topic];

	return <ExpressionSide shorten={parameter.kind === ParameterKind.COMPUTED} visible={visible}>
		<ParameterFromEditorForExpression shorten={parameter.kind === ParameterKind.COMPUTED}
		                                  parameter={parameter} availableKinds={availableKinds}/>
		<ConstantValueEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter} availableTopics={availableTopics} pickedTopics={availableTopics}/>
		{/*<ComputedEditor parameter={parameter} availableTopics={availableTopics} pickedTopics={pickedTopics}/>*/}
		<Parameter2FilterEventBridge filter={filter}/>
	</ExpressionSide>;
};

export const Expression = (props: {
	subject: Subject;
	report: Report;
	filter: ReportFilterExpression;
	parameter: Parameter;
	availableKinds: Array<ParameterKind>;
	visible: boolean;
}) => {
	return <ParameterEventBusProvider>
		<ExpressionBody {...props}/>
	</ParameterEventBusProvider>;
};