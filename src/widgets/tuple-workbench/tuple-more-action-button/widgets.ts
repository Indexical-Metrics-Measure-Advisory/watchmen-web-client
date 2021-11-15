import styled from 'styled-components';
import {Button} from '../../basic/button';

export const TupleMoreActionButton = styled(Button).attrs({'data-widget': 'tuple-more-action-button'})`
	font-variant     : petite-caps;
	font-weight      : var(--font-bold);
	font-size        : 1.4em;
	height           : 44px;
	background-color : var(--border-color);
	padding          : 0 var(--margin);
	border-radius    : 0 calc(var(--border-radius) * 2) calc(var(--border-radius) * 2) 0;
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
	&:not(:last-child) {
		border-radius : 0;
	}
	> svg {
		font-size    : 0.7em;
		margin-right : calc(var(--margin) / 2);
	}
`;
