import styled from 'styled-components';
import { Button } from '../../../../basic-widgets/button';

export const TupleCreateButton = styled(Button).attrs({ 'data-widget': 'tuple-create-button' })`
	font-variant     : petite-caps;
	font-weight      : var(--font-bold);
	font-size        : 1.4em;
	height           : 44px;
	background-color : var(--border-color);
	padding          : 0 var(--margin);
	border-radius    : calc(var(--border-radius) * 2) 0 0 calc(var(--border-radius) * 2);
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 30%;
		right            : 0;
		width            : 1px;
		height           : 40%;
		background-color : var(--invert-color);
		opacity          : 0.7;
	}
	&:hover {
		z-index : 1;
	}
	> svg {
		font-size    : 0.7em;
		margin-right : calc(var(--margin) / 2);
	}
`;
