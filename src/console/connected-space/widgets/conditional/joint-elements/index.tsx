import {ParameterCondition, ParameterJoint} from '@/services/data/tuples/factor-calculator-types';
import {isExpressionParameter, isJointParameter} from '@/services/data/tuples/parameter-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {v4} from 'uuid';
import {Condition} from '../condition';
import {useJointEventBus} from '../event-bus/joint-event-bus';
import {JointEventTypes} from '../event-bus/joint-event-bus-types';
import {JointElementsContainer} from './widgets';

export const JointElements = (props: {
	joint: ParameterJoint;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {joint, availableTopics, pickedTopics} = props;

	if (!joint.filters) {
		joint.filters = [];
	}

	const {on, off, fire} = useJointEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(JointEventTypes.SUB_EXPRESSION_ADDED, forceUpdate);
		on(JointEventTypes.SUB_JOINT_ADDED, forceUpdate);
		on(JointEventTypes.SUB_EXPRESSION_REMOVED, forceUpdate);
		on(JointEventTypes.SUB_JOINT_REMOVED, forceUpdate);
		return () => {
			off(JointEventTypes.SUB_EXPRESSION_ADDED, forceUpdate);
			off(JointEventTypes.SUB_JOINT_ADDED, forceUpdate);
			off(JointEventTypes.SUB_EXPRESSION_REMOVED, forceUpdate);
			off(JointEventTypes.SUB_JOINT_REMOVED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	if (joint.filters.length === 0) {
		return null;
	}

	const onConditionRemove = (condition: ParameterCondition) => () => {
		const index = joint.filters.findIndex(filter => filter === condition);
		if (index !== -1) {
			joint.filters.splice(index, 1);
			if (isJointParameter(condition)) {
				fire(JointEventTypes.SUB_JOINT_REMOVED, condition, joint);
			} else if (isExpressionParameter(condition)) {
				fire(JointEventTypes.SUB_EXPRESSION_REMOVED, condition, joint);
			}
		}
	};
	const onConditionChange = (condition: ParameterCondition) => () => {
		fire(JointEventTypes.EXPRESSION_CONTENT_CHANGED, condition, joint);
	};

	return <JointElementsContainer>
		{joint.filters.map(filter => {
			return <Condition condition={filter} availableTopics={availableTopics} pickedTopics={pickedTopics}
			                  removeMe={onConditionRemove(filter)}
			                  onChange={onConditionChange(filter)}
			                  key={v4()}/>;
		})}
	</JointElementsContainer>;
};