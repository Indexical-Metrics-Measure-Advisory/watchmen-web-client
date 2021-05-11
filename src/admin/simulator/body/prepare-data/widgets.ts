import styled from 'styled-components';
import {SimulatorBodyPartBody, SimulatorBodyPartRow} from '../widgets';

export enum TopicBlockType {
	ROOT = 'root',
	WRITE_ONLY = 'write',
	READ_ONLY = 'read',
	READ_WRITE = 'read-write'
}

export const PrepareDataBodyPartBody = styled(SimulatorBodyPartBody)`
	grid-template-rows: var(--grid-row-height) 1fr;
`;
export const PrepareDataBodyPartRow = styled(SimulatorBodyPartRow)`
	grid-template-columns: 1fr;
	align-content: start;
`;
export const BlockContainer = styled.div.attrs({'data-widget': 'block-container'})`
	display: grid;
	position: relative;
	grid-template-columns: auto 1fr;
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
export const EditButton = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	height: var(--height);
	width: var(--height);
	margin-left: calc(var(--margin) / 2);
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

export const ChildrenBlock = styled.div`
	align-self: start;
	grid-column: span 2;
	display: grid;
	position: relative;
	grid-template-columns: 1fr;
	grid-auto-rows: minmax(var(--grid-row-height), auto);
	margin-left: calc(var(--margin) * 2);
`;