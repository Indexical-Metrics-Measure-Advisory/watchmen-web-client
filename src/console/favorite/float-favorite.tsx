import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useRef} from 'react';
import {ICON_DELETE, ICON_PIN} from '../../basic-widgets/constants';
import {TooltipAlignment} from '../../basic-widgets/types';
import {useCollapseFixedThing} from '../../basic-widgets/utils';
import {Lang} from '../../langs';
import {saveLastSnapshot} from '../../services/console/last-snapshot';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes, FavoriteState} from '../console-event-bus-types';
import {useFavoriteState} from './use-favorite-state';
import {
	FavoriteItemIcon,
	FavoriteItemLabel,
	FavoriteNoData,
	FloatFavoriteBody,
	FloatFavoriteContainer,
	FloatFavoriteItem,
	FloatFavoriteItemRemoveButton,
	FloatFavoritePinButton,
	FloatFavoriteTitle
} from './widgets';

export const FloatFavorite = (props: {
	state: FavoriteState;
	top: number;
	left: number;
}) => {
	const {state, top, left} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const {fire} = useConsoleEventBus();
	const {items, onItemClicked, onItemRemoveClicked} = useFavoriteState();
	useCollapseFixedThing({
		containerRef, hide: () => {
			if (state === FavoriteState.SHOWN) {
				fire(ConsoleEventTypes.HIDE_FAVORITE);
			}
		}
	});

	const onPinClicked = async () => {
		fire(ConsoleEventTypes.PIN_FAVORITE);
		try {
			await saveLastSnapshot({favoritePin: true});
		} catch (e) {
			// ignore
			console.info(e);
		}
	};

	const visible = state === FavoriteState.SHOWN;

	return <FloatFavoriteContainer visible={visible} top={top} left={left} ref={containerRef}>
		<FloatFavoriteTitle>
			<span>{Lang.CONSOLE.FAVORITE.TITLE}</span>
			<FloatFavoritePinButton tooltip={{label: Lang.CONSOLE.FAVORITE.PIN, alignment: TooltipAlignment.CENTER}}
			                        onClick={onPinClicked}>
				<FontAwesomeIcon icon={ICON_PIN}/>
			</FloatFavoritePinButton>
		</FloatFavoriteTitle>
		<FloatFavoriteBody>
			{items.length !== 0
				? items.map(({id, name, icon, type}) => {
					return <FloatFavoriteItem key={`${type}-${id}`}
					                          onClick={onItemClicked(id, type)}>
						<FavoriteItemIcon icon={icon}/>
						<FavoriteItemLabel>{name}</FavoriteItemLabel>
						<FloatFavoriteItemRemoveButton onClick={onItemRemoveClicked(id, type)}>
							<FontAwesomeIcon icon={ICON_DELETE}/>
						</FloatFavoriteItemRemoveButton>
					</FloatFavoriteItem>;
				})
				: <FavoriteNoData>{Lang.CONSOLE.FAVORITE.NO_DATA}</FavoriteNoData>
			}
		</FloatFavoriteBody>
	</FloatFavoriteContainer>;
};