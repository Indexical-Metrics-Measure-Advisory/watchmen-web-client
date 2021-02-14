import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_SAVE } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { usePipelineEventBus } from '../pipeline-event-bus';
import { PipelineEventTypes } from '../pipeline-event-bus-types';

export const HeaderSaveButton = (props: { pipeline: Pipeline }) => {
	const { pipeline } = props;

	const { fire } = usePipelineEventBus();

	const onClicked = () => {
		// TODO validate pipeline first
		pipeline.enabled = true;
		fire(PipelineEventTypes.SAVE_PIPELINE, pipeline);
	};

	return <PageHeaderButton tooltip='Save Pipeline'
	                         onClick={onClicked}>
		<FontAwesomeIcon icon={ICON_SAVE}/>
	</PageHeaderButton>;
};