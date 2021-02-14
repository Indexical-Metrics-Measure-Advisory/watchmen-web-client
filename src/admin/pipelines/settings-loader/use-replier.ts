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
		const onAskGraphics = () => fire(PipelinesEventTypes.REPLY_GRAPHICS, holdSettings.graphics);

		on(PipelinesEventTypes.ASK_PIPELINES, onAskPipelines);
		on(PipelinesEventTypes.ASK_TOPICS, onAskTopics);
		on(PipelinesEventTypes.ASK_GRAPHICS, onAskGraphics);
		return () => {
			off(PipelinesEventTypes.ASK_PIPELINES, onAskPipelines);
			off(PipelinesEventTypes.ASK_TOPICS, onAskTopics);
			off(PipelinesEventTypes.ASK_GRAPHICS, onAskGraphics);
		};
	}, [ on, off, fire, holdSettings.pipelines, holdSettings.topics, holdSettings.graphics ]);
};