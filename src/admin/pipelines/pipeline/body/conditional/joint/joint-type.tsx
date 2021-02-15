import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useState } from 'react';
import { ICON_COLLAPSE_CONTENT, ICON_DELETE, ICON_EDIT } from '../../../../../../basic-widgets/constants';
import { ParameterJoint, ParameterJointType } from '../../../../../../services/tuples/factor-calculator-types';
import { useJointEventBus } from '../event-bus/joint-event-bus';
import { JointEventTypes } from '../event-bus/joint-event-bus-types';
import { JointFold } from '../joint-fold';
import { JointTypeButton, JointTypeContainer, JointTypeOption, JointTypeWrapper, RemoveJointButton } from './widgets';

const OptionsLabel: { [key in ParameterJointType]: string } = {
	[ParameterJointType.AND]: 'And',
	[ParameterJointType.OR]: 'Or'
};

const defendJoint = (joint: ParameterJoint) => {
	if (!joint.jointType) {
		joint.jointType = ParameterJointType.AND;
	}
	if (!joint.filters) {
		joint.filters = [];
	}
};

export const JointType = (props: { joint: ParameterJoint, removeMe: () => void }) => {
	const { joint, removeMe } = props;

	const [ expanded, setExpanded ] = useState(false);

	defendJoint(joint);
	const { jointType } = joint;

	const { fire } = useJointEventBus();
	const onExpandedClicked = () => setExpanded(true);
	const onBlur = () => setExpanded(false);
	const onJointTypeClicked = (newJointType: ParameterJointType) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (newJointType === jointType) {
			if (!expanded) {
				setExpanded(true);
			}
		} else {
			joint.jointType = newJointType;
			fire(JointEventTypes.JOINT_TYPE_CHANGED, joint);
			setExpanded(false);
		}
	};
	const onIconClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setExpanded(!expanded);
	};
	const onRemoveClicked = () => removeMe();

	const candidates = [ ParameterJointType.AND, ParameterJointType.OR ].filter(candidate => candidate !== jointType);

	return <JointTypeWrapper>
		<JointTypeContainer tabIndex={0} onClick={onExpandedClicked} onBlur={onBlur}>
			<JointTypeOption active={true} expanded={expanded}
			                 onClick={onJointTypeClicked(jointType)}>
				{OptionsLabel[jointType]}
			</JointTypeOption>
			{candidates.map(candidate => {
				return <JointTypeOption active={false} expanded={expanded}
				                        onClick={onJointTypeClicked(candidate)}
				                        key={candidate}>
					{OptionsLabel[candidate]}
				</JointTypeOption>;
			})}
			<JointTypeButton data-expanded={expanded} onClick={onIconClicked}>
				<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_CONTENT : ICON_EDIT}/>
			</JointTypeButton>
		</JointTypeContainer>
		<JointFold/>
		<RemoveJointButton onClick={onRemoveClicked}>
			<FontAwesomeIcon icon={ICON_DELETE}/>
		</RemoveJointButton>
	</JointTypeWrapper>;
};