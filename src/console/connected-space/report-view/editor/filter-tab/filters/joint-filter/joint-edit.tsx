import {ParameterExpressionOperator, ParameterJointType} from '@/services/data/tuples/factor-calculator-types';
import {createConstantParameter, createTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {Report, ReportFilterJoint} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {ICON_COLLAPSE_CONTENT, ICON_DELETE, ICON_EDIT} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useState} from 'react';
import {useFilterEventBus} from '../filter-event-bus';
import {FilterEventTypes} from '../filter-event-bus-types';
import {RemoveFilterIcon} from '../widgets';
import {SubFilters} from './sub-filters';
import {
	AddSubFilterIcon,
	FilterJointContainer,
	FilterJointTypeButton,
	FilterJointTypeEditContainer,
	FilterJointTypeIcon,
	FirstAddSubFilterIcon
} from './widgets';

export const JointEdit = (props: {
	subject: Subject;
	report: Report;
	/**
	 * if parent joint exists, means current joint is not in top level.
	 * otherwise, current is top level, which means cannot be removed.
	 */
	parentJoint?: ReportFilterJoint;
	onRemoveMe?: () => void;
	joint: ReportFilterJoint;
}) => {
	const {
		subject, report,
		parentJoint, onRemoveMe,
		joint
	} = props;

	const {fire} = useFilterEventBus();
	const [editing, setEditing] = useState(false);
	const forceUpdate = useForceUpdate();

	const onStartEditing = () => setEditing(true);
	const onBlur = () => setEditing(false);
	const onJointChange = (jointType: ParameterJointType) => (event: MouseEvent<HTMLDivElement>) => {
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
	const onAddSubExpressionClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const newFilter = {
			left: createTopicFactorParameter(),
			operator: ParameterExpressionOperator.EQUALS,
			right: createConstantParameter()
		};
		joint.filters.push(newFilter);
		fire(FilterEventTypes.FILTER_ADDED, newFilter);
		forceUpdate();
	};
	const onAddSubJointClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const newJoint = {
			jointType: joint.jointType === ParameterJointType.AND ? ParameterJointType.OR : ParameterJointType.AND,
			filters: [{
				// 1 is factor, always be subject itself
				left: createTopicFactorParameter('1'),
				operator: ParameterExpressionOperator.EQUALS,
				right: createConstantParameter()
			}]
		};
		joint.filters.push(newJoint);
		fire(FilterEventTypes.FILTER_ADDED, newJoint);
		forceUpdate();
	};
	const onRemoveClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (!parentJoint) {
			// no parent, current is top level, do nothing
			return;
		}

		const index = parentJoint.filters.indexOf(joint);
		if (index !== -1) {
			parentJoint.filters.splice(index, 1);
			onRemoveMe && onRemoveMe();
		}
	};

	const removable = !!parentJoint;

	return <FilterJointContainer>
		<FilterJointTypeEditContainer onClick={onStartEditing} tabIndex={0} onBlur={onBlur}>
			<FilterJointTypeButton active={joint.jointType === ParameterJointType.AND} edit={editing}
			                       onClick={onJointChange(ParameterJointType.AND)}>
				{Lang.JOINT.AND}
			</FilterJointTypeButton>
			<FilterJointTypeButton active={joint.jointType === ParameterJointType.OR} edit={editing}
			                       onClick={onJointChange(ParameterJointType.OR)}>
				{Lang.JOINT.OR}
			</FilterJointTypeButton>
			<FilterJointTypeIcon onClick={onIconClicked}>
				{editing ? <FontAwesomeIcon icon={ICON_COLLAPSE_CONTENT}/> : <FontAwesomeIcon icon={ICON_EDIT}/>}
			</FilterJointTypeIcon>

		</FilterJointTypeEditContainer>
		<FirstAddSubFilterIcon singleton={false} onClick={onAddSubExpressionClicked}>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.ADD_SUB_EXPRESSION_FILTER}</span>
		</FirstAddSubFilterIcon>
		<AddSubFilterIcon singleton={!removable} onClick={onAddSubJointClicked}>
			<span>{Lang.CONSOLE.CONNECTED_SPACE.ADD_SUB_JOINT_FILTER}</span>
		</AddSubFilterIcon>
		{removable
			? <RemoveFilterIcon onClick={onRemoveClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</RemoveFilterIcon>
			: null}
		<SubFilters joint={joint} subject={subject} report={report}/>
	</FilterJointContainer>;
};