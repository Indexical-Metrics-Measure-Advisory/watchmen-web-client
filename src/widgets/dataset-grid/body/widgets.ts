import styled from 'styled-components';
import {TITLE_HEIGHT} from '../constants';

export const GridWrapperContainer = styled.div.attrs({'data-widget': 'dataset-grid-wrapper'})`
	display  : flex;
	position : absolute;
	top      : ${TITLE_HEIGHT}px;
	left     : 0;
	width    : 100%;
	height   : calc(100% - ${TITLE_HEIGHT}px);
	&[data-resize-state=pick-column],
	&[data-resize-state=ready-to-drag],
	&[data-resize-state=dragging] {
		cursor : move;
	}
	&[data-resize-state=can-resize],
	&[data-resize-state=resizing] {
		cursor : col-resize;
	}
`;
export const RowSelection = styled.div
	.attrs<{ index: number, top: number, height: number, scroll: number }>(({index, top, height, scroll}) => {
		return {
			'data-widget': 'dataset-grid-row-selection',
			style: {
				display: index === -1 ? 'none' : 'block',
				top,
				width: `calc(100% - ${scroll}px)`,
				height: height + 1
			}
		};
	})<{ index: number, top: number, height: number, scroll: number }>`
	position         : absolute;
	left             : 0;
	background-color : var(--warn-color);
	opacity          : 0.1;
	pointer-events   : none;
	transition       : top 300ms ease-in-out;
	z-index          : 10;
`;
export const ColumnSelection = styled.div
	.attrs<{ index: number, left: number, width: number, height: number, scroll: number }>(
		({index, left, width, height, scroll}
		) => {
			return {
				'data-widget': 'dataset-grid-column-selection',
				style: {
					display: index !== -1 ? 'block' : 'none',
					left,
					width: width,
					height: height === 0 ? `calc(100% + 1px - ${scroll}px)` : height
				}
			};
		})<{ index: number, left: number, width: number, height: number, scroll: number }>`
	position         : absolute;
	top              : 0;
	background-color : var(--warn-color);
	opacity          : 0.05;
	pointer-events   : none;
	transition       : left 300ms ease-in-out;
	z-index          : 10;
`;
export const GridResizeShade = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'grid-resize-shade',
		style: {width: visible ? '100%' : (void 0)}
	};
})<{ visible: boolean }>`
	display: block;
	position: absolute;
	z-index: 20;
	top: 0;
	left: 0;
	width: 0;
	height: 100%;
`;
