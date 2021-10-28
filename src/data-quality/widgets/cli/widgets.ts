import {TooltipButton} from '@/widgets/basic/tooltip-button';
import styled from 'styled-components';

export const CLIContainer = styled.div.attrs({'data-widget': 'cli'})`
	display        : flex;
	flex-direction : column;
	flex-grow      : 1;
	padding        : calc(var(--margin) / 2);
	height         : calc(100vh - var(--page-header-height));
`;

export const WorkingArea = styled.div.attrs({
	'data-widget': 'cli-working-area',
	'data-v-scroll': ''
})`
	display        : flex;
	flex-direction : column;
	flex-grow      : 1;
	margin-right   : calc(var(--margin) / -2);
	padding-right  : calc(var(--margin) / 2);
	overflow-y     : auto;
`;
export const CommandArea = styled.div.attrs({'data-widget': 'cli-command-area'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	border-radius  : calc(var(--border-radius) * 2);
	border         : var(--border);
	border-color   : var(--primary-color);
	margin-top     : var(--margin);
`;
export const CommandLine = styled.div.attrs({'data-widget': 'cli-command-line'})`
	display               : grid;
	align-items           : center;
	grid-template-columns : 1fr auto auto;
	grid-column-gap       : calc(var(--margin) / 4);
	padding               : 0 calc(var(--margin) / 4);
`;
export const CommandLineSeparator = styled.div`
	background-color : var(--primary-color);
	opacity          : 0.9;
	height           : calc(var(--tall-height) * 0.4);
	width            : 1px;
`;
export const CommandLineButtons = styled.div`
	display     : flex;
	align-items : center;
	> button:not(:first-child) {
		margin-left : calc(var(--margin) / 4);
	}
`;
export const CommandLineButton = styled(TooltipButton)`
	padding : 0;
	height  : var(--height);
	width   : var(--height);
	&[data-ink=waive] {
		color            : var(--border-color);
		background-color : transparent;
		cursor           : default;
		&:hover {
			box-shadow       : none;
			background-color : transparent;
		}
	}
	&:hover {
		box-shadow       : none;
		color            : var(--invert-color);
		background-color : var(--success-color);
	}
	> svg {
		font-size : 1.2em;
	}
`;
