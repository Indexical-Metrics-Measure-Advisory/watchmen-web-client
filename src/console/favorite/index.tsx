import {LastSnapshot} from '@/services/data/account/last-snapshot-types';
import {useEffect, useState} from 'react';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes, FavoriteState} from '../console-event-bus-types';
import {FloatFavorite} from './float-favorite';
import {PinFavorite} from './pin-favorite';

interface State {
	state: FavoriteState;
	top: number;
	left: number;
}

export const Favorite = () => {
	const {on, off, fire} = useConsoleEventBus();
	const [state, setState] = useState<State>({state: FavoriteState.HIDDEN, top: 0, left: 0});
	useEffect(() => {
		const onAskFavoriteState = (onStateGet: (state: FavoriteState) => void) => {
			onStateGet(state.state);
		};
		const onShowFavorite = (({top, left}: { top: number, left: number }) => {
			if (state.state === FavoriteState.HIDDEN) {
				setState({state: FavoriteState.SHOWN, top, left});
			}
		});
		const onHideFavorite = () => {
			if (state.state === FavoriteState.SHOWN) {
				setState({...state, state: FavoriteState.HIDDEN});
			}
		};
		const onPinFavorite = () => {
			if (state.state !== FavoriteState.PIN) {
				setState({...state, state: FavoriteState.PIN});
			}
		};
		const onUnpinFavorite = () => {
			if (state.state === FavoriteState.PIN) {
				setState({...state, state: FavoriteState.HIDDEN});
			}
		};
		on(ConsoleEventTypes.ASK_FAVORITE_STATE, onAskFavoriteState);
		on(ConsoleEventTypes.SHOW_FAVORITE, onShowFavorite);
		on(ConsoleEventTypes.HIDE_FAVORITE, onHideFavorite);
		on(ConsoleEventTypes.PIN_FAVORITE, onPinFavorite);
		on(ConsoleEventTypes.UNPIN_FAVORITE, onUnpinFavorite);
		return () => {
			off(ConsoleEventTypes.ASK_FAVORITE_STATE, onAskFavoriteState);
			off(ConsoleEventTypes.SHOW_FAVORITE, onShowFavorite);
			off(ConsoleEventTypes.HIDE_FAVORITE, onHideFavorite);
			off(ConsoleEventTypes.PIN_FAVORITE, onPinFavorite);
			off(ConsoleEventTypes.UNPIN_FAVORITE, onUnpinFavorite);
		};
	}, [on, off, fire, state]);
	useEffect(() => {
		fire(ConsoleEventTypes.ASK_LAST_SNAPSHOT, ({favoritePin}: LastSnapshot) => {
			if (favoritePin) {
				setState(state => ({...state, state: FavoriteState.PIN}));
			}
		});
	}, [fire]);

	return <>
		<FloatFavorite {...state}/>
		<PinFavorite state={state.state}/>
	</>;
};