import React, {MouseEvent, RefObject, useEffect, useRef, useState} from 'react';
import {useColorPickerEventBus} from './color-picker-event-bus';
import {ColorPickerEventTypes} from './color-picker-event-bus-types';
import {PALETTE_WIDTH} from './constants';
import {AlphaColorPalette, ColorSlider, HueColorPalette} from './widgets';

const useDragging = (options: {
	containerRef: RefObject<HTMLDivElement>;
	indicatorRef: RefObject<HTMLDivElement>;
	onChange: (x: number, width: number) => void;
}) => {
	const {containerRef, indicatorRef, onChange} = options;

	const [dragging, setDragging] = useState(false);
	const [indicatorX, setIndicatorX] = useState<number>(PALETTE_WIDTH);
	const computeIndicator = (clientX: number) => {
		if (!containerRef.current || !indicatorRef.current) {
			return;
		}
		const {left, width} = containerRef.current.getBoundingClientRect();
		const x = Math.min(Math.max(clientX - left, 0), PALETTE_WIDTH);
		onChange(x, width);
	};
	const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		setDragging(true);
		computeIndicator(event.clientX);
	};
	const onRelease = () => {
		setDragging(false);
	};
	const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (!dragging) {
			return;
		}
		computeIndicator(event.clientX);
	};
	return {
		onMouseDown, onMouseMove, onRelease,
		setIndicatorX, indicatorX
	};
};

export const ColorPaletteHue = () => {
	const {on, off, fire} = useColorPickerEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const indicatorRef = useRef<HTMLDivElement>(null);
	const onChange = (x: number, width: number) => {
		fire(ColorPickerEventTypes.HUE_CHANGED, 1 - x / width);
	};
	const {onMouseDown, onRelease, onMouseMove, setIndicatorX, indicatorX} = useDragging({
		containerRef,
		indicatorRef,
		onChange
	});
	useEffect(() => {
		const onHueChanged = (hue: number) => {
			if (containerRef.current) {
				const {width} = containerRef.current.getBoundingClientRect();
				setIndicatorX((1 - hue) * width);
			}
		};
		on(ColorPickerEventTypes.HUE_CHANGED, onHueChanged);
		return () => {
			off(ColorPickerEventTypes.HUE_CHANGED, onHueChanged);
		};
	}, [on, off, setIndicatorX]);

	return <HueColorPalette onMouseDown={onMouseDown} onMouseUp={onRelease} onMouseLeave={onRelease}
	                        onMouseMove={onMouseMove}
	                        ref={containerRef}>
		<ColorSlider x={indicatorX} ref={indicatorRef}/>
	</HueColorPalette>;
};

export const ColorPaletteAlpha = () => {
	const {on, off, fire} = useColorPickerEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const indicatorRef = useRef<HTMLDivElement>(null);
	const [hex, setHex] = useState('');
	const onChange = (x: number, width: number) => {
		fire(ColorPickerEventTypes.ALPHA_CHANGED, x / width);
	};
	const {onMouseDown, onRelease, onMouseMove, setIndicatorX, indicatorX} = useDragging({
		containerRef,
		indicatorRef,
		onChange
	});
	useEffect(() => {
		on(ColorPickerEventTypes.RGB_CHANGED, setHex);
		return () => {
			off(ColorPickerEventTypes.RGB_CHANGED, setHex);
		};
	}, [on, off]);
	useEffect(() => {
		const onAlphaChanged = (alpha: number) => {
			if (containerRef.current) {
				const {width} = containerRef.current.getBoundingClientRect();
				setIndicatorX(alpha * width);
			}
		};
		on(ColorPickerEventTypes.ALPHA_CHANGED, onAlphaChanged);
		return () => {
			off(ColorPickerEventTypes.ALPHA_CHANGED, onAlphaChanged);
		};
	}, [on, off, setIndicatorX]);

	return <AlphaColorPalette onMouseDown={onMouseDown} onMouseUp={onRelease} onMouseLeave={onRelease}
	                          onMouseMove={onMouseMove}
	                          color={hex}
	                          ref={containerRef}>
		<ColorSlider x={indicatorX} ref={indicatorRef}/>
	</AlphaColorPalette>;
};

