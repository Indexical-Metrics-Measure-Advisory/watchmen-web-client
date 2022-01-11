import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {ICON_DISABLE} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {useForceUpdate} from '@/widgets/basic/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes} from '../pipeline-event-bus-types';

export const HeaderDisableButton = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;

	const {on, off, fire} = usePipelineEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTogglePipelineEnablement = () => forceUpdate();
		on(PipelineEventTypes.TOGGLE_PIPELINE_ENABLEMENT, onTogglePipelineEnablement);
		return () => {
			off(PipelineEventTypes.TOGGLE_PIPELINE_ENABLEMENT, onTogglePipelineEnablement);
		};
	}, [on, off, forceUpdate]);

	if (!pipeline.enabled) {
		return null;
	}

	const onClicked = () => {
		pipeline.enabled = false;
		fire(PipelineEventTypes.TOGGLE_PIPELINE_ENABLEMENT, pipeline);
	};

	return <PageHeaderButton tooltip="Disable Pipeline" onClick={onClicked}>
		<FontAwesomeIcon icon={ICON_DISABLE}/>
	</PageHeaderButton>;
};