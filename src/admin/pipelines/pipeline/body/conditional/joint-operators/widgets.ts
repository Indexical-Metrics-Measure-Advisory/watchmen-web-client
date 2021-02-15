import styled from 'styled-components';

export const JointOperatorsContainer = styled.div.attrs({ 'data-widget': 'joint-operators' })`
	display          : flex;
	position         : relative;
	align-items      : center;
	align-self       : center;
	justify-self     : start;
	font-variant     : petite-caps;
	font-weight      : var(--font-demi-bold);
	height           : var(--param-height);
	margin-left      : var(--margin);
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
		content                   : '';
		display                   : block;
		position                  : absolute;
		bottom                    : 50%;
		left                      : calc(var(--margin) / -2);
		width                     : calc(var(--margin) / 2);
		height                    : 100%;
		background-color          : transparent;
		border-left               : var(--border);
		border-bottom             : var(--border);
		border-bottom-left-radius : var(--border-radius);
		z-index                   : -1;
	}
`;
export const JointOperator = styled.div.attrs({ 'data-widget': 'join-operator' })`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : var(--param-height);
	padding     : 0 calc(var(--margin) / 2);
	transition  : box-shadow 300ms ease-in-out;
	&:not(:first-child):before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 30%;
		left             : 0;
		width            : 1px;
		height           : 40%;
		background-color : var(--invert-color);
		opacity          : 0.5;
		transition       : opacity 300ms ease-in-out;
	}
	&:first-child {
		border-top-left-radius    : calc(var(--param-height) / 2);
		border-bottom-left-radius : calc(var(--param-height) / 2);
	}
	&:last-child {
		border-top-right-radius    : calc(var(--param-height) / 2);
		border-bottom-right-radius : calc(var(--param-height) / 2);
	}
	&:hover {
		z-index    : 1;
		box-shadow : var(--primary-hover-shadow);
		&:not(:first-child):before {
			opacity : 0;
		}
	}
`;