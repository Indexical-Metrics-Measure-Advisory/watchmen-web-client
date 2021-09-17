import {ReportRect} from '@/services/data/tuples/report-types';
import styled from 'styled-components';
import {Button} from '../basic/button';
import {CHART_DRAG_Z_INDEX} from '../basic/constants';
import {DragType} from './types';

export const ChartContainer = styled.div.attrs<{ rect: ReportRect, fixed: boolean }>(({rect, fixed}) => {
	return {
		'data-widget': 'chart-container',
		style: {
			position: fixed ? 'relative' : 'absolute',
			top: fixed ? (void 0) : rect.y,
			left: fixed ? (void 0) : rect.x,
			width: fixed ? '100%' : rect.width,
			height: fixed ? '100%' : rect.height
		}
	};
})<{ rect: ReportRect, fixed: boolean }>`
	display       : block;
	border-radius : var(--border-radius);
	overflow      : hidden;
	transition    : all 300ms ease-in-out;
	&:hover {
		box-shadow : ${({fixed}) => fixed ? 'none' : 'var(--hover-shadow)'};
		z-index    : 1;
		> div[data-widget="chart-drag-handle"] {
			> div[data-position=${DragType.DND}]:not([data-part-type=dragging]) {
				opacity : 1;
			}
			> div[data-widget="chart-buttons"] {
				opacity : 1;
			}
		}
	}
	// for paragraph, markdown editor
	> div.w-md-editor {
		height     : calc(100% - var(--margin));
		box-shadow : none;
		margin-top : var(--margin);
		> div.w-md-editor-toolbar {
			border        : 0;
			border-radius : 0;
		}
		div.w-md-editor-input {
			&::-webkit-scrollbar {
				background-color : transparent;
				width            : 4px;
				height           : 8px;
			}
			&::-webkit-scrollbar-track {
				background-color : var(--scrollbar-bg-color);
				border-radius    : 2px;
			}
			&::-webkit-scrollbar-thumb {
				background-color : var(--scrollbar-thumb-bg-color);
				border-radius    : 2px;
			}
		}
	}
	> div.wmde-markdown {
		margin-top : var(--margin);
	}
`;
export const ChartDragHandle = styled.div.attrs<{ dragging: boolean }>(({dragging}) => {
	return {
		'data-widget': 'chart-drag-handle',
		style: {clipPath: dragging ? (void 0) : 'polygon(0% 0%, 0% 100%, 6px 100%, 6px 40px, 100px 40px, 100px 6px, calc(100% - 6px) 6px, calc(100% - 6px) calc(100% - 6px), 6px calc(100% - 6px), 6px 100%, 100% 100%, 100% 0%)'}
	};
})<{ dragging: boolean }>`
	display        : flex;
	flex-direction : column;
	position       : absolute;
	top            : -3px;
	left           : -3px;
	width          : calc(100% + 6px);
	height         : calc(100% + 6px);
`;
export const ChartDragHandlePart = styled.div.attrs({'data-widget': 'chart-drag-handle-part'})`
	display  : block;
	position : absolute;
	&[data-position=${DragType.RESIZE_TOP}],
	&[data-position=${DragType.RESIZE_BOTTOM}] {
		left   : 6px;
		width  : calc(100% - 12px);
		cursor : row-resize;
	}
	&[data-position=${DragType.RESIZE_LEFT}],
	&[data-position=${DragType.RESIZE_RIGHT}] {
		top    : 6px;
		height : calc(100% - 12px);
		cursor : col-resize;
	}
	&[data-position^=${DragType.RESIZE_TOP}] {
		top    : 0;
		height : 6px;
	}
	&[data-position^=${DragType.RESIZE_BOTTOM}] {
		bottom : 0;
		height : 6px;
	}
	&[data-position$=left] {
		left  : 0;
		width : 6px;
	}
	&[data-position$=right] {
		right : 0;
		width : 6px;
	}
	&[data-position=${DragType.RESIZE_TOP_LEFT}] {
		cursor : nw-resize;
	}
	&[data-position=${DragType.RESIZE_TOP_RIGHT}] {
		cursor : ne-resize;
	}
	&[data-position=${DragType.RESIZE_BOTTOM_RIGHT}] {
		cursor : se-resize;
	}
	&[data-position=${DragType.RESIZE_BOTTOM_LEFT}] {
		cursor : sw-resize;
	}
	&[data-position=${DragType.DND}]:not([data-part-type=dragging]) {
		display         : flex;
		align-items     : center;
		justify-content : center;
		top             : 6px;
		left            : 6px;
		height          : 28px;
		width           : 20px;
		cursor          : move;
		color           : var(--waive-color);
		border-radius   : var(--border-radius);
		opacity         : 0;
		transition      : box-shadow 300ms ease-in-out, opacity 300ms ease-in-out, color 300ms ease-in-out;
		&:hover {
			color      : var(--warn-color);
			box-shadow : var(--hover-shadow);
		}
		> svg {
			font-size : 1.2em;
		}
	}
	&[data-part-type=dragging] {
		display  : none;
		position : fixed;
		top      : 0;
		left     : 0;
		width    : 100vw;
		height   : 100vh;
		z-index  : ${CHART_DRAG_Z_INDEX};
		&:not([data-position=${DragType.NONE}]) {
			display : block;
		}
		&[data-position=${DragType.DND}] {
			cursor : move;
			+ div[data-position=${DragType.DND}] {
				color      : var(--warn-color);
				box-shadow : var(--warn-hover-shadow);
			}
		}
	}
`;
export const ChartButtons = styled.div.attrs({'data-widget': 'chart-buttons'})`
	display         : flex;
	position        : absolute;
	align-items     : center;
	justify-content : center;
	top             : 6px;
	left            : 34px;
	height          : 28px;
	opacity         : 0;
	transition      : opacity 300ms ease-in-out;
`;
export const ChartButton = styled(Button).attrs({'data-widget': 'chart-button'})`
	padding : 0;
	height  : 24px;
	width   : 24px;
	&:not(:last-child) {
		margin-right : 8px;
	}
`;
