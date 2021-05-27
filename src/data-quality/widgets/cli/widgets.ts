import styled from 'styled-components';
import {TooltipButton} from '../../../basic-widgets/tooltip-button';
import {Input} from '../../../basic-widgets/input';

export const CLIContainer = styled.div.attrs({'data-widget': 'cli'})`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	padding: calc(var(--margin) / 2);
`;

export const WorkingArea = styled.div.attrs({'data-widget': 'cli-working-area'})`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	flex-grow: 1;
`;
export const CommandArea = styled.div.attrs({'data-widget': 'cli-command-area'})`
	display: flex;
	position: relative;
	flex-direction: column;
	border-radius: calc(var(--border-radius) * 2);
	border: var(--border);
	border-color: var(--primary-color);
	margin-top: calc(var(--margin) / 2);
`;
export const CommandLine = styled.div.attrs<{ pickedCount: number }>(({pickedCount}) => {
	return {
		'data-widget': 'cli-command-line',
		style: {
			gridTemplateColumns: pickedCount === 0 ? 'auto auto 1fr auto auto' : 'auto auto auto 1fr auto auto'
		}
	};
})<{ pickedCount: number }>`
	display: grid;
	align-items: center;
	grid-column-gap: calc(var(--margin) / 4);
	height: calc(var(--tall-height) * 1.2);
	padding: 0 calc(var(--margin) / 4);
`;
export const CommandLineSeparator = styled.div`
	background-color: var(--invert-color);
	opacity: 0.9;
	height: calc(var(--tall-height) * 0.6);
	width: 1px;
`;
export const CommandLineInput = styled(Input)`
	border: 0;
`;
export const CommandLineButton = styled(TooltipButton)`
	padding: 0;
	height: var(--height);
	width: var(--height);
	> svg {
		font-size: 1.2em;
	}
	&:hover {
		box-shadow: none;
		background-color: var(--primary-color);
	}
`;
export const CommandReminderLine = styled.div.attrs({'data-widget': 'cli-command-reminder-line'})`
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
		height: calc(var(--tall-height) * 0.6);
		width: 1px;
		background-color: var(--invert-color);
		opacity: 0.9;
		transform: translateY(-50%);
	}
`;
export const CommandReminder = styled.div`
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
export const CommandLineShortcuts = styled.div
	.attrs<{ itemCount: number, visible: boolean }>(({itemCount, visible}) => {
		return {
			'data-widget': 'cli-command-line-shortcuts',
			'data-v-scroll': '',
			style: {
				height: visible ? `calc(var(--tall-height) * ${Math.min(itemCount, 10)})` : 0
			}
		};
	})<{ itemCount: number, visible: boolean }>`
	display: block;
	position: absolute;
	bottom: calc(100% + var(--margin) / 4);
	border-radius: var(--border-radius);
	max-height: calc(var(--tall-height) * 10);
	min-width: 200px;
	background-color: var(--bg-color);
	box-shadow: var(--primary-hover-shadow);
	transition: height 150ms ease-in-out;
	overflow: hidden;
	z-index: 1;
`;
export const ShortcutMenu = styled.div`
	display: grid;
	position: relative;
	grid-template-columns: 32px 1fr;
	align-items: center;
	padding: 0 calc(var(--margin) / 2);
	height: var(--tall-height);
	cursor: pointer;
	&:hover {
		background-color: var(--hover-color);
	}
`;
export const ShortcutEmptyIcon = styled.div`
	display: block;
	width: var(--height);
	height: var(--height);
`;