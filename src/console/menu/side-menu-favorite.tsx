import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {ICON_FAVORITE, TOOLTIP_CARET_OFFSET} from '@/basic-widgets/constants';
import {SideMenuItemContainer, SideMenuItemIcon, SideMenuItemLabel} from '@/basic-widgets/side-menu/side-menu-item';
import {useTooltip} from '@/basic-widgets/tooltip';
import {TooltipAlignment} from '@/basic-widgets/types';
import {Lang} from '@/langs';
import {LastSnapshot} from '@/services/account/last-snapshot-types';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes, FavoriteState} from '../console-event-bus-types';

const FavoriteIcon = styled(SideMenuItemIcon).attrs<{ active: boolean }>(({active}) => {
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
	const {showTooltip} = props;

	const {once, on, off, fire} = useConsoleEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(false);
	useEffect(() => {
		const onDeactivateFavorite = () => setActive(false);
		on(ConsoleEventTypes.HIDE_FAVORITE, onDeactivateFavorite);
		on(ConsoleEventTypes.UNPIN_FAVORITE, onDeactivateFavorite);
		return () => {
			off(ConsoleEventTypes.HIDE_FAVORITE, onDeactivateFavorite);
			off(ConsoleEventTypes.UNPIN_FAVORITE, onDeactivateFavorite);
		};
	}, [on, off]);
	useEffect(() => {
		once(ConsoleEventTypes.REPLY_LAST_SNAPSHOT, ({favoritePin}: LastSnapshot) => {
			favoritePin && setActive(favoritePin);
		}).fire(ConsoleEventTypes.ASK_LAST_SNAPSHOT);
	}, [once]);

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
		once(ConsoleEventTypes.REPLY_FAVORITE_STATE, (state: FavoriteState) => {
			// only response for show favorite, otherwise keep it
			if (state === FavoriteState.HIDDEN) {
				const {top, left, width, height} = iconRef.current!.getBoundingClientRect();
				setActive(true);
				fire(ConsoleEventTypes.SHOW_FAVORITE, {top: top + height / 2, left: left + width});
			}
		}).fire(ConsoleEventTypes.ASK_FAVORITE_STATE);
	};

	return <SideMenuItemContainer onClick={onFavoriteClicked} {...tooltip} ref={containerRef}>
		<FavoriteIcon active={active} ref={iconRef}>
			<FontAwesomeIcon icon={ICON_FAVORITE}/>
		</FavoriteIcon>
		<SideMenuItemLabel>{label}</SideMenuItemLabel>
	</SideMenuItemContainer>;
};