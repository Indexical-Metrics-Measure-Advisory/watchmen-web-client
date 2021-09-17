import {ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useJointEventBus} from '../event-bus/joint-event-bus';
import {JointEventTypes} from '../event-bus/joint-event-bus-types';
import {JointFoldContainer, JointFoldOperator} from './widgets';

export const JointFold = () => {
	const {on, off, fire} = useJointEventBus();
	const [expanded, setExpanded] = useState(true);
	useEffect(() => {
		const onJointTypeChanged = () => {
			setExpanded(true);
		};
		on(JointEventTypes.JOINT_TYPE_CHANGED, onJointTypeChanged);
		return () => {
			off(JointEventTypes.JOINT_TYPE_CHANGED, onJointTypeChanged);
		};
	}, [on, off]);

	const onExpandClicked = () => {
		fire(JointEventTypes.EXPAND_CONTENT);
		setExpanded(true);
	};
	const onCollapseClicked = () => {
		fire(JointEventTypes.COLLAPSE_CONTENT);
		setExpanded(false);
	};

	return <JointFoldContainer>
		{expanded
			? null
			: <JointFoldOperator onClick={onExpandClicked}>
				<FontAwesomeIcon icon={ICON_EXPAND_PANEL}/>
				<span>Expand</span>
			</JointFoldOperator>}
		{expanded
			? <JointFoldOperator onClick={onCollapseClicked}>
				<FontAwesomeIcon icon={ICON_COLLAPSE_PANEL}/>
				<span>Collapse</span>
			</JointFoldOperator>
			: null}
	</JointFoldContainer>;
};