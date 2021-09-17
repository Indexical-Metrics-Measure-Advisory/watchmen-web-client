import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {ICON_DSL} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
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