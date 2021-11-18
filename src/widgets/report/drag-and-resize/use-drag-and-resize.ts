import {GraphicsPosition, GraphicsSize} from '@/services/data/graphics/graphics-types';
import {MouseEvent, RefObject, useState} from 'react';
import {CHART_MIN_HEIGHT, CHART_MIN_WIDTH} from '../constants';
import {DragType} from '../types';

interface DragState {
	top: number;
	left: number;
	width: number;
	height: number;
	type: DragType;
	startX: number;
	startY: number;
}

const resizeFromTop = (top: number, height: number, clientY: number, startY: number) => {
	let newHeight: number, newTop: number;
	if (clientY <= startY) {
		// more height gained from top
		newHeight = Math.max(height + startY - clientY, CHART_MIN_HEIGHT);
		newTop = Math.max(top + clientY - startY, 0);
	} else if (clientY - startY <= height) {
		// reduce height, but still on top of bottom border
		newHeight = Math.max(height - (clientY - startY), CHART_MIN_HEIGHT);
		newTop = Math.max(top + clientY - startY, 0);
	} else {
		// resize from top side, mouse client Y is under original bottom border
		// which means new height is min value, so just simply move top
		// and top is current mouse client Y
		newHeight = CHART_MIN_HEIGHT;
		newTop = Math.max(top + clientY - startY, 0);
	}
	return {top: newTop, height: newHeight};
};

const resizeFromBottom = (top: number, height: number, clientY: number, startY: number) => {
	let newHeight: number, newTop = top;
	if (startY - clientY <= 0) {
		// more height gained from bottom
		newHeight = Math.max(height + clientY - startY, CHART_MIN_HEIGHT);
	} else if (startY - clientY <= height) {
		// reduce height, but still on bottom of top border
		newHeight = Math.max(height - (startY - clientY), CHART_MIN_HEIGHT);
		if (newHeight === CHART_MIN_HEIGHT) {
			// start to push, not resize anymore
			newTop = Math.max(top - (startY - clientY - (height - CHART_MIN_HEIGHT)), 0);
		}
	} else {
		// resize from bottom side, mouse client Y is above original top border
		// which means new height is min value, so just simply move top
		// and top is current mouse client Y subtract current height change
		newHeight = CHART_MIN_HEIGHT;
		newTop = Math.max(top - (startY - clientY - (height - CHART_MIN_HEIGHT)), 0);
	}
	return {top: newTop, height: newHeight};
};

const resizeFromLeft = (left: number, width: number, clientX: number, startX: number) => {
	let newWidth: number, newLeft: number;
	if (clientX <= startX) {
		// more width gained from left
		newWidth = Math.max(width + startX - clientX, CHART_MIN_WIDTH);
		newLeft = Math.max(left + clientX - startX, 0);
	} else if (clientX - startX <= width) {
		// reduce width, but still on left of right border
		newWidth = Math.max(width - (clientX - startX), CHART_MIN_WIDTH);
		newLeft = Math.max(left + clientX - startX, 0);
	} else {
		// resize from left side, mouse client X is over original right border
		// which means new width is min value, so just simply move left
		// and left is current mouse client X
		newWidth = CHART_MIN_WIDTH;
		newLeft = Math.max(left + clientX - startX, 0);
	}
	return {left: newLeft, width: newWidth};
};

const resizeFromRight = (left: number, width: number, clientX: number, startX: number) => {
	let newWidth: number, newLeft = left;
	if (startX - clientX <= 0) {
		// more width gained from right
		newWidth = Math.max(width + clientX - startX, CHART_MIN_WIDTH);
	} else if (startX - clientX <= width) {
		// reduce width, but still on right of left border
		newWidth = Math.max(width - (startX - clientX), CHART_MIN_WIDTH);
		if (newWidth === CHART_MIN_WIDTH) {
			// start to push, not resize anymore
			newLeft = Math.max(left - (startX - clientX - (width - CHART_MIN_WIDTH)), 0);
		}
	} else {
		// resize from right side, mouse client X is over original left border
		// which means new width is min value, so just simply move left
		// and left is current mouse client X subtract current width change
		newWidth = CHART_MIN_WIDTH;
		newLeft = Math.max(left - (startX - clientX - (width - CHART_MIN_WIDTH)), 0);
	}
	return {left: newLeft, width: newWidth};
};

export const useDragAndResize = (options: {
	containerRef: RefObject<HTMLDivElement>;
	dndRef: RefObject<HTMLDivElement>;
	writeToRect: (rect: GraphicsSize & GraphicsPosition) => void;
	onDrop: () => void;
}) => {
	const {containerRef, dndRef, writeToRect, onDrop} = options;

	const [dragState, setDragState] = useState<DragState>({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		type: DragType.NONE,
		startX: 0,
		startY: 0
	});

	const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		const {current: container} = containerRef;
		if (!container) {
			return;
		}

		// start dnd
		const {clientX, clientY} = event;
		const top = parseFloat(container.style.top);
		const left = parseFloat(container.style.left);
		const width = parseFloat(container.style.width);
		const height = parseFloat(container.style.height);
		const target = event.target as HTMLElement;
		const position = dndRef.current?.contains(target) ? DragType.DND : target.getAttribute('data-position');
		if (position) {
			// sides and corners
			container.style.transition = 'none';
			container.style.boxShadow = 'var(--warn-hover-shadow)';
			setDragState({top, left, width, height, type: position as DragType, startX: clientX, startY: clientY});
		}
	};
	const releaseDraggingIfCan = () => {
		if (dragState.type !== DragType.NONE) {
			// end dnd
			const {current: container} = containerRef;
			if (container) {
				container.style.transition = '';
				container.style.boxShadow = '';
				const {width, height} = container.getBoundingClientRect();
				writeToRect({
					x: parseInt(container.style.left),
					y: parseInt(container.style.top),
					width,
					height
				});
			}
			setDragState({top: 0, left: 0, width: 0, height: 0, type: DragType.NONE, startX: 0, startY: 0});
			window.getSelection()?.removeAllRanges();
			onDrop();
		}
	};
	const onMouseUp = () => releaseDraggingIfCan();
	const onMouseLeave = () => releaseDraggingIfCan();
	const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		const {current: container} = containerRef;
		if (dragState.type === DragType.NONE || !container) {
			return;
		}

		const {clientX, clientY} = event;
		const chartStyle = container.style;
		const {top, left, width, height, type} = dragState;
		const {startX, startY} = dragState;

		switch (type) {
			case DragType.DND: {
				// console.log('top:', top, startY, clientY, top + clientY - startY, 'left:', left, startX, clientX, left + clientX - startX);
				chartStyle.top = `${Math.max(0, top + clientY - startY)}px`;
				chartStyle.left = `${Math.max(0, left + clientX - startX)}px`;
				break;
			}
			case DragType.RESIZE_TOP: {
				const {top: newTop, height: newHeight} = resizeFromTop(top, height, clientY, startY);
				chartStyle.top = `${newTop}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
			case DragType.RESIZE_BOTTOM: {
				const {top: newTop, height: newHeight} = resizeFromBottom(top, height, clientY, startY);
				chartStyle.top = `${newTop}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
			case DragType.RESIZE_LEFT: {
				const {left: newLeft, width: newWidth} = resizeFromLeft(left, width, clientX, startX);
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				break;
			}
			case DragType.RESIZE_RIGHT: {
				const {left: newLeft, width: newWidth} = resizeFromRight(left, width, clientX, startX);
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				break;
			}
			case DragType.RESIZE_TOP_LEFT: {
				const {top: newTop, height: newHeight} = resizeFromTop(top, height, clientY, startY);
				const {left: newLeft, width: newWidth} = resizeFromLeft(left, width, clientX, startX);
				chartStyle.top = `${newTop}px`;
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
			case DragType.RESIZE_TOP_RIGHT: {
				const {top: newTop, height: newHeight} = resizeFromTop(top, height, clientY, startY);
				const {left: newLeft, width: newWidth} = resizeFromRight(left, width, clientX, startX);
				chartStyle.top = `${newTop}px`;
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
			case DragType.RESIZE_BOTTOM_LEFT: {
				const {top: newTop, height: newHeight} = resizeFromBottom(top, height, clientY, startY);
				const {left: newLeft, width: newWidth} = resizeFromLeft(left, width, clientX, startX);
				chartStyle.top = `${newTop}px`;
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
			case DragType.RESIZE_BOTTOM_RIGHT: {
				const {top: newTop, height: newHeight} = resizeFromBottom(top, height, clientY, startY);
				const {left: newLeft, width: newWidth} = resizeFromRight(left, width, clientX, startX);
				chartStyle.top = `${newTop}px`;
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
		}
	};

	return {
		onMouseMove, onMouseDown, onMouseLeave, onMouseUp,
		dragState
	};
};