import {
	PipelineStageUnitAction,
	PipelineStageUnitActionType,
	ReadTopicActionType,
	SystemActionType,
	WriteTopicActionType
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {ICON_EDIT} from '@/widgets/basic/constants';
import {useCollapseFixedThing} from '@/widgets/basic/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useRef, useState} from 'react';
import {defendAction} from '../../../../data-utils';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';
import {
	ACTION_TYPE_DROPDOWN_HEIGHT,
	ActionTypeContainer,
	ActionTypeDropdown,
	ActionTypeIcon,
	ActionTypeLabel,
	ActionTypeOption,
	ActionTypeOptions
} from './widgets';

const ActionTypeLabels: Record<PipelineStageUnitActionType, string> = {
	[SystemActionType.ALARM]: 'Alarm',
	[SystemActionType.COPY_TO_MEMORY]: 'Copy to Variable',
	[SystemActionType.WRITE_TO_EXTERNAL]: 'Write to External',
	[ReadTopicActionType.EXISTS]: 'Exists',
	[ReadTopicActionType.READ_FACTOR]: 'Read Factor',
	[ReadTopicActionType.READ_FACTORS]: 'Read Factors',
	[ReadTopicActionType.READ_ROW]: 'Read Row',
	[ReadTopicActionType.READ_ROWS]: 'Read Rows',
	[WriteTopicActionType.WRITE_FACTOR]: 'Write Factor',
	[WriteTopicActionType.INSERT_OR_MERGE_ROW]: 'Insert or Merge Row',
	[WriteTopicActionType.MERGE_ROW]: 'Merge Row',
	[WriteTopicActionType.INSERT_ROW]: 'Insert Row'
};

interface DropdownState {
	visible: boolean;
	top?: number;
	bottom?: number;
	left: number;
}

export const ActionTypeEditor = (props: { action: PipelineStageUnitAction }) => {
	const {action} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const {fire} = useActionEventBus();
	const [state, setState] = useState<DropdownState>({visible: false, top: 0, left: 0});
	useCollapseFixedThing({
		containerRef,
		visible: state.visible,
		hide: () => setState({visible: false, top: 0, left: 0})
	});

	const onTypeClicked = () => {
		if (!containerRef.current) {
			return;
		}

		const {top, left, height} = containerRef.current.getBoundingClientRect();
		if (top + height + 4 + ACTION_TYPE_DROPDOWN_HEIGHT > window.innerHeight) {
			// at top
			setState({visible: true, bottom: window.innerHeight - top + 4, left});
		} else {
			setState({visible: true, top: top + height + 4, left});
		}
	};
	const onActionTypeClicked = (actionType: PipelineStageUnitActionType) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if (action.type === actionType) {
			return;
		} else {
			action.type = actionType;
			defendAction(action);
			fire(ActionEventTypes.ACTION_TYPE_CHANGED, action);
			setState({visible: false, top: 0, left: 0});
		}
	};

	return <ActionTypeContainer onClick={onTypeClicked} ref={containerRef}>
		<ActionTypeLabel>{ActionTypeLabels[action.type]}</ActionTypeLabel>
		<ActionTypeIcon>
			<FontAwesomeIcon icon={ICON_EDIT}/>
		</ActionTypeIcon>
		<ActionTypeDropdown {...state}>
			<ActionTypeOptions>
				{[SystemActionType.ALARM, SystemActionType.COPY_TO_MEMORY, SystemActionType.WRITE_TO_EXTERNAL].map(actionType => {
					return <ActionTypeOption selected={actionType === action.type}
					                         onClick={onActionTypeClicked(actionType)}
					                         key={actionType}>
						{ActionTypeLabels[actionType]}
					</ActionTypeOption>;
				})}
			</ActionTypeOptions>
			<ActionTypeOptions>
				{[ReadTopicActionType.EXISTS, ReadTopicActionType.READ_FACTOR, ReadTopicActionType.READ_ROW].map(actionType => {
					return <ActionTypeOption selected={actionType === action.type}
					                         onClick={onActionTypeClicked(actionType)}
					                         key={actionType}>
						{ActionTypeLabels[actionType]}
					</ActionTypeOption>;
				})}
			</ActionTypeOptions>
			<ActionTypeOptions>
				{[ReadTopicActionType.READ_FACTORS, ReadTopicActionType.READ_ROWS].map(actionType => {
					return <ActionTypeOption selected={actionType === action.type}
					                         onClick={onActionTypeClicked(actionType)}
					                         key={actionType}>
						{ActionTypeLabels[actionType]}
					</ActionTypeOption>;
				})}
			</ActionTypeOptions>
			<ActionTypeOptions>
				{[WriteTopicActionType.WRITE_FACTOR, WriteTopicActionType.INSERT_OR_MERGE_ROW, WriteTopicActionType.MERGE_ROW, WriteTopicActionType.INSERT_ROW].map(actionType => {
					return <ActionTypeOption selected={actionType === action.type}
					                         onClick={onActionTypeClicked(actionType)}
					                         key={actionType}>
						{ActionTypeLabels[actionType]}
					</ActionTypeOption>;
				})}
			</ActionTypeOptions>
		</ActionTypeDropdown>
	</ActionTypeContainer>;
};