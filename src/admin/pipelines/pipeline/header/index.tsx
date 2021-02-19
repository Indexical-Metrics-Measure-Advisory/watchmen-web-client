import React from 'react';
import { PageTitleEditor } from '../../../../basic-widgets/page-title-editor';
import { useForceUpdate } from '../../../../basic-widgets/utils';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { usePipelineEventBus } from '../pipeline-event-bus';
import { PipelineEventTypes } from '../pipeline-event-bus-types';
import { PipelineHeaderButtons } from './pipeline-header-buttons';
import { PageHeaderHolder } from './widgets';

export const PipelineHeader = (props: { pipeline: Pipeline }) => {
	const { pipeline } = props;

	const { fire } = usePipelineEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = async (name: string) => {
		pipeline.name = name;
		forceUpdate();
		// fire(PipelineEventTypes.RENAME_PIPELINE, pipeline);
	};
	const onNameChangeComplete = async (name: string) => {
		pipeline.name = name.trim() || 'Noname';
		forceUpdate();
		fire(PipelineEventTypes.RENAME_PIPELINE, pipeline);
	};

	return <PageHeaderHolder>
		<PageTitleEditor title={pipeline.name}
		                 defaultTitle='Noname'
		                 onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>
		<PipelineHeaderButtons pipeline={pipeline}/>
	</PageHeaderHolder>;
};
