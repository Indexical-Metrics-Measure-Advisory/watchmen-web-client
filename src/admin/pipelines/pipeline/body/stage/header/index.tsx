import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent } from 'react';
import { ICON_DELETE } from '../../../../../../basic-widgets/constants';
import { ButtonInk } from '../../../../../../basic-widgets/types';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { Pipeline } from '../../../../../../services/tuples/pipeline-types';
import { LeadLabel } from '../../widgets';
import { useStageEventBus } from '../stage-event-bus';
import { StageEventTypes } from '../stage-event-bus-types';
import { HeaderButton, StageHeaderButtons, StageHeaderContainer, StageNameEditor, StageNameInput, StageNameLabel } from './widgets';

export const StageHeader = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
}) => {
	const { pipeline, stage } = props;

	const { fire } = useStageEventBus();
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
	const index = pipeline.stages.indexOf(stage) + 1;

	return <StageHeaderContainer>
		<LeadLabel>Stage #{index}:</LeadLabel>
		<StageNameEditor>
			<StageNameLabel>{stage.name || 'Noname'}</StageNameLabel>
			<StageNameInput value={stage.name || ''} onChange={onStageNameChanged}
			                placeholder='Noname'/>
		</StageNameEditor>
		<StageHeaderButtons>
			<HeaderButton ink={ButtonInk.PRIMARY}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
				<span>Prepend Stage</span>
			</HeaderButton>
			<HeaderButton ink={ButtonInk.DANGER}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
				<span>Delete This Stage</span>
			</HeaderButton>
		</StageHeaderButtons>
	</StageHeaderContainer>;
};