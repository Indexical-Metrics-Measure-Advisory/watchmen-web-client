import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';

export const WorkbenchContainer = styled.div.attrs({'data-widget': 'cli-report-workbench'})`
	display: grid;
	position: relative;
	grid-template-columns: auto 1fr;
	height: var(--tall-height);
	align-items: center;
`;
export const PickedCommands = styled.div.attrs({'data-widget': 'cli-picked-commands'})`
	display: flex;
	position: relative;
	align-items: center;
	padding: 0 calc(var(--margin) / 2) 0 calc(var(--margin) / 4);
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
	height: calc(var(--height) * 0.8);
	border-radius: calc(var(--height) * 0.4);
	font-variant: petite-caps;
	&:not(:first-child) {
		margin-left: calc(var(--margin) / 8);
	}
`;
export const WorkbenchInput = styled(Input)`
	border: 0;
	justify-self: stretch;
`;
