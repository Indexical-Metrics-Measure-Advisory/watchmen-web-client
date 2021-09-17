import {GraphicsPosition, GraphicsSize} from '@/services/data/graphics/graphics-types';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {CurrentRect} from './widgets';

const repaint = async (div: HTMLDivElement, ratio: number): Promise<(GraphicsPosition & GraphicsSize) | void> => {
	return new Promise(resolve => {
		const parent = div.parentElement;
		const body = parent?.parentElement;
		const svg = parent?.querySelector('svg');
		if (parent && body && svg) {
			const {width, height} = body.getBoundingClientRect();
			const {scrollTop, scrollLeft} = body;
			const {width: parentWidth, height: parentHeight} = parent.getBoundingClientRect();
			const {width: svgWidth, height: svgHeight} = svg.getBoundingClientRect();
			const x = parentWidth / 2 - svgWidth / 2 + scrollLeft * ratio;
			const y = parentHeight / 2 - svgHeight / 2 + scrollTop * ratio;
			resolve({x, y, width: width * ratio, height: height * ratio});
		} else {
			resolve();
		}
	});
};

export const Current = (props: {
	ratio: number;
}) => {
	const {ratio} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off} = useCatalogEventBus();
	const [rect, setRect] = useState<GraphicsPosition & GraphicsSize>({x: 0, y: 0, width: 0, height: 0});

	useLayoutEffect(() => {
		(async () => {
			if (ref.current) {
				const rect = await repaint(ref.current, ratio);
				if (rect) {
					setRect(rect);
				}
			}
		})();
	}, [ratio]);
	useEffect(() => {
		const onScrollOrResize = async () => {
			if (ref.current) {
				const rect = await repaint(ref.current, ratio);
				if (rect) {
					setRect(rect);
				}
			}
		};
		on(CatalogEventTypes.SCROLL, onScrollOrResize);
		on(CatalogEventTypes.RESIZE, onScrollOrResize);
		return () => {
			off(CatalogEventTypes.SCROLL, onScrollOrResize);
			off(CatalogEventTypes.RESIZE, onScrollOrResize);
		};
	}, [on, off, ratio]);

	return <CurrentRect rect={rect} ref={ref}/>;
};