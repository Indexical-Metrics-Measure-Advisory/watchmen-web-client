import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL } from '../../../../../../basic-widgets/constants';
import { useJointEventBus } from '../event-bus/joint-event-bus';
import { JointEventTypes } from '../event-bus/joint-event-bus-types';
import { JointFoldContainer, JointFoldOperator } from './widgets';

export const JointFold = () => {
	const { fire } = useJointEventBus();

	const onExpandClicked = () => fire(JointEventTypes.EXPAND_CONTENT);
	const onCollapseClicked = () => fire(JointEventTypes.COLLAPSE_CONTENT);

	return <JointFoldContainer>
		<JointFoldOperator onClick={onExpandClicked}>
			<FontAwesomeIcon icon={ICON_EXPAND_PANEL}/>
			<span>Expand</span>
		</JointFoldOperator>
		<JointFoldOperator onClick={onCollapseClicked}>
			<FontAwesomeIcon icon={ICON_COLLAPSE_PANEL}/>
			<span>Collapse</span>
		</JointFoldOperator>
	</JointFoldContainer>;
};