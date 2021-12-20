import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';
import {StepTitleButton} from '../../step-widgets';

export const NameInput = styled(Input)`
	width         : 100%;
	height        : calc(var(--height) * 1.2);
	line-height   : calc(var(--height) * 1.1);
	border-width  : 2px;
	border-right  : 0;
	border-color  : var(--primary-color);
	border-radius : calc(var(--height) * 0.6) 0 0 calc(var(--height) * 0.6);
	padding-left  : calc(var(--height) * 0.6);
	font-size     : 1.2em;
	+ button {
		border-radius : 0;
		&:last-child {
			border-top-right-radius    : calc(var(--height) * 0.6);
			border-bottom-right-radius : calc(var(--height) * 0.6);
		}
	}
	+ button + button {
		border-top-left-radius    : 0;
		border-bottom-left-radius : 0;
		&:before {
			content          : '';
			display          : block;
			position         : absolute;
			background-color : var(--invert-color);
			top              : 30%;
			left             : 0;
			height           : 40%;
			width            : 1px;
		}
	}
`;
export const SaveButton = styled(StepTitleButton)`
	> svg {
		margin-right : calc(var(--margin) / 2);
	}
`;