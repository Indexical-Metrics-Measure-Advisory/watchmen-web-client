import { useEffect, useState } from 'react';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { usePipelineEventBus } from '../../pipeline-event-bus';
import { PipelineEventTypes } from '../../pipeline-event-bus-types';

export const PipelineDsl = (props: { pipeline: Pipeline, topics: Array<Topic> }) => {
	const { pipeline, topics } = props;

	const { on, off } = usePipelineEventBus();
	const [ visible, setVisible ] = useState(false);
	useEffect(() => {
		const onShowDsl = (ordered: Pipeline) => {
			if (ordered !== pipeline) {
				return;
			}
			setVisible(true);
		};
		on(PipelineEventTypes.SHOW_DSL, onShowDsl);
		return () => {
			off(PipelineEventTypes.SHOW_DSL, onShowDsl);
		};
	}, [ on, off ]);

	return <div>

	</div>;
};