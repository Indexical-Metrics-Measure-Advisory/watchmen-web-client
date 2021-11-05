import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';
import {StepTitleButton} from '../step-widgets';

export const NameInput = styled(Input)`
	width         : 100%;
	height        : calc(var(--height) * 1.2);
	line-height   : calc(var(--height) * 1.1);
	border-width  : 2px;
	border-color  : var(--primary-color);
	border-radius : calc(var(--height) * 0.6) 0 0 calc(var(--height) * 0.6);
	padding-left  : calc(var(--height) * 0.6);
	font-size     : 1.2em;
	+ button {
		border-top-left-radius    : 0;
		border-bottom-left-radius : 0;
	}
`;
export const SaveButton = styled(StepTitleButton)`
	> svg {
		margin-right : calc(var(--margin) / 2);
	}
`;