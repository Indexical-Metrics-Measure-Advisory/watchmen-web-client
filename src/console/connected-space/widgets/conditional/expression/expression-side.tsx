import {Parameter, ParameterExpression, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {useEffect} from 'react';
import {ComputedEditor} from '../../parameter/computed';
import {ConstantValueEditor} from '../../parameter/constant';
import {ParameterFromEditor} from '../../parameter/param-from';
import {TopicFactorEditor} from '../../parameter/topic-factor';
import {ExpressionSideContainer} from './widgets';

export const ExpressionSide = (props: {
	base: ParameterExpression;
	parameter: Parameter;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	visible?: boolean;
	leftSide: boolean;
}) => {
	const {parameter, availableTopics, pickedTopics, visible = true} = props;

	// const {on, off} = useExpressionEventBus();
	// const [expectedTypes, setExpectedTypes] = useState(computeValidTypesByExpressionOperator(base.operator));
	// useEffect(() => {
	// 	const onOperatorChanged = (expression: ParameterExpression) => {
	// 		if (base !== expression) {
	// 			return;
	// 		}
	// 		const newExpectedTypes = computeValidTypesByExpressionOperator(expression.operator);
	// 		if (newExpectedTypes !== expectedTypes) {
	// 			setExpectedTypes(newExpectedTypes);
	// 		}
	// 	};
	// 	on(ExpressionEventTypes.OPERATOR_CHANGED, onOperatorChanged);
	// 	return () => {
	// 		off(ExpressionEventTypes.OPERATOR_CHANGED, onOperatorChanged);
	// 	};
	// }, [on, off, base, expectedTypes]);
	const {on, off} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onFromChanged = () => {
			forceUpdate();
		};
		on(ParameterEventTypes.FROM_CHANGED, onFromChanged);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, onFromChanged);
		};
	}, [on, off, forceUpdate]);

	return <ExpressionSideContainer visible={visible}>
		<ParameterFromEditor parameter={parameter} shorten={parameter.kind === ParameterKind.COMPUTED}/>
		<TopicFactorEditor parameter={parameter} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<ConstantValueEditor parameter={parameter}/>
		<ComputedEditor parameter={parameter} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
	</ExpressionSideContainer>;
};