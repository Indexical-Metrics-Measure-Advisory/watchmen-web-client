import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {RoundDwarfButton} from '../../basic/button';
import {DROPDOWN_Z_INDEX} from '../../basic/constants';
import {Input} from '../../basic/input';
import {PickerDropdownPosition} from './tuple-item-picker-event-bus-types';

export const TupleItemPickerContainer = styled.div.attrs<{ 'data-widget'?: string }>(({'data-widget': widget}) => {
	return {
		'data-widget': widget || 'tuple-property-item-picker'
	};
})`
	display               : grid;
	grid-template-columns : 1fr;
	grid-template-rows    : var(--grid-tall-row-height) 1fr;
	position              : relative;
	align-self            : center;
	align-items           : center;
`;
export const TupleItemOperatorsContainer = styled.div.attrs({'data-widget': 'tuple-property-item-picker-operators'})`
	display  : block;
	position : relative;
	height   : var(--height);
	width    : 100%;
`;
export const TupleItemPickerSearchInput = styled(Input).attrs<{ 'data-widget'?: string, visible: boolean, dropdownPosition: PickerDropdownPosition }>(
	({'data-widget': widget, visible, dropdownPosition}) => {
		const dropdownAtBottom = dropdownPosition === PickerDropdownPosition.BOTTOM;
		return {
			'data-widget': widget || 'tuple-property-item-picker-button',
			style: {
				alignSelf: visible ? 'center' : (void 0),
				width: visible ? '100%' : (void 0),
				opacity: visible ? (void 0) : 0,
				pointerEvents: visible ? (void 0) : 'none',
				borderTopLeftRadius: dropdownAtBottom ? (void 0) : 0,
				borderTopRightRadius: dropdownAtBottom ? (void 0) : 0,
				borderBottomLeftRadius: dropdownAtBottom ? 0 : (void 0),
				borderBottomRightRadius: dropdownAtBottom ? 0 : (void 0)
			}
		};
	})<{ visible: boolean, dropdownPosition: PickerDropdownPosition }>`
	flex-grow : 0;
	width     : 0;
`;
export const TupleItemPickerButton = styled(RoundDwarfButton).attrs<{ 'data-widget'?: string, asClose: boolean }>(
	({'data-widget': widget, asClose}) => {
		return {
			'data-widget': widget || 'tuple-property-item-picker-button',
			style: {
				left: asClose ? 'calc(100% - 22px - 3px)' : (void 0),
				borderRadius: asClose ? 'var(--border-radius)' : (void 0),
				padding: asClose ? 0 : (void 0),
				width: asClose ? 22 : (void 0)
			}
		};
	})<{ asClose: boolean }>`
	position   : absolute;
	top        : calc((var(--height) - var(--button-height-in-form)) / 2);
	left       : 0;
	transition : all 300ms ease-in-out;
`;
export const TupleItemPickerButtonIcon = styled(FontAwesomeIcon).attrs<{ 'data-standalone': boolean }>(({'data-standalone': standalone}) => {
	return {
		'data-widget': 'tuple-property-item-picker-button-icon',
		style: {
			marginRight: standalone ? (void 0) : 0
		}
	};
})`
`;
export const TupleItemPickerButtonLabel = styled.span.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'tuple-property-item-picker-button-label',
		style: {
			width: visible ? (void 0) : 0,
			overflow: visible ? (void 0) : 'hidden'
		}
	};
})<{ visible: boolean }>`
`;

export interface TupleItemPickerDropdownState {
	visible: boolean;
	top?: number;
	bottom?: number;
	left: number;
	minWidth: number;
	atBottom: boolean;
}

export const TupleItemPickerDropdown = styled.div.attrs<TupleItemPickerDropdownState>(
	({visible, top, bottom, left, minWidth, atBottom}) => {
		return {
			'data-widget': 'tuple-property-item-picker-picked-dropdown',
			'data-h-scroll': '',
			style: {
				opacity: visible ? 1 : (void 0),
				pointerEvents: visible ? 'auto' : (void 0),
				top, bottom, left, width: minWidth,
				borderTopLeftRadius: atBottom ? 0 : (void 0),
				borderTopRightRadius: atBottom ? 0 : (void 0),
				borderBottomLeftRadius: atBottom ? (void 0) : 0,
				borderBottomRightRadius: atBottom ? (void 0) : 0
			}
		};
	})<TupleItemPickerDropdownState>`
	display          : flex;
	position         : fixed;
	flex-direction   : column;
	width            : 0;
	min-height       : var(--height);
	max-height       : calc(var(--height) * 8 + 2px);
	background-color : var(--bg-color);
	border           : var(--border);
	border-radius    : var(--border-radius);
	opacity          : 0;
	pointer-events   : none;
	overflow-x       : hidden;
	z-index          : ${DROPDOWN_Z_INDEX};
	transition       : opacity 300ms ease-in-out, width 300ms ease-in-out;
`;
export const TupleItemPickerDropdownReminder = styled.div.attrs({'data-widget': 'tuple-property-item-picker-picked-dropdown-reminder'})`
	display     : flex;
	align-items : center;
	height      : var(--height);
	padding     : 0 var(--input-indent);
	> svg {
		margin-right : calc(var(--margin) / 4);
	}
`;
export const TupleItemPickerDropdownCandidate = styled.div.attrs({'data-widget': 'tuple-property-item-picker-picked-dropdown-candidate'})`
	display     : flex;
	align-items : center;
	height      : var(--height);
	padding     : 0 var(--input-indent);
	cursor      : pointer;
	&:hover {
		background-color : var(--hover-color);
	}
`;
export const TupleItemPickerDropdownCandidateIcon = styled(FontAwesomeIcon).attrs<{ 'data-checked': boolean }>(
	({'data-checked': checked}) => {
		return {
			'data-widget': 'tuple-property-item-picker-picked-dropdown-candidate-icon',
			style: {
				opacity: checked ? (void 0) : 0
			}
		};
	})`
	font-size    : 0.9em;
	margin-right : calc(var(--margin) / 4);
`;
export const TupleItemPickerPickedItems = styled.div.attrs({'data-widget': 'tuple-property-item-picker-picked-items'})`
	display        : flex;
	flex-wrap      : wrap;
	margin-top     : -2px;
	margin-left    : calc(var(--margin) / -4);
	padding-bottom : calc((var(--grid-tall-row-height) - var(--button-height-in-form)) / 2);
	&:empty {
		padding-bottom : 0;
	}
`;
export const TupleItemPickerPickedItem = styled.div.attrs({'data-widget': 'tuple-property-item-picker-picked-item'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	height           : var(--button-height-in-form);
	padding-left     : calc(var(--margin) / 2);
	margin           : 2px 0 2px calc(var(--margin) / 4);
	color            : var(--invert-color);
	background-color : var(--primary-color);
	border-radius    : calc(var(--button-height-in-form) / 2);
	transition       : all 300ms ease-in-out;
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;
export const TupleItemPickerPickedItemLabel = styled.span.attrs({'data-widget': 'tuple-property-item-picker-picked-item-label'})`
	position      : relative;
	padding-right : calc(var(--margin) / 4);
	cursor        : default;
`;
export const TupleItemPickerPickedItemIcon = styled.div.attrs({'data-widget': 'tuple-property-item-picker-picked-item-icon'})`
	display                    : flex;
	position                   : relative;
	align-items                : center;
	height                     : var(--button-height-in-form);
	padding                    : 0 calc(var(--margin) / 3) 0 calc(var(--margin) / 4);
	border-top-right-radius    : calc(var(--button-height-in-form) / 2);
	border-bottom-right-radius : calc(var(--button-height-in-form) / 2);
	cursor                     : pointer;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 25%;
		left             : 0;
		width            : 1px;
		height           : 50%;
		background-color : var(--invert-color);
		opacity          : 0.7;
	}
	> svg {
		font-size : 0.9em;
	}
`;