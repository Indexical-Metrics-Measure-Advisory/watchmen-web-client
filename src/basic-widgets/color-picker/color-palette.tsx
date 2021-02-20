import React, { MouseEvent, RefObject, useEffect, useRef, useState } from 'react';
import { useColorPickerEventBus } from './color-picker-event-bus';
import { ColorPickerEventTypes } from './color-picker-event-bus-types';
import { PALETTE_WIDTH } from './constants';
import { AlphaColorPalette, ColorSlider, HueColorPalette } from './widgets';

const useDragging = (options: {
	containerRef: RefObject<HTMLDivElement>;
	indicatorRef: RefObject<HTMLDivElement>;
	onChange: (x: number, width: number) => void;
}) => {
	const { containerRef, indicatorRef, onChange } = options;

	const [ dragging, setDragging ] = useState(false);
	const [ indicatorX, setIndicatorX ] = useState<number>(PALETTE_WIDTH);
	const computeIndicator = (clientX: number) => {
		if (!containerRef.current || !indicatorRef.current) {
			return;
		}
		const { left, width } = containerRef.current.getBoundingClientRect();
		const x = Math.min(Math.max(clientX - left, 0), PALETTE_WIDTH);
		indicatorRef.current.style.transform = `translateX(${x}px)`;
		onChange(x, width);
	};
	const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		setDragging(true);
		computeIndicator(event.clientX);
	};
	const onRelease = () => {
		setDragging(false);
		const transform = indicatorRef.current?.style.transform;
		if (transform) {
			const x = parseInt(transform.replace('translateX(', '').replace('px)', ''));
			setIndicatorX(Math.min(Math.max(x, 0), PALETTE_WIDTH));
		}
	};
	const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (!dragging) {
			return;
		}
		computeIndicator(event.clientX);
	};
	return {
		onMouseDown, onMouseMove, onRelease,
		indicatorX
	};
};

export const ColorPaletteHue = () => {
	const { fire } = useColorPickerEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const indicatorRef = useRef<HTMLDivElement>(null);
	const onChange = (x: number, width: number) => {
		fire(ColorPickerEventTypes.HUE_CHANGED, 1 - x / width);
	};
	const { onMouseDown, onRelease, onMouseMove, indicatorX } = useDragging({ containerRef, indicatorRef, onChange });

	return <HueColorPalette onMouseDown={onMouseDown} onMouseUp={onRelease} onMouseLeave={onRelease}
	                        onMouseMove={onMouseMove}
	                        ref={containerRef}>
		<ColorSlider x={indicatorX} ref={indicatorRef}/>
	</HueColorPalette>;
};

export const ColorPaletteAlpha = () => {
	const { on, off, fire } = useColorPickerEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const indicatorRef = useRef<HTMLDivElement>(null);
	const [hex, setHex] = useState('');
	const onChange = (x: number, width: number) => {
		fire(ColorPickerEventTypes.ALPHA_CHANGED, x / width);
	};
	const { onMouseDown, onRelease, onMouseMove, indicatorX } = useDragging({ containerRef, indicatorRef, onChange });
	useEffect(() => {
		on(ColorPickerEventTypes.RGB_CHANGED, setHex);
		return () => {
			off(ColorPickerEventTypes.RGB_CHANGED, setHex);
		};
	}, [ on, off ]);

	return <AlphaColorPalette onMouseDown={onMouseDown} onMouseUp={onRelease} onMouseLeave={onRelease}
	                          onMouseMove={onMouseMove}
	                          color={hex}
	                          ref={containerRef}>
		<ColorSlider x={indicatorX} ref={indicatorRef}/>
	</AlphaColorPalette>;
};

