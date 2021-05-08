import styled from 'styled-components';
import {GRID_ROW_GAP} from '../../constants';

export const ParameterAddContainer = styled.div.attrs({'data-widget': 'parameter-add'})`
	display      : flex;
	position     : relative;
	align-self   : stretch;
	justify-self : stretch;
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		top                       : calc((var(--margin) / 4 + var(--param-height) / 2) * -1);
		right                     : 100%;
		width                     : calc(var(--margin) / 2);
		height                    : calc(var(--margin) / 4 + var(--param-height));
		border-bottom-left-radius : var(--border-radius);
		z-index                   : -1;
		box-shadow                : var(--param-left-border), var(--param-bottom-border);
	}
	&:first-child:before {
		top           : calc(var(--param-height) / 2 - 1px);
		border-radius : 0;
		width         : calc(var(--margin) / 2);
		height        : 1px;
	}
	&:not(:last-child):after {
		content    : '';
		display    : block;
		position   : absolute;
		top        : calc(var(--param-height) / 2);
		right      : 100%;
		width      : calc(var(--margin) / 4);
		height     : calc(100% - var(--param-height) / 2);
		z-index    : -1;
		box-shadow : var(--param-left-border);
	}
`;
export const ParameterAddButton = styled.div.attrs({'data-widget': 'parameter-add-button'})`
	display       : flex;
	align-items   : center;
	height        : var(--param-height);
	padding       : 0 calc(var(--margin) / 2);
	border-radius : calc(var(--param-height) / 2);
	font-variant  : petite-caps;
	cursor        : pointer;
	box-shadow    : var(--param-border);
	opacity       : 0.7;
	transition    : box-shadow 300ms ease-in-out, color 300ms ease-in-out, opacity 300ms ease-in-out;
	> svg {
		font-size    : 0.8em;
		margin-right : calc(var(--margin) / 4);
	}
	&:hover {
		z-index    : 1;
		opacity    : 1;
		color      : var(--warn-color);
		box-shadow : var(--primary-hover-shadow);
	}
`;
export const SubParameterEditContainer = styled.div.attrs<{ shorten: boolean }>(({shorten}) => {
	return {
		'data-widget': 'parameter',
		style: {
			gridTemplateColumns: shorten ? 'minmax(0, auto) auto 1fr' : (void 0)
		}
	};
})<{ shorten: boolean }>`
	display               : grid;
	position              : relative;
	grid-template-columns : auto auto 1fr;
	grid-auto-rows        : minmax(var(--height), auto);
	grid-row-gap          : ${GRID_ROW_GAP};
	align-self            : stretch;
	justify-self          : stretch;
	&:before {
		content    : '';
		display    : block;
		position   : absolute;
		top        : calc(var(--height) / -2 - 2px);
		right      : 100%;
		width      : calc(var(--margin) / 2);
		height     : calc(var(--margin) / 4 + var(--param-height));
		z-index    : -1;
		box-shadow : var(--param-left-border), var(--param-bottom-border);
	}
	&:first-child:before {
		top           : calc(var(--height) / 2 - 2px);
		border-radius : 0;
		width         : var(--margin);
		height        : 1px;
	}
	&:not(:last-child):after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : calc(var(--height) / 2 - 2px);
		left             : calc(var(--margin) / -2 - 1px);
		width            : 1px;
		height           : calc(100% - var(--param-height) / 2);
		background-color : var(--border-color);
		z-index          : -1;
	}
	&:first-child:after {
		top : calc(var(--height) / 2 - 1px);
	}
`;
export const SubParameterConditionContainer = styled.div.attrs({'data-widget': 'parameter-condition'})`
	position    : relative;
	grid-column : 1 / span 3;
`;
export const RemoveMeButton = styled.div.attrs({'data-widget': 'remove-me-button'})`
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