import React, {ReactNode, useEffect, useState} from 'react';
import {useJointEventBus} from '../event-bus/joint-event-bus';
import {JointEventTypes} from '../event-bus/joint-event-bus-types';
import {JointBodyContainer} from './widgets';

export const JointBody = (props: { children: ReactNode }) => {
	const {children} = props;

	const {on, off} = useJointEventBus();
	const [expanded, setExpanded] = useState(true);
	useEffect(() => {
		const onJointTypeChanged = () => {
			setExpanded(true);
		};
		const onExpandContent = () => setExpanded(true);
		const onCollapseContent = () => setExpanded(false);
		on(JointEventTypes.JOINT_TYPE_CHANGED, onJointTypeChanged);
		on(JointEventTypes.EXPAND_CONTENT, onExpandContent);
		on(JointEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		return () => {
			off(JointEventTypes.EXPAND_CONTENT, onExpandContent);
			off(JointEventTypes.COLLAPSE_CONTENT, onCollapseContent);
			off(JointEventTypes.JOINT_TYPE_CHANGED, onJointTypeChanged);
		};
	}, [on, off]);

	return <JointBodyContainer expanded={expanded}>
		{children}
	</JointBodyContainer>;
};