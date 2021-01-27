import React, { useEffect, useState } from 'react';
import { SIDE_MENU_MIN_WIDTH } from '../../basic-widgets/constants';
import { Lang } from '../../langs';
import { saveFavorite } from '../../services/console/favorite';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes, FavoriteState } from '../console-event-bus-types';
import { useFavoriteState } from './use-favorite-state';
import {
	FavoriteItemIcon,
	FavoriteItemLabel,
	FavoriteNoData,
	PinFavoriteBody,
	PinFavoriteContainer,
	PinFavoriteItem,
	PinFavoriteTitle,
	UnpinFavoriteButton
} from './widgets';

export const PinFavorite = (props: {
	state: FavoriteState;
}) => {
	const { state } = props;

	const { on, off, fire } = useConsoleEventBus();
	const [ menuWidth, setMenuWidth ] = useState(SIDE_MENU_MIN_WIDTH);
	const { items, onItemClicked, data } = useFavoriteState();
	useEffect(() => {
		const onSideMenuResized = (width: number) => {
			setMenuWidth(width);
		};
		on(ConsoleEventTypes.SIDE_MENU_RESIZED, onSideMenuResized);
		return () => {
			off(ConsoleEventTypes.SIDE_MENU_RESIZED, onSideMenuResized);
		};
	}, [ on, off ]);

	const onUnpinClicked = async () => {
		fire(ConsoleEventTypes.UNPIN_FAVORITE);
		await saveFavorite({
			pin: false,
			connectedSpaceIds: data.connectedSpaceIds || [],
			dashboardIds: data.dashboardIds || []
		});
	};

	const visible = state === FavoriteState.PIN;

	return <PinFavoriteContainer visible={visible} left={menuWidth - 1}>
		<PinFavoriteTitle>{Lang.CONSOLE.FAVORITE.TITLE}</PinFavoriteTitle>
		<PinFavoriteBody>
			{items.length !== 0
				? items.map(({ id, name, icon, type }) => {
					return <PinFavoriteItem key={`${type}-${id}`}
					                        onClick={onItemClicked(id, type)}>
						<FavoriteItemIcon icon={icon}/>
						<FavoriteItemLabel>{name}</FavoriteItemLabel>
					</PinFavoriteItem>;
				})
				: <FavoriteNoData>{Lang.CONSOLE.FAVORITE.NO_DATA}</FavoriteNoData>
			}
		</PinFavoriteBody>
		<UnpinFavoriteButton onClick={onUnpinClicked}>
			{Lang.CONSOLE.FAVORITE.UNPIN}
		</UnpinFavoriteButton>
	</PinFavoriteContainer>;
};