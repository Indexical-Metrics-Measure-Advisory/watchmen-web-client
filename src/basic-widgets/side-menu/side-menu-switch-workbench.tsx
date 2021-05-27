import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import {SideMenuItemContainer, SideMenuItemIcon} from './side-menu-item';
import {TooltipButton} from '../tooltip-button';
import {ButtonInk, TooltipAlignment, TooltipPosition} from '../types';
import {SIDE_MENU_MIN_WIDTH, SIDE_MENU_RESIZE_HANDLE_Z_INDEX} from '../constants';
import {v4} from 'uuid';

export const Container = styled(SideMenuItemContainer)`
	height: calc(var(--side-menu-item-height) - 2px);
	border-radius: calc(var(--side-menu-item-height) / 2);
	border: var(--border);
	border-color: transparent;
	width: 100%;
	&:hover {
		//border-color: var(--border-color);
		> div[data-widget='side-menu-item-label'] + div[data-widget='side-menu-item-label'] {
			opacity: 1;
			pointer-events: auto;
		}
	}
`;
export const SideMenuItemLabel = styled.div.attrs({'data-widget': 'side-menu-item-label'})`
	flex-grow: 1;
	display: flex;
	position: relative;
	align-items: center;
	height: calc(var(--side-menu-item-height) - 2px);
	font-variant: petite-caps;
	> button {
		padding: 0;
		min-width: var(--margin);
		height: calc(var(--margin) * 0.8);
		border-radius: calc(var(--border-radius) * 3);
		&:not(:first-child) {
			margin-left: calc(var(--margin) / 4);
		}
		> svg {
			font-size: 0.8em;
		}
	}
	+ div[data-widget='side-menu-item-label'] {
		position: fixed;
		background-color: var(--invert-color);
		height: var(--side-menu-item-height);
		left: ${SIDE_MENU_MIN_WIDTH - 1}px;
		margin: -1px 0 1px -11px;
		padding: 0 11px;
		opacity: 0;
		pointer-events: none;
		z-index: ${SIDE_MENU_RESIZE_HANDLE_Z_INDEX + 1};
		border-radius: calc(var(--side-menu-item-height) / 2);
		border: var(--border);
	}
`;

export interface Workbench {
	icon: IconProp;
	label: string;
	action: () => void
}

export const SideMenuSwitchWorkbench = (props: {
	icon: IconProp,
	visible?: boolean;
	workbenches: Array<Workbench>
}) => {
	const {icon, visible = true, workbenches, ...rest} = props;

	if (!visible) {
		return null;
	}

	return <Container {...rest}>
		<SideMenuItemIcon active={false}>
			<FontAwesomeIcon icon={icon}/>
		</SideMenuItemIcon>
		<SideMenuItemLabel>
			{workbenches.map(wb => {
				return <TooltipButton tooltip={{
					position: TooltipPosition.TOP,
					alignment: TooltipAlignment.LEFT,
					offsetX: -3,
					label: wb.label
				}} ink={ButtonInk.PRIMARY} onClick={wb.action} key={v4()}>
					<FontAwesomeIcon icon={wb.icon}/>
				</TooltipButton>;
			})}
		</SideMenuItemLabel>
		<SideMenuItemLabel>
			{workbenches.map(wb => {
				return <TooltipButton tooltip={{
					position: TooltipPosition.TOP,
					alignment: TooltipAlignment.LEFT,
					offsetX: -3,
					label: wb.label
				}} ink={ButtonInk.PRIMARY} onClick={wb.action} key={v4()}>
					<FontAwesomeIcon icon={wb.icon}/>
				</TooltipButton>;
			})}
		</SideMenuItemLabel>
	</Container>;
};