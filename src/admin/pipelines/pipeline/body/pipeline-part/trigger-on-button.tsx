import {Pipeline, PipelineTriggerType} from '@/services/data/tuples/pipeline-types';
import {ICON_COLLAPSE_CONTENT, ICON_EDIT} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useState} from 'react';
import {usePipelineEventBus} from '../../pipeline-event-bus';
import {PipelineEventTypes} from '../../pipeline-event-bus-types';
import {TriggerButton, TriggerContainer, TriggerOn} from './trigger-widgets';

const TriggersLabel: Record<PipelineTriggerType, string> = {
	[PipelineTriggerType.INSERT_OR_MERGE]: 'Insert or Merge',
	[PipelineTriggerType.INSERT]: 'Insert',
	[PipelineTriggerType.MERGE]: 'Merge',
	[PipelineTriggerType.DELETE]: 'Delete'
};

export const TriggerOnButton = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;
	const {type} = pipeline;

	const {fire} = usePipelineEventBus();
	const [expanded, setExpanded] = useState(false);

	const onExpandedClicked = () => setExpanded(true);
	const onBlur = () => setExpanded(false);
	const onTriggerTypeClicked = (newType: PipelineTriggerType) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (newType === type) {
			if (!expanded) {
				setExpanded(true);
			}
		} else {
			pipeline.type = newType;
			setExpanded(false);
			fire(PipelineEventTypes.TRIGGER_TYPE_CHANGED, pipeline);
		}
	};
	const onIconClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setExpanded(!expanded);
	};

	const candidates = [PipelineTriggerType.INSERT_OR_MERGE, PipelineTriggerType.INSERT, PipelineTriggerType.MERGE, PipelineTriggerType.DELETE].filter(candidate => candidate !== type);

	return <TriggerContainer tabIndex={0} onClick={onExpandedClicked} onBlur={onBlur}>
		<TriggerOn active={true} expanded={expanded}
		           onClick={onTriggerTypeClicked(type)}>
			{TriggersLabel[type]}
		</TriggerOn>
		{candidates.map(candidate => {
			return <TriggerOn active={false} expanded={expanded}
			                  onClick={onTriggerTypeClicked(candidate)}
			                  key={candidate}>
				{TriggersLabel[candidate]}
			</TriggerOn>;
		})}
		<TriggerButton data-expanded={expanded} onClick={onIconClicked}>
			<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_CONTENT : ICON_EDIT}/>
		</TriggerButton>
	</TriggerContainer>;
};