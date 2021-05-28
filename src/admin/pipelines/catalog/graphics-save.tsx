import React, {Fragment, useEffect, useState} from 'react';
import {useEventBus} from '../../../events/event-bus';
import {EventTypes} from '../../../events/types';
import {savePipelinesGraphics} from '../../../services/tuples/pipeline';
import {SAVE_TIMEOUT} from '../constants';
import {usePipelinesEventBus} from '../pipelines-event-bus';
import {PipelinesEventTypes} from '../pipelines-event-bus-types';
import {useCatalogEventBus} from './catalog-event-bus';
import {CatalogEventTypes} from './catalog-event-bus-types';
import {transformGraphicsToSave} from './graphics-utils';
import {AssembledPipelinesGraphics} from './types';
import {useAdminCacheEventBus} from '../../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../../cache/cache-event-bus-types';

interface SaveState {
	handle?: number;
}

export const GraphicsSave = (props: { graphics?: AssembledPipelinesGraphics }) => {
	const {graphics: assembledGraphics} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireCache} = useAdminCacheEventBus();
	const {fire: firePipelines} = usePipelinesEventBus();
	const {on, off} = useCatalogEventBus();
	const [, setState] = useState<SaveState>({});
	useEffect(() => {
		const onGraphicsChange = () => {
			if (assembledGraphics) {
				const graphics = transformGraphicsToSave(assembledGraphics);
				firePipelines(PipelinesEventTypes.GRAPHICS_CHANGED, graphics);
				setState(({handle}) => {
					// eslint-disable-next-line
					if (handle) {
						clearTimeout(handle);
					}
					return {
						handle: window.setTimeout(() => {
							fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
								async () => await savePipelinesGraphics(graphics),
								() => fireCache(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, graphics)
							);
						}, SAVE_TIMEOUT)
					};
				});
			}
		};
		on(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
		};
	}, [on, off, firePipelines, fireGlobal, fireCache, assembledGraphics]);

	return <Fragment/>;
};