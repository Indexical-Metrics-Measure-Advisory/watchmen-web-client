import styled from 'styled-components';
import { GRID_ROW_GAP } from '../../constants';

export const JointContainer = styled.div.attrs({ 'data-widget': 'joint' })`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-auto-rows        : minmax(var(--height), auto);
	grid-row-gap          : ${GRID_ROW_GAP};
`;
export const JointTypeWrapper = styled.div.attrs({ 'data-widget': 'joint-type-wrapper' })`
	display : flex;
`;
export const JointTypeContainer = styled.div.attrs({ 'data-widget': 'joint-type' })`
	display          : flex;
	position         : relative;
	align-items      : center;
	align-self       : center;
	justify-self     : start;
	font-variant     : petite-caps;
	font-weight      : var(--font-demi-bold);
	height           : var(--param-height);
	background-color : var(--param-bg-color);
	border-radius    : calc(var(--param-height) / 2);
	box-shadow       : var(--param-border);
	cursor           : pointer;
	outline          : none;
	transition       : box-shadow 300ms ease-in-out;
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		bottom           : 50%;
		left             : calc(var(--margin) / -2);
		width            : calc(var(--margin) / 2);
		height           : 1px;
		background-color : var(--border-color);
		z-index          : -1;
	}
`;
export const JointTypeOption = styled.div.attrs<{ active: boolean, expanded: boolean }>(({ active, expanded }) => {
	return {
		'data-widget': 'joint-type-option',
		style: {
			display: (expanded || active) ? (void 0) : 'none',
			backgroundColor: active ? (void 0) : 'var(--bg-color)',
			boxShadow: active ? (void 0) : 'var(--param-left-border)'
		}
	};
})<{ active: boolean, expanded: boolean }>`
	display      : flex;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	height       : var(--param-height);
	padding      : 0 calc(var(--margin) / 2);
	transition   : color 300ms ease-in-out;
	&:hover {
		color : ${({ active }) => active ? (void 0) : 'var(--warn-color)'};
	}
`;
export const JointTypeButton = styled.div.attrs({ 'data-widget': 'joint-type-button' })`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	padding         : 0 calc(var(--margin) / 2);
	width           : 20px;
	height          : 20px;
	&[data-expanded=true] {
		&:before {
			display : none;
		}
		> svg {
			transform  : rotateZ(180deg);
			transition : transform 300ms ease-in-out;
		}
	}
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 25%;
		left             : 0;
		width            : 1px;
		height           : 50%;
		background-color : var(--invert-color);
		opacity          : 0.5;
	}
	> svg {
		font-size : 0.8em;
	}
`;
export const RemoveJointButton = styled.div.attrs({ 'data-widget': 'joint-remove-button' })`
	display         : flex;
	position        : relative;
	align-self      : center;
	align-items     : center;
	justify-content : center;
	width           : var(--param-height);
	height          : var(--param-height);
	margin-left     : calc(var(--margin) / 2);
	border-radius   : 100%;
	box-shadow      : var(--param-border);
	opacity         : 0.7;
	cursor          : pointer;
	transition      : box-shadow 300ms ease-in-out, color 300ms ease-in-out, opacity 300ms ease-in-out;
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		bottom                    : 50%;
		left                      : calc(var(--margin) / -2);
		width                     : calc(var(--margin) / 2);
		height                    : 1px;
		background-color          : transparent;
		border-left               : var(--border);
		border-bottom             : var(--border);
		border-bottom-left-radius : var(--border-radius);
		z-index                   : -1;
	}
	&:hover {
		color      : var(--danger-color);
		opacity    : 1;
		box-shadow : var(--param-danger-border), var(--danger-hover-shadow);
	}
`;