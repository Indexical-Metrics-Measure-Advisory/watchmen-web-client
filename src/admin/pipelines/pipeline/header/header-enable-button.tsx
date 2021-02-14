import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_ENABLE } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { usePipelineEventBus } from '../pipeline-event-bus';
import { PipelineEventTypes } from '../pipeline-event-bus-types';

export const HeaderEnableButton = (props: { pipeline: Pipeline }) => {
	const { pipeline } = props;

	const { fire } = usePipelineEventBus();

	const onClicked = () => {
		// TODO validate pipeline first
		pipeline.enabled = true;
		fire(PipelineEventTypes.TOGGLE_PIPELINE_ENABLED, pipeline);
	};

	return <PageHeaderButton tooltip='Enable Pipeline'
	                         onClick={onClicked}>
		<FontAwesomeIcon icon={ICON_ENABLE}/>
	</PageHeaderButton>;
};