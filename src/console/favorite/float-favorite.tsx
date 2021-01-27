import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { ICON_PIN } from '../../basic-widgets/constants';
import { TooltipAlignment } from '../../basic-widgets/types';
import { useCollapseFixedThing } from '../../basic-widgets/utils';
import { Lang } from '../../langs';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes, FavoriteState } from '../console-event-bus-types';
import { useFavoriteState } from './use-favorite-state';
import {
	FavoriteItemIcon,
	FavoriteItemLabel,
	FloatFavoriteBody,
	FloatFavoriteContainer,
	FloatFavoriteItem,
	FavoriteNoData,
	FloatFavoritePinButton,
	FloatFavoriteTitle
} from './widgets';

export const FloatFavorite = (props: {
	state: FavoriteState;
	top: number;
	left: number;
}) => {
	const { state, top, left } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const { fire } = useConsoleEventBus();
	const { items, onItemClicked } = useFavoriteState();
	useCollapseFixedThing({ containerRef, hide: () => fire(ConsoleEventTypes.HIDE_FAVORITE) });

	const onPinClicked = () => fire(ConsoleEventTypes.PIN_FAVORITE);

	const visible = state === FavoriteState.SHOWN;

	return <FloatFavoriteContainer visible={visible} top={top} left={left} ref={containerRef}>
		<FloatFavoriteTitle>
			<span>{Lang.CONSOLE.FAVORITE.TITLE}</span>
			<FloatFavoritePinButton tooltip={{ label: Lang.CONSOLE.FAVORITE.PIN, alignment: TooltipAlignment.CENTER }}
			                        onClick={onPinClicked}>
				<FontAwesomeIcon icon={ICON_PIN}/>
			</FloatFavoritePinButton>
		</FloatFavoriteTitle>
		<FloatFavoriteBody>
			{items.length !== 0
				? items.map(({ id, name, icon, type }) => {
					return <FloatFavoriteItem key={`${type}-${id}`}
					                          onClick={onItemClicked(id, type)}>
						<FavoriteItemIcon icon={icon}/>
						<FavoriteItemLabel>{name}</FavoriteItemLabel>
					</FloatFavoriteItem>;
				})
				: <FavoriteNoData>{Lang.CONSOLE.FAVORITE.NO_DATA}</FavoriteNoData>
			}
		</FloatFavoriteBody>
	</FloatFavoriteContainer>;
};