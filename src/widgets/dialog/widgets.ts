import styled from 'styled-components';
import {DIALOG_Z_INDEX} from '../basic/constants';

export const DialogContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'dialog',
		style: {
			opacity: visible ? 1 : (void 0),
			pointerEvents: visible ? 'auto' : (void 0)
		}
	};
})<{ visible: boolean }>`
	position         : fixed;
	top              : 0;
	left             : 0;
	width            : 100vw;
	height           : 100vh;
	background-color : transparent;
	opacity          : 0;
	pointer-events   : none;
	transition       : all 300ms ease-in-out;
	z-index          : ${DIALOG_Z_INDEX};
`;

export const DialogWrapper = styled.div.attrs({'data-widget': 'dialog-wrapper'})`
	margin-top       : 25vh;
	margin-left      : calc(50vw - 250px);
	width            : 500px;
	padding          : var(--margin) var(--margin) calc(var(--margin) / 2) var(--margin);
	display          : flex;
	flex-direction   : column;
	background-color : var(--bg-color);
	border-radius    : var(--border-radius);
	border           : var(--border);
	box-shadow       : var(--dialog-box-shadow);
`;

export const DialogHeader = styled.div`
	display     : flex;
	position    : relative;
	padding     : 0 var(--margin);
	min-height  : calc(var(--header-height) * 1.5);
	margin      : calc(var(--margin) * -1) calc(var(--margin) * -1) 0;
	align-items : center;
`;

export const DialogTitle = styled.div`
	font-family    : var(--title-font-family);
	font-size      : 1.2em;
	text-transform : uppercase;
`;

export const DialogBody = styled.div.attrs({'data-widget': 'dialog-body'})`
	flex-grow  : 1;
	min-height : 60px;
`;

export const DialogFooter = styled.div.attrs({'data-widget': 'dialog-footer'})`
	display         : flex;
	align-items     : center;
	justify-content : flex-end;
	> button {
		:not(:last-child) {
			margin-right : calc(var(--margin) / 4);
		}
	}
`;
export const DialogLabel = styled.span.attrs({'data-widget': 'dialog-label'})`
	font-variant : petite-caps;
	line-height  : var(--line-height);
	min-height   : var(--line-height);
`;