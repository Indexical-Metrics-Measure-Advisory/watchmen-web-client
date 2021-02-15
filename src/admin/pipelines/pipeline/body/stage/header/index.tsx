import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useState } from 'react';
import { AlertLabel } from '../../../../../../alert/widgets';
import {
	ICON_ADD,
	ICON_COLLAPSE_PANEL,
	ICON_DELETE,
	ICON_EXPAND_PANEL
} from '../../../../../../basic-widgets/constants';
import { ButtonInk } from '../../../../../../basic-widgets/types';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { useEventBus } from '../../../../../../events/event-bus';
import { EventTypes } from '../../../../../../events/types';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { Pipeline } from '../../../../../../services/tuples/pipeline-types';
import { createStage } from '../../../../data-utils';
import { usePipelineEventBus } from '../../../pipeline-event-bus';
import { PipelineEventTypes } from '../../../pipeline-event-bus-types';
import { LeadLabel } from '../../widgets';
import { useStageEventBus } from '../stage-event-bus';
import { StageEventTypes } from '../stage-event-bus-types';
import {
	HeaderButton,
	StageHeaderButtons,
	StageHeaderContainer,
	StageNameEditor,
	StageNameInput,
	StageNameLabel
} from './widgets';

export const StageHeader = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
}) => {
	const { pipeline, stage } = props;

	const { fire: fireGlobal } = useEventBus();
	const { fire: firePipeline } = usePipelineEventBus();
	const { fire } = useStageEventBus();
	const [ expanded, setExpanded ] = useState(true);
	const forceUpdate = useForceUpdate();
	const onStageNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (value === stage.name) {
			return;
		}

		stage.name = value;
		forceUpdate();
		fire(StageEventTypes.RENAME_STAGE, stage);
	};
	const onCollapseClicked = () => {
		setExpanded(false);
		fire(StageEventTypes.COLLAPSE_CONTENT);
	};
	const onExpandClicked = () => {
		setExpanded(true);
		fire(StageEventTypes.EXPAND_CONTENT);
	};
	const onPrependClicked = () => {
		const stage = createStage();
		pipeline.stages.unshift(stage);
		firePipeline(PipelineEventTypes.STAGE_ADDED, stage, pipeline);
	};
	const onDeleteClicked = () => {
		if (pipeline.stages.length === 1) {
			fireGlobal(EventTypes.SHOW_ALERT,
				<AlertLabel>
					Cannot delete because of at lease one stage in pipeline.
				</AlertLabel>);
		} else {
			const index = pipeline.stages.indexOf(stage);
			if (index !== -1) {
				pipeline.stages.splice(index, 1);
				firePipeline(PipelineEventTypes.STAGE_REMOVED, stage, pipeline);
			}
		}
	};

	const index = pipeline.stages.indexOf(stage) + 1;

	return <StageHeaderContainer>
		<LeadLabel>Stage #{index}:</LeadLabel>
		<StageNameEditor>
			<StageNameLabel>{stage.name || 'Noname'}</StageNameLabel>
			<StageNameInput value={stage.name || ''} onChange={onStageNameChanged}
			                placeholder='Noname'/>
		</StageNameEditor>
		<StageHeaderButtons>
			{expanded
				? <HeaderButton onClick={onCollapseClicked}>
					<FontAwesomeIcon icon={ICON_COLLAPSE_PANEL}/>
					<span>Collapse Stage</span>
				</HeaderButton>
				: null}
			{expanded
				? null
				: <HeaderButton onClick={onExpandClicked}>
					<FontAwesomeIcon icon={ICON_EXPAND_PANEL}/>
					<span>Expand Stage</span>
				</HeaderButton>}
			<HeaderButton ink={ButtonInk.PRIMARY} onClick={onPrependClicked}>
				<FontAwesomeIcon icon={ICON_ADD}/>
				<span>Prepend Stage</span>
			</HeaderButton>
			{pipeline.stages.length !== 1
				? <HeaderButton ink={ButtonInk.DANGER} onClick={onDeleteClicked}>
					<FontAwesomeIcon icon={ICON_DELETE}/>
					<span>Delete This Stage</span>
				</HeaderButton>
				: null}
		</StageHeaderButtons>
	</StageHeaderContainer>;
};