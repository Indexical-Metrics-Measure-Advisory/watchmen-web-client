import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { useForceUpdate } from '../../../../../basic-widgets/utils';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { usePipelineEventBus } from '../../pipeline-event-bus';
import { PipelineEventTypes } from '../../pipeline-event-bus-types';
import { StageEditor } from '../stage';

export const Stages = (props: {
	pipeline: Pipeline;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const { pipeline, topic } = props;

	const { on, off } = usePipelineEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(PipelineEventTypes.STAGE_ADDED, forceUpdate);
		on(PipelineEventTypes.STAGE_REMOVED, forceUpdate);
		return () => {
			off(PipelineEventTypes.STAGE_ADDED, forceUpdate);
			off(PipelineEventTypes.STAGE_REMOVED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	return <>
		{pipeline.stages.map(stage => {
			return <StageEditor pipeline={pipeline} stage={stage} topic={topic}
			                    key={v4()}/>;
		})}
	</>;
};