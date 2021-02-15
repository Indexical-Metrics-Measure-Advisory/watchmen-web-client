import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICON_ADD } from '../../../../../../basic-widgets/constants';
import { ParameterJoint, ParameterJointType } from '../../../../../../services/tuples/factor-calculator-types';
import { createExpressionParameter, createJointParameter } from '../data-utils';
import { useJointEventBus } from '../event-bus/joint-event-bus';
import { JointEventTypes } from '../event-bus/joint-event-bus-types';
import { JointOperator, JointOperatorsContainer } from './widgets';

export const JointOperators = (props: { joint: ParameterJoint }) => {
	const { joint } = props;

	if (!joint.filters) {
		joint.filters = [];
	}

	const { on, off, fire } = useJointEventBus();
	const [ expanded, setExpanded ] = useState(true);
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

	if (!expanded) {
		return null;
	}

	const onAddExpressionClicked = () => {
		const expression = createExpressionParameter();
		joint.filters.push(expression);
		fire(JointEventTypes.SUB_EXPRESSION_ADDED, expression, joint);
	};
	const onAddSubJointClicked = () => {
		const subJoint = createJointParameter(joint.jointType === ParameterJointType.AND ? ParameterJointType.OR : ParameterJointType.AND);
		joint.filters.push(subJoint);
		fire(JointEventTypes.SUB_JOINT_ADDED, subJoint, joint);
	};

	return <JointOperatorsContainer>
		<JointOperator onClick={onAddExpressionClicked}>
			<FontAwesomeIcon icon={ICON_ADD}/>
			<span>Add Sub Expression</span>
		</JointOperator>
		<JointOperator onClick={onAddSubJointClicked}>
			<FontAwesomeIcon icon={ICON_ADD}/>
			<span>Add Sub Joint</span>
		</JointOperator>
	</JointOperatorsContainer>;
};