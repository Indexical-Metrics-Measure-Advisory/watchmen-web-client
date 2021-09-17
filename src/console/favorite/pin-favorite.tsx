import {saveLastSnapshot} from '@/services/data/account/last-snapshot';
import {BASE_MARGIN, ICON_DELETE, SIDE_MENU_MIN_WIDTH} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {faArrowAltCircleLeft, faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, RefObject, useEffect, useRef, useState} from 'react';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes, FavoriteState} from '../console-event-bus-types';
import {useFavoriteState} from './use-favorite-state';
import {
	FavoriteItemIcon,
	FavoriteItemLabel,
	FavoriteNoData,
	PinFavoriteBody,
	PinFavoriteContainer,
	PinFavoriteItem,
	PinFavoriteItemRemoveButton,
	PinFavoriteItemTail,
	PinFavoriteScrollButton,
	PinFavoriteTitle,
	UnpinFavoriteButton
} from './widgets';

interface ScrollState {
	scrollable: boolean;
	reachLeft: boolean;
	reachRight: boolean;
}

const computeScrollable = (bodyRef: RefObject<HTMLDivElement>, setScrollState: (state: ScrollState) => void) => {
	if (!bodyRef.current) {
		return;
	}

	const {scrollWidth, clientWidth, scrollLeft} = bodyRef.current;
	setScrollState({
		scrollable: scrollWidth !== clientWidth,
		reachLeft: scrollLeft === 0,
		reachRight: scrollLeft + clientWidth === scrollWidth
	});
};

export const PinFavorite = (props: {
	state: FavoriteState;
}) => {
	const {state} = props;

	const {on: onGlobal, off: offGlobal} = useEventBus();
	const {fire} = useConsoleEventBus();
	const bodyRef = useRef<HTMLDivElement>(null);
	const [menuWidth, setMenuWidth] = useState(SIDE_MENU_MIN_WIDTH);
	const [scrollState, setScrollState] = useState<ScrollState>({
		scrollable: false,
		reachLeft: true,
		reachRight: true
	});
	const {items, onItemClicked, onItemRemoveClicked} = useFavoriteState();
	useEffect(() => {
		const onSideMenuResized = (width: number) => {
			setMenuWidth(width);
		};
		onGlobal(EventTypes.SIDE_MENU_RESIZED, onSideMenuResized);
		return () => {
			offGlobal(EventTypes.SIDE_MENU_RESIZED, onSideMenuResized);
		};
	}, [onGlobal, offGlobal]);

	const onUnpinClicked = async () => {
		fire(ConsoleEventTypes.UNPIN_FAVORITE);
		try {
			await saveLastSnapshot({favoritePin: false});
		} catch (e: any) {
			// ignore
			console.info(e);
		}
	};
	const onMouseEnter = () => {
		computeScrollable(bodyRef, setScrollState);
	};
	const onScrollToLeftClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		// compute the leftest one, move it to rightest
		const body = bodyRef.current;
		if (!body) {
			return;
		}
		const {scrollLeft: bodyScrollLeft} = body;
		const {left: bodyLeft, width: bodyWidth} = body.getBoundingClientRect();
		const items = body.querySelectorAll<HTMLDivElement>('div[data-widget="pin-favorite-item"]');
		for (let index = items.length - 1; index >= 0; index--) {
			const item = items.item(index);
			const {left, width} = item.getBoundingClientRect();
			if (left < bodyLeft && left + width >= bodyLeft) {
				// this is the one, half show and half hidden
				const offset = bodyWidth + bodyLeft - left - width - BASE_MARGIN / 2;
				body.scrollTo({left: bodyScrollLeft - offset});
				break;
			}
			if (left + width < bodyLeft) {
				// this is the one, since no one is half/half
				const offset = bodyWidth + bodyLeft - left - width - BASE_MARGIN / 2;
				body.scrollTo({left: bodyScrollLeft - offset});
				break;
			}
		}
		computeScrollable(bodyRef, setScrollState);
	};
	const onScrollToRightClicked = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// compute the rightest one, move it to leftest
		const body = bodyRef.current;
		if (!body) {
			return;
		}
		const {scrollLeft: bodyScrollLeft} = body;
		const {left: bodyLeft, width: bodyWidth} = body.getBoundingClientRect();
		const right = bodyLeft + bodyWidth;
		const items = body.querySelectorAll<HTMLDivElement>('div[data-widget="pin-favorite-item"]');
		for (let index = 0, count = items.length; index < count; index++) {
			const item = items.item(index);
			const {left, width} = item.getBoundingClientRect();
			if (left < right && left + width >= right) {
				// this is the one, half show and half hidden
				const offset = left - bodyLeft;
				body.scrollTo({left: bodyScrollLeft + offset});
				break;
			}
			if (left >= right) {
				// this is the one, since no one is half/half
				const offset = left - bodyLeft;
				body.scrollTo({left: bodyScrollLeft + offset});
				break;
			}
		}
		computeScrollable(bodyRef, setScrollState);
	};

	const visible = state === FavoriteState.PIN;

	return <PinFavoriteContainer visible={visible} left={menuWidth - 1}>
		<PinFavoriteBody onMouseEnter={onMouseEnter} ref={bodyRef}>
			{items.length !== 0
				? <>
					{items.map(({id, name, icon, type}) => {
						return <PinFavoriteItem key={`${type}-${id}`}
						                        onClick={onItemClicked(id, type)}>
							<FavoriteItemIcon icon={icon}/>
							<FavoriteItemLabel>{name}</FavoriteItemLabel>
							<PinFavoriteItemRemoveButton onClick={onItemRemoveClicked(id, type)}>
								<FontAwesomeIcon icon={ICON_DELETE}/>
							</PinFavoriteItemRemoveButton>
						</PinFavoriteItem>;
					})}
					<PinFavoriteItemTail/>
				</>
				: <FavoriteNoData>{Lang.CONSOLE.FAVORITE.NO_DATA}</FavoriteNoData>
			}
		</PinFavoriteBody>
		<PinFavoriteTitle>
			<span>{Lang.CONSOLE.FAVORITE.TITLE}</span>
			<PinFavoriteScrollButton left={true} scrollable={scrollState.scrollable && !scrollState.reachLeft}
			                         onClick={onScrollToLeftClicked}>
				<FontAwesomeIcon icon={faArrowAltCircleLeft}/>
			</PinFavoriteScrollButton>
		</PinFavoriteTitle>
		<UnpinFavoriteButton onClick={onUnpinClicked}>
			<span>{Lang.CONSOLE.FAVORITE.UNPIN}</span>
			<PinFavoriteScrollButton left={false} scrollable={scrollState.scrollable && !scrollState.reachRight}
			                         onClick={onScrollToRightClicked}>
				<FontAwesomeIcon icon={faArrowAltCircleRight}/>
			</PinFavoriteScrollButton>
		</UnpinFavoriteButton>
	</PinFavoriteContainer>;
};