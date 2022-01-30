import {Conditional} from '@/services/data/tuples/pipeline-super-types';
import React, {Fragment, useEffect} from 'react';
import {useConditionalEventBus} from './conditional-event-bus';
import {ConditionalEventTypes} from './conditional-event-bus-types';
import {useJointEventBus} from './event-bus/joint-event-bus';
import {JointEventTypes} from './event-bus/joint-event-bus-types';

export const TopJoint2ConditionalBridge = (props: { conditional: Conditional }) => {
	const {conditional} = props;

	const {fire: fireConditional} = useConditionalEventBus();
	const {on, off} = useJointEventBus();
	useEffect(() => {
		const onContentChange = () => fireConditional(ConditionalEventTypes.CONTENT_CHANGED, conditional);
		on(JointEventTypes.SUB_JOINT_ADDED, onContentChange);
		on(JointEventTypes.SUB_JOINT_REMOVED, onContentChange);
		on(JointEventTypes.SUB_EXPRESSION_ADDED, onContentChange);
		on(JointEventTypes.SUB_EXPRESSION_REMOVED, onContentChange);
		on(JointEventTypes.EXPRESSION_CONTENT_CHANGED, onContentChange);
		return () => {
			off(JointEventTypes.SUB_JOINT_ADDED, onContentChange);
			off(JointEventTypes.SUB_JOINT_REMOVED, onContentChange);
			off(JointEventTypes.SUB_EXPRESSION_ADDED, onContentChange);
			off(JointEventTypes.SUB_EXPRESSION_REMOVED, onContentChange);
			off(JointEventTypes.EXPRESSION_CONTENT_CHANGED, onContentChange);
		};
	}, [fireConditional, on, off, conditional]);

	return <Fragment/>;
};