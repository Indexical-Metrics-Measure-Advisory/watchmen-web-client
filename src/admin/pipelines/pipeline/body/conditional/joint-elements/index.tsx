import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { ParameterJoint } from '../../../../../../services/tuples/factor-calculator-types';
import { Condition } from '../condition';
import { useJointEventBus } from '../event-bus/joint-event-bus';
import { JointEventTypes } from '../event-bus/joint-event-bus-types';
import { JointElementsContainer } from './widgets';

export const JointElements = (props: { joint: ParameterJoint }) => {
	const { joint } = props;

	if (!joint.filters) {
		joint.filters = [];
	}

	const { on, off } = useJointEventBus();
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

	if (joint.filters.length === 0) {
		return null;
	}

	return <JointElementsContainer>
		{joint.filters.map(filter => {
			return <Condition condition={filter} key={v4()}/>;
		})}
	</JointElementsContainer>;
};