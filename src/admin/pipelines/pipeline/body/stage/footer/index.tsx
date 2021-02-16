import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { AlertLabel } from '../../../../../../alert/widgets';
import {
	ICON_ADD,
	ICON_COLLAPSE_PANEL,
	ICON_DELETE,
	ICON_EXPAND_PANEL
} from '../../../../../../basic-widgets/constants';
import { ButtonInk } from '../../../../../../basic-widgets/types';
import { useEventBus } from '../../../../../../events/event-bus';
import { EventTypes } from '../../../../../../events/types';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { Pipeline } from '../../../../../../services/tuples/pipeline-types';
import { createStage } from '../../../../data-utils';
import { usePipelineEventBus } from '../../../pipeline-event-bus';
import { PipelineEventTypes } from '../../../pipeline-event-bus-types';
import { FooterButtons, FooterLeadLabel, HeaderButton } from '../../widgets';
import { useStageEventBus } from '../stage-event-bus';
import { StageEventTypes } from '../stage-event-bus-types';
import { StageFooterContainer } from './widgets';

export const StageFooter = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
}) => {
	const { pipeline, stage } = props;

	const { fire: fireGlobal } = useEventBus();
	const { fire: firePipeline } = usePipelineEventBus();
	const { fire } = useStageEventBus();
	const [ expanded, setExpanded ] = useState(true);
	const onCollapseClicked = () => {
		setExpanded(false);
		fire(StageEventTypes.COLLAPSE_CONTENT);
	};
	const onExpandClicked = () => {
		setExpanded(true);
		fire(StageEventTypes.EXPAND_CONTENT);
	};
	const onAppendClicked = () => {
		const nextStage = createStage();
		const index = pipeline.stages.indexOf(stage);
		pipeline.stages.splice(index + 1, 0, nextStage);
		firePipeline(PipelineEventTypes.STAGE_ADDED, nextStage, pipeline);
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

	return <StageFooterContainer>
		<FooterLeadLabel>End of Stage #{index}</FooterLeadLabel>
		<FooterButtons>
			{expanded
				? <HeaderButton ink={ButtonInk.PRIMARY} onClick={onCollapseClicked}>
					<FontAwesomeIcon icon={ICON_COLLAPSE_PANEL}/>
					<span>Collapse Stage</span>
				</HeaderButton>
				: null}
			{expanded
				? null
				: <HeaderButton ink={ButtonInk.PRIMARY} onClick={onExpandClicked}>
					<FontAwesomeIcon icon={ICON_EXPAND_PANEL}/>
					<span>Expand Stage</span>
				</HeaderButton>}
			<HeaderButton ink={ButtonInk.PRIMARY} onClick={onAppendClicked}>
				<FontAwesomeIcon icon={ICON_ADD}/>
				<span>Append Stage</span>
			</HeaderButton>
			{pipeline.stages.length !== 1
				? <HeaderButton ink={ButtonInk.DANGER} onClick={onDeleteClicked}>
					<FontAwesomeIcon icon={ICON_DELETE}/>
					<span>Delete This Stage</span>
				</HeaderButton>
				: null}
		</FooterButtons>
	</StageFooterContainer>;
};