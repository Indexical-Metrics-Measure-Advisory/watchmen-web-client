import React, { Fragment, useEffect } from 'react';
import { useEventBus } from '../../../events/event-bus';
import { EventTypes } from '../../../events/types';
import { savePipelinesGraphics } from '../../../services/tuples/pipeline';
import { useCatalogEventBus } from './catalog-event-bus';
import { CatalogEventTypes } from './catalog-event-bus-types';
import { transformGraphicsToSave } from './graphics-utils';
import { AssembledPipelinesGraphics } from './types';

export const GraphicsSave = (props: { graphics?: AssembledPipelinesGraphics }) => {
	const { graphics: assembledGraphics } = props;

	const { fire: fireGlobal } = useEventBus();
	const { on, off } = useCatalogEventBus();
	useEffect(() => {
		const onGraphicsChange = () => {
			if (assembledGraphics) {
				const graphics = transformGraphicsToSave(assembledGraphics);
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await savePipelinesGraphics(graphics),
					() => {
					});
			}
		};
		on(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
		};
	}, [ on, off, fireGlobal, assembledGraphics ]);

	return <Fragment/>;
};