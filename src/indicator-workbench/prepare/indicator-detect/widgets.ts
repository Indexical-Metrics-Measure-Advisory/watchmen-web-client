import {Button} from '@/widgets/basic/button';
import styled from 'styled-components';

export const IndicatorDetectButton = styled(Button).attrs({'data-widget': 'indicator-detect-button'})`
	font-variant     : petite-caps;
	font-weight      : var(--font-bold);
	font-size        : 1.4em;
	height           : 44px;
	background-color : var(--border-color);
	padding          : 0 var(--margin);
	border-radius    : 0 calc(var(--border-radius) * 2) calc(var(--border-radius) * 2) 0;
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
