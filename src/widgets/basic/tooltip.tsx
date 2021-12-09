import {faCaretDown, faCaretLeft, faCaretRight, faCaretUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, ReactNode, RefObject, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useEventBus} from '../events/event-bus';
import {EventTypes, TooltipParam} from '../events/types';
import {TOOLTIP_CARET_OFFSET, TOOLTIP_MAX_WIDTH, TOOLTIP_Z_INDEX} from './constants';
import {TooltipAlignment, TooltipPosition} from './types';

export interface TooltipRect {
	position?: TooltipPosition;
	alignment?: TooltipAlignment;
	minWidth?: number;
	maxWidth?: number;
	offsetX?: number;
	offsetY?: number;
}

export interface ComputedTooltipRect extends TooltipRect {
	trigger: DOMRect;
}

interface TooltipContent {
	tooltip: ReactNode,
	rect: ComputedTooltipRect
}

const TooltipContainer = styled.div //
	.attrs<{ rect: ComputedTooltipRect, visible: boolean }>(
		({
			 rect: {
				 alignment = TooltipAlignment.CENTER,
				 position = TooltipPosition.TOP,
				 minWidth, maxWidth, offsetY = 0, offsetX = 0,
				 trigger
			 },
			 visible
		 }) => {
			const {y = 0, x = 0, width = 0, height = 0} = trigger;
			return {
				'data-widget': 'tooltip',
				style: {
					minWidth: minWidth,
					maxWidth: maxWidth || TOOLTIP_MAX_WIDTH,
					bottom: (visible && position === TooltipPosition.TOP) ? `calc(100vh + ${TOOLTIP_CARET_OFFSET}px - ${y + offsetY}px)` : (void 0),
					top: (visible && position === TooltipPosition.BOTTOM) ? `calc(${y + height + offsetY + TOOLTIP_CARET_OFFSET}px)` : (void 0),
					left: alignment === TooltipAlignment.LEFT ? (x + offsetX) : (alignment === TooltipAlignment.CENTER ? (x + offsetX + width / 2) : (void 0)),
					right: alignment === TooltipAlignment.RIGHT ? `calc(100vw - ${x + width + offsetX}px)` : (void 0),
					transform: `scale(0.91666667) ${alignment === TooltipAlignment.CENTER ? 'translateX(-50%)' : ''}`,
					transformOrigin: alignment === TooltipAlignment.LEFT ? 'bottom left' : (alignment === TooltipAlignment.RIGHT ? 'bottom right' : 'bottom left'),
					opacity: visible ? 1 : 0
				}
			};
		}) <{ rect: ComputedTooltipRect, visible: boolean }>`
	display          : flex;
	position         : fixed;
	min-height       : var(--tooltip-min-height);
	align-items      : center;
	font-size        : var(--font-size);
	font-weight      : var(--font-bold);
	border-radius    : var(--border-radius);
	padding          : calc(var(--margin) / 6) calc(var(--margin) / 2);
	background-color : var(--tooltip-bg-color);
	color            : var(--invert-color);
	pointer-events   : none;
	user-select      : none;
	transition       : opacity 300ms ease-in-out;
	z-index          : ${TOOLTIP_Z_INDEX};
	@media print {
		display : none;
	}
`;

const Caret = styled(FontAwesomeIcon)
	.attrs<{ rect: ComputedTooltipRect }>(({rect: {alignment, position = TooltipPosition.TOP}}) => {
		return {
			'data-widget': 'tooltip-caret',
			// to avoid output this property to dom node
			rect: (void 0),
			style: {
				left: alignment === TooltipAlignment.LEFT ? 16 : (alignment === TooltipAlignment.CENTER ? 'calc(50% - 4px)' : (void 0)),
				right: alignment === TooltipAlignment.RIGHT ? 16 : (void 0),
				top: position === TooltipPosition.TOP ? `calc(100% - ${TOOLTIP_CARET_OFFSET}px)` : (void 0),
				bottom: position === TooltipPosition.BOTTOM ? `calc(100% - ${TOOLTIP_CARET_OFFSET}px)` : (void 0)
			}
		};
	})<{ rect: ComputedTooltipRect }>`
	display   : block;
	position  : absolute;
	color     : var(--tooltip-bg-color);
	font-size : 1.2em;
`;

const createInvisibleContent = (): TooltipContent => {
	return {
		tooltip: '',
		rect: {
			trigger: {x: 0, y: 0, left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({})}
		}
	};
};
export const Tooltip = () => {
	const {on, off} = useEventBus();
	const [content, setContent] = useState<TooltipContent>(createInvisibleContent());
	const [functions] = useState({
		show: ({target, text, ...rest}: TooltipParam) => {
			setContent({tooltip: text, rect: {...rest, trigger: target.getBoundingClientRect()}});
		},
		hide: () => {
			setContent(createInvisibleContent());
		}
	});
	useEffect(() => {
		on(EventTypes.SHOW_TOOLTIP, functions.show);
		on(EventTypes.HIDE_TOOLTIP, functions.hide);
		return () => {
			off(EventTypes.SHOW_TOOLTIP, functions.show);
			off(EventTypes.HIDE_TOOLTIP, functions.hide);
		};
	}, [functions, on, off]);

	const position = content?.rect?.position;
	let icon = faCaretDown;
	switch (position) {
		case TooltipPosition.TOP:
			icon = faCaretDown;
			break;
		case TooltipPosition.BOTTOM:
			icon = faCaretUp;
			break;
		case TooltipPosition.LEFT:
			icon = faCaretRight;
			break;
		case TooltipPosition.RIGHT:
			icon = faCaretLeft;
			break;
	}

	return <TooltipContainer visible={content != null} rect={content.rect}>
		<span>{content.tooltip}</span>
		<Caret icon={icon} rect={content?.rect}/>
	</TooltipContainer>;
};

const NOOP = () => {
};
export const useTooltip = <T extends HTMLElement>(options: TooltipRect & {
	use?: boolean;
	tooltip: ReactNode;
	target: RefObject<T>;
}) => {
	const {use = true, tooltip, target, ...rect} = options;

	const {fire} = useEventBus();
	useEffect(() => {
		return () => {
			// hide anyway when unmount
			fire(EventTypes.HIDE_TOOLTIP);
		};
		// do not use dependencies here
	});

	if (!use) {
		return {onMouseEnter: NOOP, onMouseLeave: NOOP};
	} else {
		return {
			onMouseEnter: (event: MouseEvent<T>) => {
				if (!target.current) {
					console.groupCollapsed('Tooltip target not exists.');
					console.warn(event.target);
					console.groupEnd();
					return;
				}
				fire(EventTypes.SHOW_TOOLTIP, {target: target.current, text: tooltip, ...rect});
			},
			onMouseLeave: () => fire(EventTypes.HIDE_TOOLTIP)
		};
	}
};
