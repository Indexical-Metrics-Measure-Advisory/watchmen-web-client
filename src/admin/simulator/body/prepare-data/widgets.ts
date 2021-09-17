import {Button} from '@/widgets/basic/button';
import {TooltipButton} from '@/widgets/basic/tooltip-button';
import styled from 'styled-components';
import {NextStepButton, SimulatorBodyPartBody, SimulatorBodyPartRow} from '../widgets';

export enum TopicBlockType {
	ROOT = 'trigger by',
	WRITE_ONLY = 'write to',
	READ_ONLY = 'read from',
	READ_WRITE = 'read & write'
}

export const PrepareDataBodyPartBody = styled(SimulatorBodyPartBody)`
	grid-template-rows : 1fr;
`;
export const PrepareDataBodyPartRow = styled(SimulatorBodyPartRow)`
	grid-template-columns : 1fr;
	align-content         : start;
	margin                : calc(var(--margin) / -4);
	padding               : calc(var(--margin) / 4);
`;
export const BlockContainer = styled.div.attrs({'data-widget': 'block-container'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto auto 1fr;
	grid-template-rows    : var(--grid-row-height) 1fr;
	align-items           : center;
	div[data-widget='block-container'] {
		&:before {
			content          : '';
			display          : block;
			position         : absolute;
			top              : calc((var(--grid-row-height) - var(--height)) * -1);
			left             : calc(var(--margin) * -1);
			height           : calc(100% + var(--grid-row-height) - var(--height));
			width            : 1px;
			background-color : var(--border-color);
		}
		&:last-child:before {
			top    : calc((var(--grid-row-height) - var(--height)) * -1);
			height : calc(var(--grid-row-height) - var(--height) + var(--height) / 2);
		}
		div[data-widget='name-block']:before {
			content                   : '';
			display                   : block;
			position                  : absolute;
			top                       : calc(var(--height) / 2);
			left                      : calc(var(--margin) * -1);
			height                    : calc(var(--border-radius));
			width                     : var(--margin);
			border-bottom-left-radius : var(--border-radius);
			border-bottom             : var(--border);
			border-left               : var(--border);
		}
	}
`;

export const NameBlock = styled.div.attrs<{ expanded: boolean }>({'data-widget': 'name-block'})<{ expanded: boolean }>`
	display          : flex;
	align-items      : center;
	height           : var(--height);
	padding          : 0 calc(var(--margin) / 2);
	background-color : var(--border-color);
	font-variant     : petite-caps;
	font-weight      : var(--font-bold);
	border-radius    : calc(var(--height) / 2);
	overflow         : hidden;
	white-space      : nowrap;
	text-overflow    : ellipsis;
	transition       : box-shadow 300ms ease-in-out;
	cursor           : pointer;
	&:hover {
		box-shadow : var(--hover-shadow);
	}
	> svg {
		font-size    : 0.9em;
		margin-right : calc(var(--margin) / 4);
		transition   : transform 300ms ease-in-out;
		transform    : ${({expanded}) => expanded ? (void 0) : 'rotate(180deg)'};
	}
`;
export const PipelineName = styled.span.attrs<{ run: boolean }>(({run}) => {
	return {style: {color: run ? 'var(--info-color)' : ''}};
})<{ run: boolean }>`
	transition : color 300ms ease-in-out;
`;

export const TopicEditButton = styled.div`
	display          : flex;
	position         : relative;
	align-items      : center;
	justify-content  : center;
	height           : var(--height);
	width            : var(--height);
	margin-left      : calc(var(--margin) / 2);
	font-variant     : petite-caps;
	font-weight      : var(--font-bold);
	background-color : var(--border-color);
	border-radius    : calc(var(--height) * 2);
	transition       : box-shadow 300ms ease-in-out;
	cursor           : pointer;
	&:hover {
		box-shadow : var(--hover-shadow);
	}
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : calc(var(--height) / 2);
		left             : calc(var(--margin) / -2);
		height           : 1px;
		width            : calc(var(--margin) / 2);
		background-color : var(--border-color);
	}
`;
export const PlayButton = styled(NextStepButton).attrs({'data-widget': 'play-button'})`
	margin-left  : calc(var(--margin) / 2);
	justify-self : start;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : calc(var(--height) / 2);
		left             : calc(var(--margin) / -2);
		width            : calc(var(--margin) / 2);
		height           : 1px;
		background-color : var(--border-color);
	}
	> svg {
		font-size : 0.8em;
	}
`;
export const LoopButton = styled(TooltipButton).attrs({'data-widget': 'loop-button'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	justify-content  : center;
	height           : var(--height);
	width            : var(--height);
	margin-left      : calc(var(--margin) / 2);
	color            : var(--danger-color);
	background-color : var(--border-color);
	font-size        : 0.8em;
	border-radius    : 100%;
	transition       : box-shadow 300ms ease-in-out;
	cursor           : pointer;
	&:hover {
		box-shadow : var(--hover-shadow);
	}
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : calc(var(--height) / 2);
		left             : calc(var(--margin) / -2);
		height           : 1px;
		width            : calc(var(--margin) / 2);
		background-color : var(--border-color);
	}
`;

export const PipelineEditButtons = styled(TopicEditButton)`
	display               : grid;
	grid-template-columns : 1fr 1fr;
	width                 : unset;
	justify-items         : center;
	font-size             : 0.8em;
	> svg:first-child {
		margin-right : -4px;
	}
	> svg:last-child {
		margin-left : -4px;
		&:before {
			content          : '';
			display          : block;
			position         : absolute;
			top              : 0;
			left             : 0;
			height           : 100%;
			width            : 1px;
			background-color : var(--invert-color);
		}
	}
`;
export const PipelineEditButton = styled(TooltipButton)`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	height          : var(--height);
	width           : var(--height);
	padding         : 0;
	font-variant    : petite-caps;
	font-weight     : var(--font-bold);
	border-radius   : calc(var(--height) * 2);
	transition      : color 300ms ease-in-out;
	&:hover {
		color : var(--primary-color);
	}
	&:first-child {
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
		padding-left               : 4px;
	}
	&:last-child {
		border-top-left-radius    : 0;
		border-bottom-left-radius : 0;
		padding-right             : 2px;
		&:before {
			content          : '';
			display          : block;
			position         : absolute;
			top              : 30%;
			left             : 0;
			height           : 40%;
			width            : 1px;
			background-color : var(--invert-color);
			opacity          : 0.5;
		}
	}
	> svg {
		font-size : 0.8em;
	}
`;
export const ChildrenBlock = styled.div`
	align-self            : start;
	grid-column           : span 3;
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-auto-rows        : minmax(var(--grid-row-height), auto);
	margin-left           : calc(var(--margin) * 2);
`;

export const DialogHeader = styled.div`
	display     : flex;
	position    : relative;
	padding     : 0 var(--margin);
	min-height  : calc(var(--header-height) * 1.5);
	margin      : calc(var(--margin) * -1) calc(var(--margin) * -1) 0;
	align-items : center;
`;
export const DialogTitle = styled.div`
	font-family : var(--title-font-family);
	font-size   : 2.5em;
`;

export const DataTable = styled.div.attrs({
	'data-widget': 'data-table',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display        : flex;
	flex-direction : column;
	height         : calc(100% - var(--margin) / 2);
	margin-bottom  : calc(var(--margin) / 2);
	overflow       : auto;
`;
export const DataTableHeader = styled.div.attrs<{ columnCount: number }>(({columnCount}) => {
	return {
		'data-widget': 'data-table-header',
		style: {
			gridTemplateColumns: `40px ${new Array(columnCount).fill('140px').join(' ')}`,
			minWidth: `${40 + columnCount * 140}px`
		}
	};
})<{ columnCount: number }>`
	display       : grid;
	position      : sticky;
	top           : 0;
	border-bottom : var(--border);
	z-index       : 1;
`;
export const DataTableHeaderCell = styled.div.attrs({'data-widget': 'data-table-header-cell'})`
	display          : flex;
	align-items      : center;
	padding          : 0 calc(var(--margin) / 8);
	margin-bottom    : -1px;
	height           : var(--tall-height);
	font-weight      : var(--font-bold);
	font-size        : 1.2em;
	border-bottom    : var(--border);
	background-color : var(--bg-color);
	overflow         : hidden;
	white-space      : nowrap;
	text-overflow    : ellipsis;
`;
export const DataTableBodyRow = styled.div.attrs<{ columnCount: number }>(({columnCount}) => {
	return {
		'data-widget': 'data-table-body-row',
		style: {
			gridTemplateColumns: `40px ${new Array(columnCount).fill('140px').join(' ')}`,
			minWidth: `${40 + columnCount * 140}px`
		}
	};
})<{ columnCount: number }>`
	display  : grid;
	position : relative;
	z-index  : 0;
	&:nth-child(2n) {
		background-color : var(--grid-rib-bg-color);
	}
	&:hover > button {
		left : 0;
	}
`;

export const DataTableBodyCell = styled.div.attrs({'data-widget': 'data-table-body-cell'})`
	display     : flex;
	align-items : center;
	padding     : 0 calc(var(--margin) / 8);
	height      : var(--height);
	&:hover > input {
		box-shadow : var(--primary-shadow);
	}
	> input {
		height       : 22px;
		border-color : transparent;
		margin-left  : calc(var(--input-indent) * -1);
		margin-right : calc(var(--margin) / 8);
		&:focus {
			box-shadow : var(--primary-hover-shadow);
		}
	}
`;

export const RowDeleteButton = styled(Button)`
	position      : absolute;
	top           : calc(var(--height) / 2 - 10px);
	left          : -24px;
	height        : 20px;
	width         : 24px;
	border-radius : 0 10px 10px 0;
	padding       : 0;
	transition    : left 300ms ease-in-out;
`;
