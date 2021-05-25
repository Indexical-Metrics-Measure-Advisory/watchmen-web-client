import React, {useEffect} from 'react';
import {v4} from 'uuid';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {ParameterCondition, ParameterJoint} from '../../../../../../services/tuples/factor-calculator-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {Condition} from '../condition';
import {useJointEventBus} from '../event-bus/joint-event-bus';
import {JointEventTypes} from '../event-bus/joint-event-bus-types';
import {JointElementsContainer} from './widgets';
import {isExpressionParameter, isJointParameter} from '../../../../../../services/tuples/parameter-utils';

export const JointElements = (props: { joint: ParameterJoint, topics: Array<Topic> }) => {
	const {joint, topics} = props;

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
			return <Condition condition={filter} topics={topics}
			                  removeMe={onConditionRemove(filter)}
			                  onChange={onConditionChange(filter)}
			                  key={v4()}/>;
		})}
	</JointElementsContainer>;
};