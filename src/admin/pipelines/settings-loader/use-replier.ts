import {Pipeline, PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useEffect} from 'react';
import {usePipelinesEventBus} from '../pipelines-event-bus';
import {PipelinesEventTypes} from '../pipelines-event-bus-types';
import {HoldSettings} from './types';

export const useReplier = (options: {
	holdSettings: HoldSettings
}) => {
	const {holdSettings} = options;
	const {on, off, fire} = usePipelinesEventBus();

	useEffect(() => {
		const onAskPipelines = (onData: (pipelines: Array<Pipeline>) => void) => onData(holdSettings.pipelines);
		const onAskTopics = (onData: (topics: Array<Topic>) => void) => onData(holdSettings.topics);
		const onAskGraphics = (onData: (graphics: Array<PipelinesGraphics>) => void) => onData(holdSettings.graphics);

		on(PipelinesEventTypes.ASK_PIPELINES, onAskPipelines);
		on(PipelinesEventTypes.ASK_TOPICS, onAskTopics);
		on(PipelinesEventTypes.ASK_GRAPHICS, onAskGraphics);
		return () => {
			off(PipelinesEventTypes.ASK_PIPELINES, onAskPipelines);
			off(PipelinesEventTypes.ASK_TOPICS, onAskTopics);
			off(PipelinesEventTypes.ASK_GRAPHICS, onAskGraphics);
		};
	}, [on, off, fire, holdSettings.pipelines, holdSettings.topics, holdSettings.graphics]);
};