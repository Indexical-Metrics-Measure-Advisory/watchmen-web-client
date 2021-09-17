import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent} from 'react';
import {useStageEventBus} from '../stage-event-bus';
import {StageEventTypes} from '../stage-event-bus-types';
import {StageNameEditor, StageNameInput, StageNameLabel} from './widgets';

export const NameEditor = (props: { stage: PipelineStage }) => {
	const {stage} = props;

	const {fire} = useStageEventBus();
	const forceUpdate = useForceUpdate();

	const onStageNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
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
		                placeholder="Noname"/>
	</StageNameEditor>;

};