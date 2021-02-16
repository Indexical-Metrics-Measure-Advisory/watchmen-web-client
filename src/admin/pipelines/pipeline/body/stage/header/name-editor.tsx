import React, { ChangeEvent } from 'react';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { useStageEventBus } from '../stage-event-bus';
import { StageEventTypes } from '../stage-event-bus-types';
import { StageNameEditor, StageNameInput, StageNameLabel } from './widgets';

export const NameEditor = (props: { stage: PipelineStage }) => {
	const { stage } = props;

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

	return <StageNameEditor>
		<StageNameLabel>{stage.name || 'Noname'}</StageNameLabel>
		<StageNameInput value={stage.name || ''} onChange={onStageNameChanged}
		                placeholder='Noname'/>
	</StageNameEditor>;

};