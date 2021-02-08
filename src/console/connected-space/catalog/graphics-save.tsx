import React, { Fragment, useEffect, useState } from 'react';
import { saveConnectedSpaceGraphics } from '../../../services/tuples/connected-space';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { useConsoleEventBus } from '../../console-event-bus';
import { ConsoleEventTypes } from '../../console-event-bus-types';
import { SAVE_TIMEOUT } from '../constants';
import { useCatalogEventBus } from './catalog-event-bus';
import { CatalogEventTypes } from './catalog-event-bus-types';
import { transformGraphicsToSave } from './graphics-utils';
import { AssembledConnectedSpaceGraphics } from './types';

interface SaveState {
	timeoutHandle?: number;
	connectedSpace: ConnectedSpace;
	assembledGraphics?: AssembledConnectedSpaceGraphics
}

export const GraphicsSave = (props: {
	connectedSpace: ConnectedSpace;
	graphics?: AssembledConnectedSpaceGraphics
}) => {
	const { connectedSpace, graphics: assembledGraphics } = props;

	const { fire: fireConsole } = useConsoleEventBus();
	const { on, off } = useCatalogEventBus();
	const [ state, setState ] = useState<SaveState>({ connectedSpace, assembledGraphics });
	useEffect(() => {
		const onGraphicsChange = () => {
			if (assembledGraphics) {
				const graphics = transformGraphicsToSave(connectedSpace, assembledGraphics);
				fireConsole(ConsoleEventTypes.CONNECTED_SPACE_GRAPHICS_CHANGED, graphics);

				if (state.timeoutHandle) {
					clearTimeout(state.timeoutHandle);
				}
				setState({
					connectedSpace, assembledGraphics,
					timeoutHandle: window.setTimeout(async () => {
						setState({ connectedSpace, assembledGraphics });
						await saveConnectedSpaceGraphics(connectedSpace, graphics);
					}, SAVE_TIMEOUT)
				});
			}
		};
		on(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
		on(CatalogEventTypes.SUBJECT_MOVED, onGraphicsChange);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
			off(CatalogEventTypes.SUBJECT_MOVED, onGraphicsChange);
		};
	}, [ on, off, fireConsole, connectedSpace, assembledGraphics, state ]);
	useEffect(() => {
		if (state.assembledGraphics && assembledGraphics !== state.assembledGraphics && state.timeoutHandle) {
			// there is a save in queue
			// clear queue
			clearTimeout(state.timeoutHandle);
			// save immediately
			const connectedSpace = state.connectedSpace;
			const graphics = transformGraphicsToSave(connectedSpace, state.assembledGraphics);
			(async () => await saveConnectedSpaceGraphics(connectedSpace, graphics))();
			// reset state
			setState({ connectedSpace, assembledGraphics });
		}
	}, [ connectedSpace, assembledGraphics, state.assembledGraphics, state.connectedSpace, state.timeoutHandle ]);

	return <Fragment/>;
};