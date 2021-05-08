import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useRef} from 'react';
import styled from 'styled-components';
import {TOOLTIP_CARET_OFFSET} from '../constants';
import {useTooltip} from '../tooltip';
import {TooltipAlignment} from '../types';

export const SideMenuItemContainer = styled.div.attrs({'data-widget': 'side-menu-item-container'})`
	display               : grid;
	position              : relative;
	grid-template-columns : var(--side-menu-icon-size) 1fr;
	grid-column-gap       : var(--side-menu-margin);
	align-items           : center;
	padding               : 0 var(--side-menu-margin);
	min-height            : var(--side-menu-item-height);
	cursor                : pointer;
	transition            : color 300ms ease-in-out;
	&:hover {
		color : var(--primary-color);
	}
`;
export const SideMenuItemIcon = styled.div.attrs<{ active: boolean }>(({active}) => {
	return {
		'data-widget': 'side-menu-item-icon',
		style: {
			color: active ? 'var(--invert-color)' : (void 0),
			backgroundColor: active ? 'var(--primary-color)' : (void 0)
		}
	};
})<{ active: boolean }>`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	font-size       : 1.2em;
	width           : var(--side-menu-icon-size);
	height          : var(--side-menu-icon-size);
	min-height      : var(--side-menu-icon-size);
	border-radius   : var(--border-radius);
	transition      : color 300ms ease-in-out, background-color 300ms ease-in-out;
`;
export const SideMenuItemLabel = styled.div.attrs({'data-widget': 'side-menu-item-label'})`
	position      : relative;
	flex-grow     : 1;
	font-variant  : petite-caps;
	opacity       : 0.7;
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;

export const SideMenuItem = (props: {
	icon: IconProp,
	label: string
	showTooltip: boolean,
	active?: boolean
	onClick?: (rect: DOMRect) => void;
	visible?: boolean;
}) => {
	const {icon, label, showTooltip, active = false, onClick, visible = true, ...rest} = props;

	const containerRef = useRef<HTMLDivElement>(null);

	const tooltip = useTooltip<HTMLDivElement>({
		use: showTooltip,
		tooltip: label,
		target: containerRef,
		alignment: TooltipAlignment.LEFT,
		offsetX: 6,
		offsetY: TOOLTIP_CARET_OFFSET - 2
	});

	if (!visible) {
		return null;
	}

	const onClicked = () => {
		onClick && onClick(containerRef.current!.getBoundingClientRect());
	};

	return <SideMenuItemContainer {...rest} onClick={onClicked} {...tooltip} ref={containerRef}>
		<SideMenuItemIcon active={active}>
			<FontAwesomeIcon icon={icon}/>
		</SideMenuItemIcon>
		<SideMenuItemLabel>{label}</SideMenuItemLabel>
	</SideMenuItemContainer>;
};