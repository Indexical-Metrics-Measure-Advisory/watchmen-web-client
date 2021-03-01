import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICON_SAVE } from '../../../../basic-widgets/constants';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { usePipelineEventBus } from '../pipeline-event-bus';
import { PipelineEventTypes } from '../pipeline-event-bus-types';
import { PipelineChangeLabel, PipelineSaveButton } from './widgets';

export const HeaderSaveButton = (props: { pipeline: Pipeline }) => {
	const { pipeline } = props;

	const { on, off, fire } = usePipelineEventBus();
	const [ changed, setChanged ] = useState(false);
	useEffect(() => {
		const onPipelineChanged = () => setChanged(true);
		const onPipelineSaved = (pipeline: Pipeline, saved: boolean) => {
			if (saved) {
				setChanged(false);
			}
		};
		on(PipelineEventTypes.TRIGGER_TYPE_CHANGED, onPipelineChanged);
		on(PipelineEventTypes.CONDITION_CHANGED, onPipelineChanged);
		on(PipelineEventTypes.STAGE_ADDED, onPipelineChanged);
		on(PipelineEventTypes.STAGE_REMOVED, onPipelineChanged);
		on(PipelineEventTypes.STAGE_CHANGED, onPipelineChanged);
		on(PipelineEventTypes.STAGE_SORTED, onPipelineChanged);

		on(PipelineEventTypes.PIPELINE_SAVED, onPipelineSaved);
		return () => {
			off(PipelineEventTypes.TRIGGER_TYPE_CHANGED, onPipelineChanged);
			off(PipelineEventTypes.CONDITION_CHANGED, onPipelineChanged);
			off(PipelineEventTypes.STAGE_ADDED, onPipelineChanged);
			off(PipelineEventTypes.STAGE_REMOVED, onPipelineChanged);
			off(PipelineEventTypes.STAGE_CHANGED, onPipelineChanged);
			off(PipelineEventTypes.STAGE_SORTED, onPipelineChanged);

			off(PipelineEventTypes.PIPELINE_SAVED, onPipelineSaved);
		};
	}, [ on, off ]);

	const onClicked = () => {
		// TODO validate pipeline first
		pipeline.enabled = true;
		fire(PipelineEventTypes.SAVE_PIPELINE, pipeline);
	};

	return <PipelineSaveButton tooltip='Save Pipeline'
	                           onClick={onClicked}
	                           changed={changed}>
		<FontAwesomeIcon icon={ICON_SAVE}/>
		{changed ? <PipelineChangeLabel>Pipeline Changed</PipelineChangeLabel> : null}
	</PipelineSaveButton>;
};