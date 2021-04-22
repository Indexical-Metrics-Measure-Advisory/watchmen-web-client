import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_EXPAND_PANEL } from '../../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../../basic-widgets/page-header-buttons';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { usePipelineEventBus } from '../pipeline-event-bus';
import { PipelineEventTypes } from '../pipeline-event-bus-types';

export const HeaderExpandAllButton = (props: { pipeline: Pipeline }) => {
	const { pipeline } = props;

	const { fire } = usePipelineEventBus();

	const onExpandAllClicked = () => {
		fire(PipelineEventTypes.EXPAND_ALL, pipeline);
	};

	return <PageHeaderButton tooltip='Expand All'
	                         onClick={onExpandAllClicked}>
		<FontAwesomeIcon icon={ICON_EXPAND_PANEL}/>
	</PageHeaderButton>;
};