import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import {useColorPickerEventBus} from './color-picker-event-bus';
import {ColorPickerEventTypes} from './color-picker-event-bus-types';
import {IndicatorState} from './types';
import {ColorIndicator, ColorOverviewContainer} from './widgets';

export const ColorOverview = () => {
	const {on, off, fire} = useColorPickerEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const indicatorRef = useRef<HTMLDivElement>(null);
	const [color, setColor] = useState('');
	const [dragging, setDragging] = useState(false);
	const [indicator, setIndicator] = useState<IndicatorState>({x: -6, y: -6});
	useEffect(() => {
		const onHueChanged = (hue: number) => {
			setColor(`hsl(${hue * 360}, 100%, 50%)`);
		};
		const onSaturationAndBrightnessChanged = (saturation: number, brightness: number) => {
			if (containerRef.current) {
				const {width, height} = containerRef.current.getBoundingClientRect();
				setIndicator(() => ({x: saturation * width, y: (1 - brightness) * height}));
			}
		};

		on(ColorPickerEventTypes.HUE_CHANGED, onHueChanged);
		on(ColorPickerEventTypes.SATURATION_AND_BRIGHTNESS_CHANGED, onSaturationAndBrightnessChanged);
		return () => {
			off(ColorPickerEventTypes.HUE_CHANGED, onHueChanged);
			off(ColorPickerEventTypes.SATURATION_AND_BRIGHTNESS_CHANGED, onSaturationAndBrightnessChanged);
		};
	}, [on, off]);

	const computeIndicator = (clientX: number, clientY: number) => {
		if (!containerRef.current || !indicatorRef.current) {
			return;
		}
		const {top, left, width, height} = containerRef.current.getBoundingClientRect();
		const x = clientX - left;
		const y = clientY - top;
		const saturation = x / width;
		const brightness = 1 - y / height;
		fire(ColorPickerEventTypes.SATURATION_AND_BRIGHTNESS_CHANGED, saturation, brightness);
	};
	const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		setDragging(true);
		computeIndicator(event.clientX, event.clientY);
	};
	const onRelease = () => {
		setDragging(false);
	};
	const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (!dragging) {
			return;
		}
		computeIndicator(event.clientX, event.clientY);
	};

	return <ColorOverviewContainer onMouseDown={onMouseDown} onMouseUp={onRelease} onMouseLeave={onRelease}
	                               onMouseMove={onMouseMove}
	                               color={color}
	                               ref={containerRef}>
		<ColorIndicator {...indicator} ref={indicatorRef}/>
	</ColorOverviewContainer>;
};