import {saveConnectedSpaceGraphics} from '@/services/data/tuples/connected-space';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {Fragment, useEffect, useState} from 'react';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';
import {SAVE_TIMEOUT} from '../constants';
import {useCatalogEventBus} from './catalog-event-bus';
import {CatalogEventTypes} from './catalog-event-bus-types';
import {transformGraphicsToSave} from './graphics-utils';
import {AssembledConnectedSpaceGraphics} from './types';

interface SaveState {
	connectSpaceId?: string;
	handle?: number;
}

export const GraphicsSave = (props: {
	connectedSpace: ConnectedSpace;
	graphics?: AssembledConnectedSpaceGraphics
}) => {
	const {connectedSpace, graphics: assembledGraphics} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireConsole} = useConsoleEventBus();
	const {on, off} = useCatalogEventBus();
	const [, setState] = useState<SaveState>({});
	useEffect(() => {
		const onGraphicsChange = () => {
			if (assembledGraphics) {
				const graphics = transformGraphicsToSave(connectedSpace, assembledGraphics);
				fireConsole(ConsoleEventTypes.CONNECTED_SPACE_GRAPHICS_CHANGED, graphics);

				setState(({connectSpaceId, handle}) => {
					// if not the same connected space, just let it be
					// eslint-disable-next-line
					if (connectSpaceId == connectedSpace.connectId) {
						if (handle) {
							clearTimeout(handle);
						}
					}
					return {
						connectSpaceId: connectedSpace.connectId,
						handle: window.setTimeout(() => {
							fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
								async () => await saveConnectedSpaceGraphics(connectedSpace, graphics),
								() => {
								});
						}, SAVE_TIMEOUT)
					};
				});
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
	}, [on, off, fireConsole, fireGlobal, connectedSpace, assembledGraphics]);

	return <Fragment/>;
};