import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AlertLabel } from '../../../alert/widgets';
import { FullWidthPage } from '../../../basic-widgets/page';
import { useEventBus } from '../../../events/event-bus';
import { EventTypes } from '../../../events/types';
import { Router } from '../../../routes/types';
import { Pipeline } from '../../../services/tuples/pipeline-types';
import { Topic } from '../../../services/tuples/topic-types';
import { usePipelinesEventBus } from '../pipelines-event-bus';
import { PipelinesEventTypes } from '../pipelines-event-bus-types';
import { PipelineDataSaver } from './data-saver';
import { PipelineNameEditor } from './header';
import { PipelineEventBusProvider } from './pipeline-event-bus';

interface WorkbenchData {
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
	pipeline?: Pipeline;
}

export const PipelineWorkbench = () => {
	const { pipelineId } = useParams<{ pipelineId: string }>();

	const history = useHistory();
	const { once: onceGlobal } = useEventBus();
	const { once: oncePipelines } = usePipelinesEventBus();
	const [ data, setData ] = useState<WorkbenchData>({ topics: [], pipelines: [] });
	useEffect(() => {
		oncePipelines(PipelinesEventTypes.REPLY_TOPICS, (topics: Array<Topic>) => {
			oncePipelines(PipelinesEventTypes.REPLY_PIPELINES, (pipelines: Array<Pipeline>) => {
				// eslint-disable-next-line
				const pipeline = pipelines.find(pipeline => pipeline.pipelineId == pipelineId);
				if (!pipeline) {
					onceGlobal(EventTypes.ALERT_HIDDEN, () => {
						history.replace(Router.ADMIN);
					}).fire(EventTypes.SHOW_ALERT, <AlertLabel>Given pipeline not found.</AlertLabel>);
				} else {
					setData({ topics, pipelines, pipeline });
				}
			}).fire(PipelinesEventTypes.ASK_PIPELINES);
		}).fire(PipelinesEventTypes.ASK_TOPICS);
	}, [ onceGlobal, oncePipelines, pipelineId, history ]);

	if (!data.pipeline) {
		return null;
	}

	return <PipelineEventBusProvider>
		<PipelineDataSaver/>
		<FullWidthPage>
			<PipelineNameEditor pipeline={data.pipeline}/>
		</FullWidthPage>
	</PipelineEventBusProvider>;

};