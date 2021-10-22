import {Input} from '@/widgets/basic/input';
import {InputLines} from '@/widgets/basic/input-lines';
import {BooleanValueEditor} from '@/widgets/value-editor/boolean-value-editor';
import {ColorValueEditor} from '@/widgets/value-editor/color-value-editor';
import {DropdownValueEditor} from '@/widgets/value-editor/dropdown-value-editor';
import {NumberValueEditor} from '@/widgets/value-editor/number-value-editor';
import {PercentageValueEditor} from '@/widgets/value-editor/percentage-value-editor';
import {TextValueEditor} from '@/widgets/value-editor/text-value-editor';
import styled from 'styled-components';

export const SectionContainer = styled.div.attrs<{ expanded: boolean }>({'data-widget': 'chart-settings-section'})<{ expanded: boolean }>`
	display      : flex;
	position     : relative;
	grid-column  : 1 / span 2;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	font-size    : 1.1em;
	padding      : 0 calc(var(--margin) / 2);
	height       : calc(var(--height) * 2);
	cursor       : pointer;
	&:before {
		content             : '';
		display             : block;
		position            : absolute;
		left                : calc(var(--margin) / 4);
		top                 : 0;
		width               : calc(100% - var(--margin) / 4 * 3);
		height              : 1px;
		border-bottom       : var(--border);
		border-bottom-style : dashed;
		opacity             : 0.7;
	}
	&:after {
		content             : ${({expanded}) => expanded ? '\'\'' : (void 0)};
		display             : block;
		position            : absolute;
		left                : calc(var(--margin) / 4);
		bottom              : 0;
		width               : calc(100% - var(--margin) / 4 * 3);
		height              : 1px;
		border-bottom       : var(--border);
		border-bottom-style : dashed;
		opacity             : 0.7;
	}
	&:hover {
		> span:first-child,
		> svg {
			opacity : 1;
			color   : var(--primary-color);
		}
	}
	> span:first-child {
		flex-grow  : 1;
		opacity    : 0.7;
		transition : opacity 300ms ease-in-out, color 300ms ease-in-out;
	}
	> svg {
		font-size  : 0.8em;
		opacity    : 0.3;
		transition : opacity 300ms ease-in-out, color 300ms ease-in-out;
	}
`;
export const PropName = styled.div.attrs({'data-widget': 'chart-settings-prop-name'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : calc(var(--height) * 1.8 + 1px);
	padding       : 0 calc(var(--margin) / 2);
	font-weight   : var(--font-demi-bold);
	font-variant  : petite-caps;
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
	opacity       : 0.5;
	transition    : opacity 300ms ease-in-out, color 300ms ease-in-out;
	cursor        : default;
	&:hover {
		opacity : 1;
		color   : var(--primary-color);
	}
`;
export const PropValue = styled.div.attrs({'data-widget': 'chart-settings-prop-value'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	height       : calc(var(--height) * 1.8 + 1px);
	margin-right : calc(var(--margin) / 2);
`;
export const PropExclusiveValue = styled.div.attrs({'data-widget': 'chart-settings-prop-exclusive-value'})`
	grid-column   : 1 / span 2;
	display       : flex;
	align-items   : center;
	border-bottom : var(--border);
	&:last-child {
		border-bottom : 0;
	}
`;
export const PropValueUnit = styled.div.attrs({'data-widget': 'chart-settings-prop-value-unit'})`
	display          : flex;
	position         : absolute;
	align-items      : center;
	height           : calc(var(--height) - 1px);
	top              : calc(var(--height) * 0.4 + 1px);
	right            : 1px;
	font-variant     : petite-caps;
	background-color : var(--primary-color);
	color            : var(--invert-color);
	padding          : 0 calc(var(--margin) / 4);
	border-radius    : calc(var(--border-radius) * 1.5);
	transform        : scale(0.8);
	transform-origin : center;
	white-space      : nowrap;
	overflow         : hidden;
	opacity          : 0.7;
	pointer-events   : none;
`;
export const PropValueInput = styled(Input)`
	flex-grow : 1;
	width     : 0;
	height    : 60%;
`;
export const PropTextInput = styled(TextValueEditor)`
	flex-grow : 1;
	width     : 0;
	height    : 60%;
`;
export const PropNumberInput = styled(NumberValueEditor)`
	flex-grow : 1;
	width     : 0;
	height    : 60%;
`;
export const PropPercentageInput = styled(PercentageValueEditor)`
	flex-grow : 1;
	width     : 0;
	height    : 60%;
`;
export const PropValueInputLines = styled(InputLines)`
	flex-grow     : 1;
	width         : 0;
	border        : 0;
	border-radius : 0;
	padding-left  : calc(var(--margin) / 2);
	padding-right : calc(var(--margin) / 2);
`;
export const PropValueCheckBox = styled(BooleanValueEditor)`
	height        : var(--height);
	width         : var(--height);
	border-radius : var(--border-radius);
`;
export const PropValueColorPicker = styled(ColorValueEditor)`
	height : 60%;
`;
export const PropValueDropdown = styled(DropdownValueEditor)`
	flex-grow : 1;
	width     : 0;
	height    : 60%;
`;
