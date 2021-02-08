import styled from 'styled-components';

export const ComputedEditContainer = styled.div.attrs({ 'data-widget': 'parameter-computed-edit' })`
	display               : grid;
	grid-template-columns : auto 1fr;
	position              : relative;
	align-self            : stretch;
	align-items           : center;
	min-height            : var(--param-height);
`;
export const SubParametersContainer = styled.div.attrs({ 'data-widget': 'parameter-computed-body' })`
	display                    : grid;
	position                   : relative;
	grid-template-columns      : 1fr;
	grid-row-gap               : calc(var(--margin) / 4);
	align-self                 : stretch;
	justify-self               : stretch;
	min-height                 : var(--param-height);
	border-top-right-radius    : calc(var(--param-height) / 2);
	border-bottom-right-radius : calc(var(--param-height) / 2);
	padding-left               : 1px;
`;
export const ParameterAddContainer = styled.div.attrs({ 'data-widget': 'parameter-add' })`
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
		width                     : calc(var(--margin) / 4);
		height                    : calc(var(--margin) / 4 + var(--param-height));
		z-index                   : -1;
		border-bottom-left-radius : 2px;
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
export const ParameterAddButton = styled.div.attrs({ 'data-widget': 'parameter-add-button' })`
	display          : flex;
	align-items      : center;
	height           : var(--param-height);
	padding          : 0 calc(var(--margin) / 2);
	border-radius    : calc(var(--param-height) / 2);
	background-color : var(--primary-color);
	color            : var(--invert-color);
	font-variant     : petite-caps;
	cursor           : pointer;
	transition       : box-shadow 300ms ease-in-out;
	> svg {
		font-size    : 0.8em;
		margin-right : calc(var(--margin) / 4);
	}
	&:hover {
		box-shadow : var(--primary-hover-shadow);
	}
`;
export const SubParameterEditContainer = styled.div.attrs<{ shorten: boolean }>(({ shorten }) => {
	return {
		'data-widget': 'parameter',
		style: {
			gridTemplateColumns: shorten ? 'auto auto 1fr' : (void 0)
		}
	};
})<{ shorten: boolean }>`
	display               : grid;
	grid-template-columns : auto 1fr auto;
	grid-row-gap          : calc(var(--margin) / 4);
	position              : relative;
	align-self            : stretch;
	justify-self          : stretch;
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		top                       : calc((var(--margin) / 4 + var(--param-height) / 2) * -1);
		right                     : 100%;
		width                     : calc(var(--margin) / 4);
		height                    : calc(var(--margin) / 4 + var(--param-height));
		z-index                   : -1;
		border-bottom-left-radius : 2px;
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
	> div[data-widget="parameter-type-edit"] {
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
	}
`;