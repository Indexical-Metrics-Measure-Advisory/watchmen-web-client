import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {ICON_DISABLE} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes} from '../pipeline-event-bus-types';

export const HeaderDisableButton = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;

	const {fire} = usePipelineEventBus();

	const onClicked = () => {
		pipeline.enabled = false;
		fire(PipelineEventTypes.TOGGLE_PIPELINE_ENABLED, pipeline);
	};

	return <PageHeaderButton tooltip="Disable Pipeline"
	                         onClick={onClicked}>
		<FontAwesomeIcon icon={ICON_DISABLE}/>
	</PageHeaderButton>;
};