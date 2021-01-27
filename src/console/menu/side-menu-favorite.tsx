import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ICON_FAVORITE, TOOLTIP_CARET_OFFSET } from '../../basic-widgets/constants';
import {
	SideMenuItemContainer,
	SideMenuItemIcon,
	SideMenuItemLabel
} from '../../basic-widgets/side-menu/side-menu-item';
import { useTooltip } from '../../basic-widgets/tooltip';
import { TooltipAlignment } from '../../basic-widgets/types';
import { Lang } from '../../langs';

const FavoriteIcon = styled(SideMenuItemIcon).attrs<{ active: boolean }>(({ active }) => {
	return {
		style: {
			color: active ? 'var(--warn-color)' : (void 0)
		}
	};
})`
`;

export const FavoriteMenu = (props: {
	showTooltip: boolean;
}) => {
	const { showTooltip } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const [ active, setActive ] = useState(false);

	const label = Lang.CONSOLE.MENU.FAVORITE;
	const tooltip = useTooltip<HTMLDivElement>({
		use: showTooltip,
		tooltip: label,
		target: containerRef,
		alignment: TooltipAlignment.LEFT,
		offsetX: 6,
		offsetY: TOOLTIP_CARET_OFFSET - 2
	});

	const onFavoriteClicked = () => {
		setActive(!active);
	};

	return <SideMenuItemContainer onClick={onFavoriteClicked} {...tooltip} ref={containerRef}>
		<FavoriteIcon active={active}>
			<FontAwesomeIcon icon={ICON_FAVORITE}/>
		</FavoriteIcon>
		<SideMenuItemLabel>{label}</SideMenuItemLabel>
	</SideMenuItemContainer>;
};