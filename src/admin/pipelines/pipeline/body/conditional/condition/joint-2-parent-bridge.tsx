import React, {Fragment, useEffect} from 'react';
import {useJointEventBus} from '../event-bus/joint-event-bus';
import {JointEventTypes} from '../event-bus/joint-event-bus-types';

export const Joint2ParentBridge = (props: { onChange: () => void }) => {
	const {onChange} = props;

	const {on, off} = useJointEventBus();
	useEffect(() => {
		on(JointEventTypes.SUB_JOINT_ADDED, onChange);
		on(JointEventTypes.SUB_JOINT_REMOVED, onChange);
		on(JointEventTypes.SUB_EXPRESSION_ADDED, onChange);
		on(JointEventTypes.SUB_EXPRESSION_REMOVED, onChange);
		on(JointEventTypes.EXPRESSION_CONTENT_CHANGED, onChange);
		return () => {
			off(JointEventTypes.SUB_JOINT_ADDED, onChange);
			off(JointEventTypes.SUB_JOINT_REMOVED, onChange);
			off(JointEventTypes.SUB_EXPRESSION_ADDED, onChange);
			off(JointEventTypes.SUB_EXPRESSION_REMOVED, onChange);
			off(JointEventTypes.EXPRESSION_CONTENT_CHANGED, onChange);
		};
	}, [on, off, onChange]);

	return <Fragment/>;
};