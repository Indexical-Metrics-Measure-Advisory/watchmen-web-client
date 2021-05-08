import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_DSL} from '../../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../../basic-widgets/page-header-buttons';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes} from '../pipeline-event-bus-types';

export const HeaderDslButton = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;

	const {fire} = usePipelineEventBus();

	const onDslClicked = () => {
		fire(PipelineEventTypes.SHOW_DSL, pipeline);
	};

	return <PageHeaderButton tooltip="View in DSL"
	                         onClick={onDslClicked}>
		<FontAwesomeIcon icon={ICON_DSL}/>
	</PageHeaderButton>;
};