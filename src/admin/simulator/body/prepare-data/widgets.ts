import styled from 'styled-components';
import {SimulatorBodyPartBody, SimulatorBodyPartRow} from '../widgets';
import {TooltipButton} from '../../../../basic-widgets/tooltip-button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export enum TopicBlockType {
	ROOT = 'root',
	WRITE_ONLY = 'write',
	READ_ONLY = 'read',
	READ_WRITE = 'read-write'
}

export const PrepareDataBodyPartBody = styled(SimulatorBodyPartBody)`
	grid-template-rows: 1fr;
`;
export const PrepareDataBodyPartRow = styled(SimulatorBodyPartRow).attrs({
	'data-h-scroll': ''
})`
	grid-template-columns: 1fr;
	align-content: start;
	margin: calc(var(--margin) / -4);
	padding: calc(var(--margin) / 4);
	overflow-x: auto;
`;
export const BlockContainer = styled.div.attrs({'data-widget': 'block-container'})`
	display: grid;
	position: relative;
	grid-template-columns: auto auto 1fr;
	grid-template-rows: var(--grid-row-height) 1fr;
	align-items: center;
	div[data-widget='block-container'] {
		&:before {
			content: '';
			display: block;
			position: absolute;
			top: calc((var(--grid-row-height) - var(--height)) * -1);
			left: calc(var(--margin) * -1);
			height: calc(100% + var(--grid-row-height) - var(--height));
			width: 1px;
			background-color: var(--border-color);
		}
		&:last-child:before {
			top: calc((var(--grid-row-height) - var(--height)) * -1);
			height: calc(var(--grid-row-height) - var(--height) + var(--height) / 2);
		}
		div[data-widget='name-block']:before {
			content: '';
			display: block;
			position: absolute;
			top: calc(var(--height) / 2);
			left: calc(var(--margin) * -1);
			height: calc(var(--border-radius));
			width: var(--margin);
			border-bottom-left-radius: var(--border-radius);
			border-bottom: var(--border);
			border-left: var(--border);
		}
	}
`;

export const NameBlock = styled.div.attrs<{ expanded: boolean }>({'data-widget': 'name-block'})<{ expanded: boolean }>`
	display: flex;
	align-items: center;
	height: var(--height);
	padding: 0 calc(var(--margin) / 2);
	background-color: var(--border-color);
	font-variant: petite-caps;
	font-weight: var(--font-bold);
	border-radius: calc(var(--height) / 2);
	box-shadow: var(--shadow);
	transition: box-shadow 300ms ease-in-out;
	cursor: pointer;
	&:hover {
		box-shadow: var(--hover-shadow);
	}
	> svg {
		font-size: 0.9em;
		margin-right: calc(var(--margin) / 4);
		transition: transform 300ms ease-in-out;
		transform: ${({expanded}) => expanded ? (void 0) : 'rotate(180deg)'};
	}
`;
export const TopicRole = styled.span.attrs<{ type: TopicBlockType }>({})<{ type: TopicBlockType }>`
	margin: 0 calc(var(--margin) / 8);
	color: ${({type}) => {
		switch (type) {
			case TopicBlockType.READ_ONLY:
				return 'var(--info-color)';
			case TopicBlockType.WRITE_ONLY:
				return 'var(--info-color)';
			case TopicBlockType.READ_WRITE:
				return 'var(--info-color)';
			case TopicBlockType.ROOT:
				return 'var(--success-color)';
		}
	}};
	&:before {
		content: '(${({type}) => {
			switch (type) {
				case TopicBlockType.READ_ONLY:
					return 'READ';
				case TopicBlockType.WRITE_ONLY:
					return 'WRITE';
				case TopicBlockType.READ_WRITE:
					return 'READ-WRITE';
				case TopicBlockType.ROOT:
					return 'ROOT';
			}
		}})';
	}
`;
export const TopicEditButton = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	height: var(--height);
	width: var(--height);
	margin-left: calc(var(--margin) / 2);
	font-variant: petite-caps;
	font-weight: var(--font-bold);
	background-color: var(--border-color);
	border-radius: calc(var(--height) * 2);
	box-shadow: var(--shadow);
	transition: box-shadow 300ms ease-in-out;
	cursor: pointer;
	&:hover {
		box-shadow: var(--hover-shadow);
	}
	&:before {
		content: '';
		display: block;
		position: absolute;
		top: calc(var(--height) / 2);
		left: calc(var(--margin) / -2);
		height: 1px;
		width: calc(var(--margin) / 2);
		background-color: var(--border-color);
	}
`;

export const LoopButton = styled(TooltipButton).attrs({'data-widget': 'loop-button'})`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	height: var(--height);
	width: var(--height);
	margin-left: calc(var(--margin) / 2);
	color: var(--danger-color);
	background-color: var(--border-color);
	font-size: 0.8em;
	border-radius: 100%;
	box-shadow: var(--shadow);
	transition: box-shadow 300ms ease-in-out;
	cursor: pointer;
	&:hover {
		box-shadow: var(--hover-shadow);
	}
	&:before {
		content: '';
		display: block;
		position: absolute;
		top: calc(var(--height) / 2);
		left: calc(var(--margin) / -2);
		height: 1px;
		width: calc(var(--margin) / 2);
		background-color: var(--border-color);
	}
`;

export const PipelineEditButtons = styled(TopicEditButton)`
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: unset;
	justify-items: center;
	font-size: 0.8em;
	> svg:first-child {
		margin-right: -4px;
	}
	> svg:last-child {
		margin-left: -4px;
		&:before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 1px;
			background-color: var(--invert-color);
		}
	}
`;
export const PipelineEditButton = styled(TooltipButton)`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	height: var(--height);
	width: var(--height);
	padding: 0;
	font-variant: petite-caps;
	font-weight: var(--font-bold);
	border-radius: calc(var(--height) * 2);
	box-shadow: var(--shadow);
	transition: color 300ms ease-in-out;
	&:hover {
		color: var(--primary-color);
	}
	&:first-child {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		padding-left: 4px;
	}
	&:last-child {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		padding-right: 2px;
		&:before {
			content: '';
			display: block;
			position: absolute;
			top: 30%;
			left: 0;
			height: 40%;
			width: 1px;
			background-color: var(--invert-color);
			opacity: 0.5;
		}
	}
	> svg {
		font-size: 0.8em;
	}
`;
export const PipelineCheck = styled(FontAwesomeIcon).attrs<{ run: boolean }>(({run}) => {
	return {
		style: {
			color: run ? 'var(--warn-color)' : '',
			filter: run ? 'drop-shadow(2px 4px 6px rgba(255, 128, 0, 0.7))': ''
		}
	};
})<{ run: boolean }>`
	transition: color 300ms ease-in-out;
`;
export const ChildrenBlock = styled.div`
	align-self: start;
	grid-column: span 3;
	display: grid;
	position: relative;
	grid-template-columns: 1fr;
	grid-auto-rows: minmax(var(--grid-row-height), auto);
	margin-left: calc(var(--margin) * 2);
`;