import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { ParameterCondition, ParameterJoint } from '../../../../../../services/tuples/factor-calculator-types';
import { Condition } from '../condition';
import { isExpressionParameter, isJointParameter } from '../data-utils';
import { useJointEventBus } from '../event-bus/joint-event-bus';
import { JointEventTypes } from '../event-bus/joint-event-bus-types';
import { JointElementsContainer } from './widgets';

export const JointElements = (props: { joint: ParameterJoint }) => {
	const { joint } = props;

	if (!joint.filters) {
		joint.filters = [];
	}

	const { on, off, fire } = useJointEventBus();
	const [ expanded, setExpanded ] = useState(true);
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
	}, [ on, off, forceUpdate ]);
	useEffect(() => {
		const onExpandContent = () => setExpanded(true);
		const onCollapseContent = () => setExpanded(false);
		on(JointEventTypes.EXPAND_CONTENT, onExpandContent);
		on(JointEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		return () => {
			off(JointEventTypes.EXPAND_CONTENT, onExpandContent);
			off(JointEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		};
	}, [ on, off ]);

	if (joint.filters.length === 0 || !expanded) {
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

	return <JointElementsContainer>
		{joint.filters.map(filter => {
			return <Condition condition={filter} removeMe={onConditionRemove(filter)}
			                  key={v4()}/>;
		})}
	</JointElementsContainer>;
};