import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import React, {Fragment, useEffect} from 'react';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';
import {useCatalogEventBus} from './catalog-event-bus';
import {CatalogEventTypes} from './catalog-event-bus-types';
import {transformGraphicsToSave} from './graphics-utils';
import {AssembledConnectedSpaceGraphics} from './types';

export const GraphicsSave = (props: {
	connectedSpace: ConnectedSpace;
	graphics?: AssembledConnectedSpaceGraphics
}) => {
	const {connectedSpace, graphics: assembledGraphics} = props;

	const {fire: fireConsole} = useConsoleEventBus();
	const {on, off} = useCatalogEventBus();
	useEffect(() => {
		const onGraphicsChange = () => {
			if (assembledGraphics) {
				const graphics = transformGraphicsToSave(connectedSpace, assembledGraphics);
				fireConsole(ConsoleEventTypes.CONNECTED_SPACE_GRAPHICS_CHANGED, graphics);
			}
		};
		on(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
		on(CatalogEventTypes.SUBJECT_MOVED, onGraphicsChange);
		on(CatalogEventTypes.REPORT_MOVED, onGraphicsChange);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
			off(CatalogEventTypes.SUBJECT_MOVED, onGraphicsChange);
			off(CatalogEventTypes.REPORT_MOVED, onGraphicsChange);
		};
	}, [on, off, fireConsole, connectedSpace, assembledGraphics]);

	return <Fragment/>;
};