import styled, {keyframes} from 'styled-components';

export const ExecutionContainer = styled.div.attrs({'data-widget': 'cli-execution'})`
	display: grid;
	position: relative;
	grid-template-columns: 32px auto 1fr;
	grid-template-rows: var(--tall-height) 1fr;
	align-items: center;
	+ div[data-widget=execution] {
		margin-top: calc(var(--margin) / 4);
	}
`;
export const ExecutionPrompt = styled.div.attrs({'data-widget': 'cli-execution-prompt'})`
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
export const ExecutionPromptFlicker = styled.div.attrs({'data-widget': 'cli-execution-prompt-flicker'})`
	display: flex;
	background-color: var(--font-color);
	height: calc(var(--font-size) * 1.3);
	width: 0.6em;
	border-radius: 1px;
	animation: ${Flick} 1.2s linear infinite;
`;
export const ExecutionCommandLine = styled.div.attrs({'data-widget': 'cli-execution-command-line'})`
	display: flex;
	font-family: var(--code-font-family);
	font-size: 1.1em;
	opacity: 0.9;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
export const ExecutionCommandLinePrimary = styled.span.attrs({'data-widget': 'cli-execution-command-line-primary'})`
	color: var(--danger-color);
	font-weight: var(--font-boldest);
`;
export const ExecutionCommandLineArgument = styled.span.attrs({'data-widget': 'cli-execution-command-line-argument'})`
	margin-left: 0.5em;
`;
export const ExecutionTimeContainer = styled.div.attrs({'data-widget': 'cli-execution-time'})`
	display: flex;
	position: relative;
	align-items: center;
	font-family: var(--code-font-family);
	font-weight: var(--font-bold);
	overflow: hidden;
`;
export const ExecutionTimeLine = styled.span.attrs({'data-widget': 'cli-execution-time-line'})`
	display: block;
	flex-grow: 1;
	height: 1px;
	border-top: var(--border);
	border-top-style: dashed;
	margin: 0 var(--margin);
`;
export const ExecutionTimeLabel = styled.span.attrs({'data-widget': 'cli-execution-time-label'})`
	display: block;
	position: relative;
	height: 1.6em;
	line-height: 1.6em;
	padding: 0 calc(var(--margin) / 4) 0 calc(var(--margin) / 2);
	border-radius: 0.8em 0 0 0.8em;
	overflow: hidden;
	&:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--info-color);
		opacity: 0.3;
		z-index: -1;
	}
`;
export const ExecutionLockButton = styled.span.attrs({'data-widget': 'cli-execution-lock'})`
	display: flex;
	position: relative;
	align-items: center;
	height: 1.6em;
	line-height: 1.6em;
	padding: 0 calc(var(--margin) / 3);
	border-radius: 0 0.8em 0.8em 0;
	cursor: pointer;
	overflow: hidden;
	&:before {
		content: '';
		display: block;
		position: absolute;
		top: 30%;
		left: 0;
		width: 1px;
		height: 40%;
		background-color: var(--border-color);
		z-index: 1;
		filter: brightness(2);
	}
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--info-color);
		opacity: 0.3;
		z-index: -2;
	}
	> svg {
		font-size: 0.8em;
	}
`;
export const ExecutionResult = styled.div.attrs({'data-widget': 'cli-execution-result'})`
	grid-column: 2 / span 2;
	display: flex;
`;
export const ExecutionResultItemTable = styled.div.attrs({'data-widget': 'cli-execution-result-table'})`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: var(--margin);
	min-width: 900px;
`;
export const ExecutionResultItem = styled.div.attrs({'data-widget': 'cli-execution-result-item'})`
	display: flex;
	align-items: flex-start;
	min-height: var(--height);
	padding: 4px 0;
	line-height: 20px;
`;
export const ExecutionResultClickableItem = styled(ExecutionResultItem)`
	cursor: pointer;
	text-decoration: underline;
`;
export const ExecutionResultNoData = styled.div.attrs({'data-widget': 'cli-execution-result-no-data'})`
	display: flex;
	align-items: center;
	height: var(--height);
	grid-column: span 3;
`;

export const HelpTable = styled.div.attrs({'data-widget': 'help-table'})`
	display: grid;
	align-items: center;
	grid-template-columns: auto 1fr;
	grid-column-gap: var(--margin);
`;
export const LeadHelpCommandName = styled.div`
	display: flex;
	align-items: center;
	line-height: 20px;
	padding: 4px 0;
	grid-column: span 2;
	font-weight: var(--font-bold);
	color: var(--warn-color);
`;
export const HelpCommandName = styled.div.attrs(({onClick}) => {
	return {
		style: {
			cursor: onClick ? 'pointer' : (void 0),
			textDecoration: onClick ? 'underline' : (void 0)
		}
	};
})`
	display: flex;
	align-self: start;
	align-items: center;
	line-height: 20px;
	padding: 4px 0;
	white-space: nowrap;
`;
export const HelpCommandDescription = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	align-items: center;
	line-height: 20px;
	padding: 4px 0;
	word-break: break-word;
	> span {
		display: block;
	}
`;
export const HelpCommandExample = styled.span`
	display: flex;
	align-items: center;
	color: var(--warn-color);
	font-weight: var(--font-bold);
	+ span {
		margin-left: 3em;
	}
`;