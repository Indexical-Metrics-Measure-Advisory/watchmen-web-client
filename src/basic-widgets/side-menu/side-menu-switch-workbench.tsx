import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import {SideMenuItemContainer, SideMenuItemIcon} from './side-menu-item';
import {TooltipButton} from '../tooltip-button';
import {TooltipAlignment, TooltipPosition} from '../types';

export const SideMenuItemLabel = styled.div.attrs({'data-widget': 'side-menu-item-label'})`
	flex-grow: 1;
	display: flex;
	position: relative;
	> button {
		padding: 0;
		width: var(--margin);
		height: var(--margin);
		border-radius: 100%;
		&:not(:first-child) {
			margin-left: calc(var(--margin) / 4);
		}
		&:hover {
			color: var(--primary-color);
		}
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

	return <SideMenuItemContainer {...rest} >
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
				}} onClick={wb.action} key={wb.label}>
					<FontAwesomeIcon icon={wb.icon}/>
				</TooltipButton>;
			})}
		</SideMenuItemLabel>
	</SideMenuItemContainer>;
};