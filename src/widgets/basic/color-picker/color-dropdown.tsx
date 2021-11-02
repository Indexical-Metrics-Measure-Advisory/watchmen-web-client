import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useRef} from 'react';
import {ICON_CONFIRM, ICON_DISCARD} from '../constants';
import {ButtonInk} from '../types';
import {ColorCalculator} from './color-calculator';
import {ColorOverview} from './color-overview';
import {ColorPaletteAlpha, ColorPaletteHue} from './color-palette';
import {useColorPickerEventBus} from './color-picker-event-bus';
import {ColorPickerEventTypes} from './color-picker-event-bus-types';
import {ColorPreview} from './color-preview';
import {ColorResultHex} from './color-result-hex';
import {ColorResultRgba} from './color-result-rgba';
import {State} from './types';
import {ColorButtons, ColorConfirmButton, ColorDropdownContainer} from './widgets';

export const ColorDropdown = (props: {
	state: State;
	color: string;
	onDiscard: () => void;
	onSelected: (color?: string) => void;
}) => {
	const {state, color, onDiscard, onSelected} = props;

	const {fire} = useColorPickerEventBus();
	const dropdownRef = useRef<HTMLDivElement>(null);

	const onDiscardClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		onDiscard();
	};
	const onConfirmClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		fire(ColorPickerEventTypes.ASK_COLOR, (color?: string) => onSelected(color));
	};

	return <ColorDropdownContainer {...state} ref={dropdownRef}>
		<ColorOverview/>
		<ColorPreview/>
		<ColorPaletteHue/>
		<ColorPaletteAlpha/>
		<ColorResultHex/>
		<ColorResultRgba/>
		<ColorButtons>
			<ColorConfirmButton ink={ButtonInk.DANGER} onClick={onDiscardClicked}>
				<FontAwesomeIcon icon={ICON_DISCARD}/>
			</ColorConfirmButton>
			<ColorConfirmButton ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>
				<FontAwesomeIcon icon={ICON_CONFIRM}/>
			</ColorConfirmButton>
		</ColorButtons>
		<ColorCalculator color={color}/>
	</ColorDropdownContainer>;
};
