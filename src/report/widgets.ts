import styled from 'styled-components';
import { CHART_DRAG_Z_INDEX } from '../basic-widgets/constants';
import { ReportRect } from '../services/tuples/report-types';
import { DragType } from './types';

export const ChartContainer = styled.div.attrs<{ rect: ReportRect }>(({ rect }) => {
	return {
		'data-widget': 'chart-container',
		style: {
			position: 'absolute',
			top: rect.y,
			left: rect.x,
			width: rect.width,
			height: rect.height,
			borderRadius: (void 0),
			zIndex: (void 0)
		}
	};
})<{ rect: ReportRect }>`
	display       : block;
	border-radius : var(--border-radius);
	overflow      : hidden;
	transition    : all 300ms ease-in-out;
	&:hover {
		box-shadow : var(--hover-shadow);
	}
`;
export const ChartDragHandle = styled.div.attrs({ 'data-widget': 'chart-drag-handle' })`
	display        : flex;
	flex-direction : column;
	position       : absolute;
	top            : -3px;
	left           : -3px;
	width          : calc(100% + 6px);
	height         : calc(100% + 6px);
	&:hover {
		> div[data-position=${DragType.DND}]:not([data-part-type=dragging]) {
			opacity : 1;
		}
	}
`;
export const ChartDragHandlePart = styled.div.attrs({ 'data-widget': 'chart-drag-handle-part' })`
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
