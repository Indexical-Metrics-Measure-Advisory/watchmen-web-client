import {ParameterJoint, ParameterJointType} from '@/services/data/tuples/factor-calculator-types';
import {ICON_ADD} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {createJointParameter, createTopicEqualsConstantParameter} from '../data-utils';
import {useJointEventBus} from '../event-bus/joint-event-bus';
import {JointEventTypes} from '../event-bus/joint-event-bus-types';
import {JointOperator, JointOperatorsContainer} from './widgets';

export const JointOperators = (props: { joint: ParameterJoint }) => {
	const {joint} = props;

	if (!joint.filters) {
		joint.filters = [];
	}

	const {fire} = useJointEventBus();

	const onAddExpressionClicked = () => {
		const expression = createTopicEqualsConstantParameter();
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