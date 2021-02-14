import { useEffect } from 'react';
import { usePipelinesEventBus } from '../pipelines-event-bus';
import { PipelinesEventTypes } from '../pipelines-event-bus-types';
import { HoldSettings } from './types';

export const useReplier = (options: {
	holdSettings: HoldSettings
}) => {
	const { holdSettings } = options;
	const { on, off, fire } = usePipelinesEventBus();

	useEffect(() => {
		const onAskPipelines = () => fire(PipelinesEventTypes.REPLY_PIPELINES, holdSettings.pipelines);
		const onAskTopics = () => fire(PipelinesEventTypes.REPLY_TOPICS, holdSettings.topics);

		on(PipelinesEventTypes.ASK_PIPELINES, onAskPipelines);
		on(PipelinesEventTypes.ASK_TOPICS, onAskTopics);
		return () => {
			off(PipelinesEventTypes.ASK_PIPELINES, onAskPipelines);
			off(PipelinesEventTypes.ASK_TOPICS, onAskTopics);
		};
	}, [ on, off, fire, holdSettings.pipelines, holdSettings.topics ]);
};