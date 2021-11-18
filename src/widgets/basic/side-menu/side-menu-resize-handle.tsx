import React, {MouseEvent, useRef, useState} from 'react';
import styled from 'styled-components';
import {SIDE_MENU_RESIZE_HANDLE_WIDTH, SIDE_MENU_RESIZE_HANDLE_Z_INDEX} from '../constants';

export enum ResizeHandleAlignment {
	LEFT, RIGHT
}

interface HandleState {
	top: number;
	left: number;
	resizing: boolean;
	alignment: ResizeHandleAlignment;
}

const Handle = styled.div.attrs<HandleState>(({top = 0, left, resizing, alignment}) => {
	return {
		style: {
			top,
			left: alignment === ResizeHandleAlignment.LEFT ? (resizing ? 0 : (left - SIDE_MENU_RESIZE_HANDLE_WIDTH / 2)) : 'unset',
			right: alignment === ResizeHandleAlignment.RIGHT ? (resizing ? 0 : (left - SIDE_MENU_RESIZE_HANDLE_WIDTH / 2)) : 'unset',
			width: resizing ? '100vw' : SIDE_MENU_RESIZE_HANDLE_WIDTH,
			paddingLeft: resizing ? (alignment === ResizeHandleAlignment.LEFT ? (left - SIDE_MENU_RESIZE_HANDLE_WIDTH / 2) : `calc(100% - ${left + SIDE_MENU_RESIZE_HANDLE_WIDTH / 2}px)`) : 0
		}
	};
})<HandleState>`
	display          : block;
	position         : fixed;
	height           : 100vh;
	z-index          : ${SIDE_MENU_RESIZE_HANDLE_Z_INDEX};
	background-color : transparent;
	&:before {
		content          : '';
		display          : block;
		position         : relative;
		width            : ${SIDE_MENU_RESIZE_HANDLE_WIDTH}px;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0;
		transition       : opacity 300ms ease-in-out;
		pointer-events   : none;
	}
	&:hover {
		&:before {
			pointer-events : auto;
			opacity        : 0.3;
		}
	}
`;

export const SideMenuResizeHandle = (props: {
	top?: number;
	width: number;
	onResize: (width: number) => void;
	alignment?: ResizeHandleAlignment
}) => {
	const {top = 0, width, onResize, alignment = ResizeHandleAlignment.LEFT} = props;

	const handleRef = useRef<HTMLDivElement>(null);
	const [resizing, setResizing] = useState(false);

	const canStartResize = (x: number) => Math.abs(x - width) <= 3;
	const onMouseDown = ({target, button, clientX}: MouseEvent) => {
		const x = alignment === ResizeHandleAlignment.LEFT ? clientX : (window.innerWidth - clientX);
		if (button === 0 && canStartResize(x)) {
			setResizing(true);
			const onResizeEnd = (event: Event) => {
				const {target} = event;
				setResizing(false);
				target!.removeEventListener('mouseup', onResizeEnd);
				target!.removeEventListener('mouseleave', onResizeEnd);
			};
			target.addEventListener('mouseup', onResizeEnd);
			target.addEventListener('mouseleave', onResizeEnd);
		}
	};
	const onMouseMove = ({clientX}: MouseEvent) => {
		const x = alignment === ResizeHandleAlignment.LEFT ? clientX : (window.innerWidth - clientX);
		if (!resizing) {
			if (canStartResize(x)) {
				handleRef.current!.style.cursor = 'col-resize';
			} else {
				handleRef.current!.style.cursor = 'default';
			}
		} else {
			onResize(x);
		}
	};

	return <Handle top={top} left={width} alignment={alignment}
	               resizing={resizing} ref={handleRef}
	               onMouseDown={onMouseDown} onMouseMove={onMouseMove}/>;
};