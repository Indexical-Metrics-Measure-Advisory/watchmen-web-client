import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {PageTitleEditor} from '@/widgets/basic/page-title-editor';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes} from '../pipeline-event-bus-types';

export const NameEditor = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;

	const {fire} = usePipelineEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = async (name: string) => {
		pipeline.name = name;
		forceUpdate();
	};
	const onNameChangeComplete = async (name: string) => {
		pipeline.name = name.trim() || 'Noname';
		forceUpdate();
		fire(PipelineEventTypes.RENAME_PIPELINE, pipeline);
	};

	return <PageTitleEditor title={pipeline.name}
	                        defaultTitle="Noname"
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};