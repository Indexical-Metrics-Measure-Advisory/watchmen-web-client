import {AlarmAction, AlarmActionSeverity} from '@/services/data/tuples/pipeline-stage-unit-action/system-actions-types';
import {ICON_COLLAPSE_CONTENT, ICON_EDIT} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useState} from 'react';
import {useActionEventBus} from '../../action-event-bus';
import {ActionEventTypes} from '../../action-event-bus-types';
import {SeverityButton, SeverityContainer, SeverityOption} from './widgets';

const OptionsLabel: Record<AlarmActionSeverity, string> = {
	[AlarmActionSeverity.CRITICAL]: 'Critical',
	[AlarmActionSeverity.HIGH]: 'High',
	[AlarmActionSeverity.MEDIUM]: 'Medium',
	[AlarmActionSeverity.LOW]: 'Low'
};

const defendAlarmAction = (action: AlarmAction) => {
	if (!action.severity) {
		action.severity = AlarmActionSeverity.MEDIUM;
	}
};

export const AlarmSeverity = (props: { action: AlarmAction }) => {
	const {action} = props;

	const [expanded, setExpanded] = useState(false);

	defendAlarmAction(action);
	const {severity} = action;

	const {fire} = useActionEventBus();
	const onExpandedClicked = () => setExpanded(true);
	const onBlur = () => setExpanded(false);
	const onSeverityClicked = (newSeverity: AlarmActionSeverity) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (newSeverity === severity) {
			if (!expanded) {
				setExpanded(true);
			}
		} else {
			action.severity = newSeverity;
			fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
			setExpanded(false);
		}
	};
	const onIconClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setExpanded(!expanded);
	};
	const candidates = [AlarmActionSeverity.CRITICAL, AlarmActionSeverity.HIGH, AlarmActionSeverity.MEDIUM, AlarmActionSeverity.LOW].filter(candidate => candidate !== severity);

	return <SeverityContainer tabIndex={0} onClick={onExpandedClicked} onBlur={onBlur}>
		<SeverityOption active={true} expanded={expanded}
		                onClick={onSeverityClicked(severity)}>
			{OptionsLabel[severity]}
		</SeverityOption>
		{candidates.map(candidate => {
			return <SeverityOption active={false} expanded={expanded}
			                       onClick={onSeverityClicked(candidate)}
			                       key={candidate}>
				{OptionsLabel[candidate]}
			</SeverityOption>;
		})}
		<SeverityButton data-expanded={expanded} onClick={onIconClicked}>
			<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_CONTENT : ICON_EDIT}/>
		</SeverityButton>
	</SeverityContainer>;
};