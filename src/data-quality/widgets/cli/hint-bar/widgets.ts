import {Button} from '@/widgets/basic/button';
import styled from 'styled-components';

export const HintBarContainer = styled.div.attrs({'data-widget': 'cli-hint-bar'})`
	display: flex;
	grid-column: span 3;
	height: var(--tall-height);
	border-bottom: var(--border);
	align-items: center;
	margin: 0 calc(var(--margin) / -4);
	padding: 0 calc(var(--margin) / 2) 0 calc(var(--margin) / 4 + var(--input-indent));
`;
export const HintButton = styled(Button).attrs({'data-widget': 'cli-hint'})`
	display: flex;
	position: relative;
	align-items: center;
	font-variant: none;
	color: var(--invert-color);
	padding: 0 calc(var(--margin) / 2);
	height: calc(var(--height) * 0.8);
	border-radius: var(--border-radius);
	overflow: hidden;
	&:not(:first-child) {
		margin-left: calc(var(--margin) / 4);
	}
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
`;
export const HintCommandButton = styled(HintButton)`
	&:after {
		background-color: var(--success-color);
	}
`;
export const HintNoCommandButton = styled(HintButton)`
	cursor: default;
	&:after {
		background-color: var(--waive-color);
	}
	&:hover {
		box-shadow: none;
	}
`;
export const HintOperateButton = styled(HintButton)`
	filter: invert(1);
	font-variant: petite-caps;
	&:after {
		background-color: var(--primary-color);
		opacity: 0.8;
	}
`;
export const HintSendButton = styled(HintButton)`
	font-variant: petite-caps;
	&:after {
		background-color: var(--success-color);
		transition: background-color 300ms ease-in-out;
	}
	&[disabled] {
		cursor: default;
		&:after {
			background-color: var(--waive-color);
		}
		&:hover {
			box-shadow: none;
		}
	}
`;

export const Placeholder = styled.div`
	flex-grow: 1;
`;
