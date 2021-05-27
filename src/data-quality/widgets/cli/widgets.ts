import styled, {keyframes} from 'styled-components';
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
	background-color: var(--primary-color);
	opacity: 0.9;
	height: calc(var(--tall-height) * 0.4);
	width: 1px;
`;
export const CommandLineInput = styled(Input)`
	border: 0;
`;
export const CommandLineButtons = styled.div`
	display: flex;
	align-items: center;
	> button:not(:first-child) {
		margin-left: calc(var(--margin) / 4);
	}
`;
export const CommandLineButton = styled(TooltipButton)`
	padding: 0;
	height: var(--height);
	width: var(--height);
	color: var(--primary-color);
	&[data-ink=success]:hover {
		background-color: var(--success-color);
	}
	&[data-ink=waive] {
		color: var(--border-color);
		background-color: transparent;
		cursor: default;
		&:hover {
			box-shadow: none;
			background-color: transparent;
		}
	}
	&:hover {
		box-shadow: none;
		color: var(--invert-color);
		background-color: var(--primary-color);
	}
	> svg {
		font-size: 1.2em;
	}
`;
export const PickedCommandLine = styled.div.attrs({'data-widget': 'cli-command-reminder-line'})`
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
export const PickedCommand = styled.div`
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
	.attrs<{ itemCount: number, visible: boolean, transition: boolean }>(({itemCount, visible, transition}) => {
		return {
			'data-widget': 'cli-command-line-shortcuts',
			style: {
				height: visible ? `calc(var(--tall-height) * ${Math.min(itemCount, 8)} + var(--tall-height) + var(--margin) / 2)` : 0,
				transition: transition ? 'height 150ms ease-in-out' : (void 0)
			}
		};
	})<{ itemCount: number, visible: boolean, transition: boolean }>`
	display: block;
	position: absolute;
	bottom: calc(100% + var(--margin) / 4);
	border-radius: var(--border-radius);
	min-width: 200px;
	background-color: var(--bg-color);
	box-shadow: var(--primary-hover-shadow);
	overflow: hidden;
	z-index: 1;
`;
export const CommandShortcutsMenu = styled.div.attrs<{ itemCount: number }>(({itemCount}) => {
	return {
		'data-v-scroll': '',
		style: {
			height: `calc(var(--tall-height) * ${Math.min(itemCount, 8)})`
		}
	};
})<{ itemCount: number }>`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	overflow-x: hidden;
`;
export const CommandShortcutMenu = styled.div`
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
export const CommandShortcutFilter = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	border-top: var(--border);
	height: calc(var(--tall-height) + var(--margin) / 2);
	padding: calc(var(--margin) / 4);
	> svg {
		display: block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: calc(var(--margin) / 2 + 2px);
	}
`;
export const CommandShortcutFilterInput = styled(Input)`
	height: var(--tall-height);
	width: 100%;
	padding-left: calc(var(--margin) - 4px);
	border-radius: calc(var(--tall-height) / 2);
`;

export const ExecutionContainer = styled.div.attrs({'data-widget': 'execution'})`
	display: grid;
	position: relative;
	grid-template-columns: 32px 1fr;
	grid-template-rows: var(--tall-height) 1fr;
	align-items: center;
	+ div[data-widget=execution] {
		margin-top: calc(var(--margin) / 4);
	}
`;
export const ExecutionPrompt = styled.div`
	display: flex;
	color: var(--warn-color);
	font-size: 1.1em;
	justify-content: center;
`;
const Flick = keyframes`
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.2;
	}
`;
export const ExecutionPromptFlicker = styled.div`
	display: flex;
	background-color: var(--font-color);
	height: calc(var(--font-size) * 1.3);
	width: 0.6em;
	border-radius: 1px;
	animation: ${Flick} 1.2s linear infinite;
`;
export const ExecutionCommandLine = styled.div`
	display: flex;
	font-family: var(--code-font-family);
	font-size: 1.1em;
	opacity: 0.9;
`;
export const ExecutionCommandPrimary = styled.span`
	color: var(--danger-color);
	font-weight: var(--font-semi-bold);
`;
export const ExecutionCommandArgument = styled.span`
	margin-left: 0.5em;
`;
export const ExecutionCommandResult = styled.div`
	grid-column: 2;
`;
export const ExecutionResultItemTable = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
`;
export const ExecutionResultItem = styled.div`
	display: flex;
	align-items: center;
	height: var(--height);
`;
export const ExecutionResultClickableItem = styled(ExecutionResultItem)`
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;