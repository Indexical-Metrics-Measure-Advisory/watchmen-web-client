import {SAVE_TIMEOUT} from '@/services/constants';
import {savePipelinesGraphics} from '@/services/data/tuples/pipeline';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useThrottler} from '@/widgets/throttler';
import React, {Fragment, useEffect} from 'react';
import {useAdminCacheEventBus} from '../../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../../cache/cache-event-bus-types';
import {usePipelinesEventBus} from '../pipelines-event-bus';
import {PipelinesEventTypes} from '../pipelines-event-bus-types';
import {useCatalogEventBus} from './catalog-event-bus';
import {CatalogEventTypes} from './catalog-event-bus-types';
import {transformGraphicsToSave} from './graphics-utils';
import {AssembledPipelinesGraphics} from './types';

export const GraphicsSave = (props: { graphics?: AssembledPipelinesGraphics }) => {
	const {graphics: assembledGraphics} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireCache} = useAdminCacheEventBus();
	const {fire: firePipelines} = usePipelinesEventBus();
	const {on, off} = useCatalogEventBus();
	const saveQueue = useThrottler();
	useEffect(() => {
		const onGraphicsChange = () => {
			if (assembledGraphics) {
				const graphics = transformGraphicsToSave(assembledGraphics);
				firePipelines(PipelinesEventTypes.GRAPHICS_CHANGED, graphics);
				saveQueue.replace(() => {
					fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
						async () => await savePipelinesGraphics(graphics),
						() => fireCache(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, graphics)
					);
				}, SAVE_TIMEOUT);
			}
		};
		on(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
		on(CatalogEventTypes.NAME_CHANGED, onGraphicsChange);
		on(CatalogEventTypes.TOPICS_REPAINTED, onGraphicsChange);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
			off(CatalogEventTypes.NAME_CHANGED, onGraphicsChange);
			off(CatalogEventTypes.TOPICS_REPAINTED, onGraphicsChange);
		};
	}, [on, off, firePipelines, fireGlobal, fireCache, saveQueue, assembledGraphics]);

	return <Fragment/>;
};