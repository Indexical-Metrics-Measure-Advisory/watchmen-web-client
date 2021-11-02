import Color from 'color';
import {Fragment, useEffect, useState} from 'react';
import {useColorPickerEventBus} from './color-picker-event-bus';
import {ColorPickerEventTypes} from './color-picker-event-bus-types';
import {hex2rgb, hsb2hsl, hsl2rgb, rgb2hex} from './utils';

interface CalculateFactors {
	alpha?: number;
	hue?: number;
	saturation?: number;
	brightness?: number;
}

export const ColorCalculator = (props: { color: string }) => {
	const {color} = props;

	const {on, off, fire} = useColorPickerEventBus();
	const [factors, setFactors] = useState<CalculateFactors>({});
	useEffect(() => {
		const onAlphaChanged = (alpha: number) => {
			setFactors(factors => ({...factors, alpha}));
		};
		const onHueChanged = (hue: number) => {
			setFactors(factors => ({...factors, hue: hue * 360}));
		};
		const onSaturationAndBrightnessChanged = (saturation: number, brightness: number) => {
			setFactors(factors => ({...factors, saturation, brightness}));
		};
		on(ColorPickerEventTypes.ALPHA_CHANGED, onAlphaChanged);
		on(ColorPickerEventTypes.HUE_CHANGED, onHueChanged);
		on(ColorPickerEventTypes.SATURATION_AND_BRIGHTNESS_CHANGED, onSaturationAndBrightnessChanged);
		return () => {
			off(ColorPickerEventTypes.ALPHA_CHANGED, onAlphaChanged);
			off(ColorPickerEventTypes.HUE_CHANGED, onHueChanged);
			off(ColorPickerEventTypes.SATURATION_AND_BRIGHTNESS_CHANGED, onSaturationAndBrightnessChanged);
		};
	}, [on, off]);
	useEffect(() => {
		const {alpha, brightness, hue, saturation} = factors;
		if (typeof alpha !== 'undefined' && typeof brightness !== 'undefined' && typeof hue !== 'undefined' && typeof saturation !== 'undefined') {
			const hsl = hsb2hsl(hue, saturation, brightness);
			const rgb = hsl2rgb(hsl.hue, hsl.saturation, hsl.lightness);
			const hex = rgb2hex(rgb.red, rgb.green, rgb.blue);
			const rgba = {...hex2rgb(hex), alpha};
			fire(ColorPickerEventTypes.RGB_CHANGED, hex);
			fire(ColorPickerEventTypes.RGBA_CHANGED, rgba.red, rgba.green, rgba.blue, rgba.alpha);
		}
	}, [factors, fire]);
	useEffect(() => {
		const computedColor = Color(color);
		const factors = {
			alpha: computedColor.alpha(),
			hue: computedColor.hue() / 360,
			saturation: computedColor.saturationv() / 100,
			brightness: computedColor.value() / 100
		};
		// will lead rgb & rgba changed event
		setFactors(factors);
		// fire hue changed event manually
		fire(ColorPickerEventTypes.HUE_CHANGED, factors.hue);
		fire(ColorPickerEventTypes.ALPHA_CHANGED, factors.alpha);
		fire(ColorPickerEventTypes.SATURATION_AND_BRIGHTNESS_CHANGED, factors.saturation, factors.brightness);
	}, [color, fire]);

	useEffect(() => {
		const onAskColor = (onData: (color?: string) => void) => {
			const {alpha, brightness, hue, saturation} = factors;
			if (typeof alpha !== 'undefined' && typeof brightness !== 'undefined' && typeof hue !== 'undefined' && typeof saturation !== 'undefined') {
				const hsl = hsb2hsl(hue, saturation, brightness);
				const rgb = hsl2rgb(hsl.hue, hsl.saturation, hsl.lightness);
				const hex = rgb2hex(rgb.red, rgb.green, rgb.blue);
				const rgba = {...hex2rgb(hex), alpha};
				onData(`rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${alpha})`);
			} else {
				// cannot build color
				onData();
			}
		};
		on(ColorPickerEventTypes.ASK_COLOR, onAskColor);
		return () => {
			off(ColorPickerEventTypes.ASK_COLOR, onAskColor);
		};
	}, [on, off, fire, factors]);

	return <Fragment/>;
};