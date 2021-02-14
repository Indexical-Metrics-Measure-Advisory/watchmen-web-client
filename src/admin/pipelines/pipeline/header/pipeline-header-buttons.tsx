import React, { useEffect } from 'react';
import { PageHeaderButtons, PageHeaderButtonSeparator } from '../../../../basic-widgets/page-header-buttons';
import { useForceUpdate } from '../../../../basic-widgets/utils';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { usePipelineEventBus } from '../pipeline-event-bus';
import { PipelineEventTypes } from '../pipeline-event-bus-types';
import { HeaderCatalogButton } from './header-catalog-button';
import { HeaderDisableButton } from './header-disable-button';
import { HeaderEnableButton } from './header-enable-button';
import { HeaderSaveButton } from './header-save-button';

export const PipelineHeaderButtons = (props: { pipeline: Pipeline }) => {
	const { pipeline } = props;

	const { on, off } = usePipelineEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onPipelineEnabledToggled = (changedPipeline: Pipeline) => {
			if (changedPipeline !== pipeline) {
				return;
			}
			forceUpdate();
		};
		on(PipelineEventTypes.PIPELINE_ENABLED_TOGGLED, onPipelineEnabledToggled);
		return () => {
			off(PipelineEventTypes.PIPELINE_ENABLED_TOGGLED, onPipelineEnabledToggled);
		};
	}, [ on, off, forceUpdate, pipeline ]);


	return <PageHeaderButtons>
		<HeaderSaveButton pipeline={pipeline}/>
		{pipeline.enabled
			? <HeaderDisableButton pipeline={pipeline}/>
			: <HeaderEnableButton pipeline={pipeline}/>}
		<PageHeaderButtonSeparator/>
		<HeaderCatalogButton/>
	</PageHeaderButtons>;
};