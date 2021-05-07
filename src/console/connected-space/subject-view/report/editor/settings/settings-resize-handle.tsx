import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {
    CHART_SETTINGS_RESIZE_HANDLE_WIDTH,
    CHART_SETTINGS_RESIZE_HANDLE_Z_INDEX
} from '../../../../../../basic-widgets/constants';

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
            left: alignment === ResizeHandleAlignment.LEFT ? (resizing ? 0 : (left - CHART_SETTINGS_RESIZE_HANDLE_WIDTH / 2)) : 'unset',
            right: alignment === ResizeHandleAlignment.RIGHT ? (resizing ? 0 : (left - CHART_SETTINGS_RESIZE_HANDLE_WIDTH / 2)) : 'unset',
            width: resizing ? '100vw' : CHART_SETTINGS_RESIZE_HANDLE_WIDTH,
            paddingLeft: resizing ? (alignment === ResizeHandleAlignment.LEFT ? (left - CHART_SETTINGS_RESIZE_HANDLE_WIDTH / 2) : `calc(100% - ${left + CHART_SETTINGS_RESIZE_HANDLE_WIDTH / 2}px)`) : 0
        }
    };
})<HandleState>`
	display          : block;
	position         : fixed;
	height           : 100vh;
	z-index          : ${CHART_SETTINGS_RESIZE_HANDLE_Z_INDEX};
	background-color : transparent;
	&:before {
		content          : '';
		display          : block;
		position         : relative;
		width            : ${CHART_SETTINGS_RESIZE_HANDLE_WIDTH}px;
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

export const SettingsResizeHandle = (props: {
    top?: number;
    width: number;
    onResize: (width: number) => void;
    alignment?: ResizeHandleAlignment
}) => {
    const {top = 0, width, onResize, alignment = ResizeHandleAlignment.LEFT} = props;

    const handleRef = useRef<HTMLDivElement>(null);
    const [resizing, setResizing] = useState(false);

    const canStartResize = (x: number) => Math.abs(x - width) <= 3;
    const onMouseDown = ({target, button, clientX}: React.MouseEvent) => {
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
    const onMouseMove = ({clientX}: React.MouseEvent) => {
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