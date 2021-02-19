import React, { Fragment, useEffect, useState } from 'react';
import { savePipelinesGraphics } from '../../../services/tuples/pipeline';
import { SAVE_TIMEOUT } from '../constants';
import { useCatalogEventBus } from './catalog-event-bus';
import { CatalogEventTypes } from './catalog-event-bus-types';
import { transformGraphicsToSave } from './graphics-utils';
import { AssembledPipelinesGraphics } from './types';

interface SaveState {
	timeoutHandle?: number;
	assembledGraphics?: AssembledPipelinesGraphics
}

export const GraphicsSave = (props: { graphics?: AssembledPipelinesGraphics }) => {
	const { graphics: assembledGraphics } = props;

	const { on, off } = useCatalogEventBus();
	const [ state, setState ] = useState<SaveState>({ assembledGraphics });
	useEffect(() => {
		const onGraphicsChange = () => {
			if (assembledGraphics) {
				const graphics = transformGraphicsToSave(assembledGraphics);

				if (state.timeoutHandle) {
					clearTimeout(state.timeoutHandle);
				}
				setState({
					assembledGraphics,
					timeoutHandle: window.setTimeout(async () => {
						setState({ assembledGraphics });
						await savePipelinesGraphics(graphics);
					}, SAVE_TIMEOUT)
				});
			}
		};
		on(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onGraphicsChange);
		};
	}, [ on, off, assembledGraphics, state ]);

	return <Fragment/>;
};