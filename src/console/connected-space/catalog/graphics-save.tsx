import React, { Fragment, useEffect, useState } from 'react';
import { saveConnectedSpaceGraphics } from '../../../services/tuples/connected-space';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { useConsoleEventBus } from '../../console-event-bus';
import { ConsoleEventTypes } from '../../console-event-bus-types';
import { useCatalogEventBus } from './catalog-event-bus';
import { CatalogEventTypes } from './catalog-event-bus-types';
import { SAVE_TIMEOUT } from './constants';
import { transformGraphicsToSave } from './graphics-utils';
import { AssembledConnectedSpaceGraphics } from './types';

interface SaveState {
	timeoutHandle?: number;
	save?: () => void;
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
				const save = async () => {
					setState({ connectedSpace, assembledGraphics });
					await saveConnectedSpaceGraphics(connectedSpace, graphics);
				};
				setState({
					connectedSpace, assembledGraphics,
					timeoutHandle: window.setTimeout(save, SAVE_TIMEOUT),
					save
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
		if (connectedSpace !== state.connectedSpace || assembledGraphics !== state.assembledGraphics) {
			if (state.timeoutHandle) {
				clearTimeout(state.timeoutHandle);
				state.save && state.save();
			}
			// reset state
			setState({ connectedSpace, assembledGraphics });
		}
	}, [ connectedSpace, assembledGraphics, state ]);

	return <Fragment/>;
};