import {ParameterCondition} from '@/services/data/tuples/factor-calculator-types';
import {isExpressionParameter, isJointParameter} from '@/services/data/tuples/parameter-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import {ExpressionEventBusProvider} from '../event-bus/expression-event-bus';
import {JointEventBusProvider} from '../event-bus/joint-event-bus';
import {Expression} from '../expression';
import {Joint} from '../joint';
import {Expression2ParentBridge} from './expression-2-parent-bridge';
import {Joint2ParentBridge} from './joint-2-parent-bridge';

export const Condition = (props: {
	condition: ParameterCondition;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	removeMe: () => void;
	onChange: () => void;
}) => {
	const {condition, availableTopics, pickedTopics, removeMe, onChange} = props;

	if (isJointParameter(condition)) {
		return <JointEventBusProvider>
			<Joint2ParentBridge onChange={onChange}/>
			<Joint joint={condition} availableTopics={availableTopics} pickedTopics={pickedTopics} removeMe={removeMe}/>
		</JointEventBusProvider>;
	} else if (isExpressionParameter(condition)) {
		return <ExpressionEventBusProvider>
			<Expression2ParentBridge onChange={onChange}/>
			<Expression expression={condition} availableTopics={availableTopics} pickedTopics={pickedTopics} removeMe={removeMe}/>
		</ExpressionEventBusProvider>;
	} else {
		return null;
	}
};