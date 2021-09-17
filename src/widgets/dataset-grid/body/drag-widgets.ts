import styled from 'styled-components';
import {HEADER_HEIGHT, ROW_HEIGHT} from '../constants';

interface DragColumnRect {
	left?: number;
	width: number;
	height: number;
	movementX: number;
	visible: boolean;
}

export const DragColumnContainer = styled.div
	.attrs<DragColumnRect>((
		{left = 10, width, height, movementX, visible}
	) => {
		const rotate = Math.max(-10, Math.min(10, movementX / 10));
		return {
			'data-widget': 'dataset-grid-drag-column',
			style: {
				display: visible ? (void 0) : 'none',
				top: -1,
				left,
				width,
				height: height + 1,
				transform: `translateY(${HEADER_HEIGHT}px) rotate(${rotate}deg)`
			}
		};
	})<DragColumnRect>`
	display          : flex;
	flex-direction   : column;
	position         : absolute;
	overflow         : hidden;
	border-bottom    : var(--border);
	z-index          : 30;
	cursor           : move;
	pointer-events   : none;
	transform-origin : center center;
	box-shadow       : var(--warn-shadow);
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--warn-color);
		opacity          : 0.1;
		z-index          : 2;
	}
`;
export const DragColumnHeader = styled.div.attrs({'data-widget': 'dataset-grid-drag-column-header'})`
	display     : flex;
	align-items : stretch;
	min-height  : ${HEADER_HEIGHT + 1}px;
	z-index     : 1;
`;
export const DragColumnHeaderCell = styled.div.attrs({'data-widget': 'dataset-grid-drag-column-header-cell'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	font-size        : 0.8em;
	font-family      : var(--title-font-family);
	background-color : var(--bg-color);
	padding          : 0 8px;
	width            : 100%;
	border           : var(--border);
	> span {
		flex-grow     : 1;
		white-space   : nowrap;
		overflow      : hidden;
		text-overflow : ellipsis;
	}
`;
export const DragColumnBody = styled.div.attrs<{ firstRowOffsetY: number }>(({firstRowOffsetY}) => {
	return {
		'data-widget': 'dataset-grid-drag-column-body',
		style: {marginTop: 0 - firstRowOffsetY}
	};
})<{ firstRowOffsetY: number }>`
	display        : grid;
	justify-items  : stretch;
	align-items    : stretch;
	grid-auto-rows : ${ROW_HEIGHT}px;
`;
export const DragColumnBodyCell = styled.div.attrs({'data-widget': 'dataset-grid-drag-column-body-cell'})`
	display: flex;
	position: relative;
	align-items: center;
	font-size: 0.8em;
	padding: 1px 8px 0;
	background-color: var(--invert-color);
	border: var(--border);
	border-top: 0;
	> span {
		flex-grow: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;
