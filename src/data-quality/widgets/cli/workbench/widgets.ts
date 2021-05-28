import styled from 'styled-components';
import {Input} from '../../../../basic-widgets/input';

export const WorkbenchContainer = styled.div.attrs({'data-widget': 'cli-workbench'})`
`;
export const PickedCommands = styled.div.attrs({'data-widget': 'cli-picked-commands'})`
	display: flex;
	position: relative;
	align-items: center;
	padding-right: calc(var(--margin) / 4);
	&:after {
		content: '';
		display: block;
		position: absolute;
		right: 0;
		top: 50%;
		height: calc(var(--tall-height) * 0.4);
		width: 1px;
		background-color: var(--primary-color);
		opacity: 0.9;
		transform: translateY(-50%);
	}
`;
export const PickedCommand = styled.div.attrs({'data-widget': 'cli-picked-command'})`
	display: flex;
	align-items: center;
	color: var(--invert-color);
	background-color: var(--warn-color);
	padding: 0 calc(var(--margin) / 2);
	height: calc(var(--height) * 0.9);
	border-radius: calc(var(--height) * 0.45);
	font-variant: petite-caps;
	&:not(:first-child) {
		margin-left: calc(var(--margin) / 8);
	}
`;
export const WorkbenchInput = styled(Input)`
	border: 0;
`;
