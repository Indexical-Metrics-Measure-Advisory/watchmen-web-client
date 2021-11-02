import {LastSnapshot} from '@/services/data/account/last-snapshot-types';
import {ICON_FAVORITE, TOOLTIP_CARET_OFFSET} from '@/widgets/basic/constants';
import {SideMenuItemContainer, SideMenuItemIcon, SideMenuItemLabel} from '@/widgets/basic/side-menu/side-menu-item';
import {useTooltip} from '@/widgets/basic/tooltip';
import {TooltipAlignment} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
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

	const {on, off, fire} = useConsoleEventBus();
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
		fire(ConsoleEventTypes.ASK_LAST_SNAPSHOT, ({favoritePin}: LastSnapshot) => {
			favoritePin && setActive(favoritePin);
		});
	}, [fire]);

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
		fire(ConsoleEventTypes.ASK_FAVORITE_STATE, (state: FavoriteState) => {
			// only response for show favorite, otherwise keep it
			if (state === FavoriteState.HIDDEN) {
				const {top, left, width, height} = iconRef.current!.getBoundingClientRect();
				setActive(true);
				fire(ConsoleEventTypes.SHOW_FAVORITE, {top: top + height / 2, left: left + width});
			}
		});
	};

	return <SideMenuItemContainer onClick={onFavoriteClicked} {...tooltip} ref={containerRef}>
		<FavoriteIcon active={active} ref={iconRef}>
			<FontAwesomeIcon icon={ICON_FAVORITE}/>
		</FavoriteIcon>
		<SideMenuItemLabel>{label}</SideMenuItemLabel>
	</SideMenuItemContainer>;
};