import React, { useRef } from 'react';
import { ColorCalculator } from './color-calculator';
import { ColorOverview } from './color-overview';
import { ColorPaletteAlpha, ColorPaletteHue } from './color-palette';
import { ColorPreview } from './color-preview';
import { ColorResultHex } from './color-result-hex';
import { ColorResultRgba } from './color-result-rgba';
import { State } from './types';
import { ColorDropdownContainer } from './widgets';

export const ColorDropdown = (props: { state: State, color: string }) => {
	const { state, color } = props;

	const dropdownRef = useRef<HTMLDivElement>(null);

	return <ColorDropdownContainer {...state} ref={dropdownRef}>
		<ColorOverview/>
		<ColorPreview/>
		<ColorPaletteHue/>
		<ColorPaletteAlpha/>
		<ColorResultHex/>
		<ColorResultRgba/>
		<ColorCalculator color={color}/>
	</ColorDropdownContainer>;
};
