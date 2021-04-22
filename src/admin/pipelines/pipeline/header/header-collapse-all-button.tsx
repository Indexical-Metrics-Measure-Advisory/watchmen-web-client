import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_COLLAPSE_PANEL } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { usePipelineEventBus } from '../pipeline-event-bus';
import { PipelineEventTypes } from '../pipeline-event-bus-types';

export const HeaderCollapseAllButton = (props: { pipeline: Pipeline }) => {
	const { pipeline } = props;

	const { fire } = usePipelineEventBus();

	const onCollapseAllClicked = () => {
		fire(PipelineEventTypes.COLLAPSE_ALL, pipeline);
	};

	return <PageHeaderButton tooltip='Collapse All to Units'
	                         onClick={onCollapseAllClicked}>
		<FontAwesomeIcon icon={ICON_COLLAPSE_PANEL}/>
	</PageHeaderButton>;
};