import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useState } from 'react';
import { ICON_ADD, ICON_COLLAPSE_CONTENT, ICON_DELETE, ICON_EDIT } from '../../../../../../basic-widgets/constants';
import { Lang } from '../../../../../../langs';
import { FilterJointType, Subject, SubjectDataSetFilterJoint } from '../../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { useFilterEventBus } from '../filter-event-bus';
import { FilterEventTypes } from '../filter-event-bus-types';
import { SubFilters } from './sub-filters';
import {
	AddSubFilterIcon,
	FilterJointContainer,
	FilterJointTypeButton,
	FilterJointTypeEditContainer,
	FilterJointTypeIcon,
	RemoveJointTypeIcon
} from './widgets';

export const JointEdit = (props: {
	subject: Subject;
	joint: SubjectDataSetFilterJoint;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	removable: boolean;
}) => {
	const { subject, joint, availableTopics, pickedTopics, removable } = props;

	const { fire } = useFilterEventBus();
	const [ editing, setEditing ] = useState(false);

	const onStartEditing = () => setEditing(true);
	const onBlur = () => setEditing(false);
	const onJointChange = (jointType: FilterJointType) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (jointType === joint.jointType) {
			// do nothing, discard or start editing
			setEditing(!editing);
		} else {
			joint.jointType = jointType;
			setEditing(false);
			fire(FilterEventTypes.JOINT_TYPE_CHANGED, joint);
		}
	};
	const onIconClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setEditing(!editing);
	};
	const onAddClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		// TODO
	};
	const onRemoveClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		// TODO
	};

	return <FilterJointContainer>
		<FilterJointTypeEditContainer onClick={onStartEditing} tabIndex={0} onBlur={onBlur}>
			<FilterJointTypeButton active={joint.jointType === FilterJointType.AND} edit={editing}
			                       onClick={onJointChange(FilterJointType.AND)}>
				{Lang.JOINT.AND}
			</FilterJointTypeButton>
			<FilterJointTypeButton active={joint.jointType === FilterJointType.OR} edit={editing}
			                       onClick={onJointChange(FilterJointType.OR)}>
				{Lang.JOINT.OR}
			</FilterJointTypeButton>
			<FilterJointTypeIcon onClick={onIconClicked}>
				{editing ? <FontAwesomeIcon icon={ICON_COLLAPSE_CONTENT}/> : <FontAwesomeIcon icon={ICON_EDIT}/>}
			</FilterJointTypeIcon>

		</FilterJointTypeEditContainer>
		<AddSubFilterIcon singleton={!removable} onClick={onAddClicked}>
			<FontAwesomeIcon icon={ICON_ADD}/>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.ADD_SUBJECT_SUB_FILTER}</span>
		</AddSubFilterIcon>
		{removable
			? <RemoveJointTypeIcon onClick={onRemoveClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</RemoveJointTypeIcon>
			: null}
		<SubFilters subject={subject} joint={joint} availableTopics={availableTopics} pickedTopics={pickedTopics}/>
	</FilterJointContainer>;
};