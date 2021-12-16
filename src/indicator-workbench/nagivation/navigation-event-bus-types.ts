import {TuplePage} from '@/services/data/query/tuple-page';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';

export enum NavigationEventTypes {
	NAVIGATION_PICKED = 'navigation-picked',
	ASK_NAVIGATION = 'ask-navigation',

	NAVIGATION_SEARCHED = 'navigation-searched',
	ASK_NAVIGATION_PAGE = 'ask-navigation-page',
	BACK_TO_QUERY = 'back-to-query',

	NAME_CHANGED = 'name-changed',

	SAVE_NAVIGATION = 'save-navigation',
	NAVIGATION_SAVED = 'navigation-saved',

	ASK_INDICATORS = 'ask-indicators'
}

export interface NavigationEventBus {
	fire(type: NavigationEventTypes.NAVIGATION_PICKED, navigation: Navigation): this;
	on(type: NavigationEventTypes.NAVIGATION_PICKED, listener: (navigation: Navigation) => void): this;
	off(type: NavigationEventTypes.NAVIGATION_PICKED, listener: (navigation: Navigation) => void): this;

	fire(type: NavigationEventTypes.ASK_NAVIGATION, onData: (navigation?: Navigation) => void): this;
	on(type: NavigationEventTypes.ASK_NAVIGATION, listener: (onData: (navigation?: Navigation) => void) => void): this;
	off(type: NavigationEventTypes.ASK_NAVIGATION, listener: (onData: (navigation?: Navigation) => void) => void): this;

	fire(type: NavigationEventTypes.NAVIGATION_SEARCHED, page: TuplePage<QueryTuple>, searchText: string): this;
	on(type: NavigationEventTypes.NAVIGATION_SEARCHED, listener: (page: TuplePage<QueryTuple>, searchText: string) => void): this;
	off(type: NavigationEventTypes.NAVIGATION_SEARCHED, listener: (page: TuplePage<QueryTuple>, searchText: string) => void): this;

	fire(type: NavigationEventTypes.ASK_NAVIGATION_PAGE, onData: (page?: TuplePage<QueryTuple>, searchText?: string) => void): this;
	on(type: NavigationEventTypes.ASK_NAVIGATION_PAGE, listener: (onData: (page?: TuplePage<QueryTuple>, searchText?: string) => void) => void): this;
	off(type: NavigationEventTypes.ASK_NAVIGATION_PAGE, listener: (onData: (page?: TuplePage<QueryTuple>, searchText?: string) => void) => void): this;

	fire(type: NavigationEventTypes.BACK_TO_QUERY): this;
	on(type: NavigationEventTypes.BACK_TO_QUERY, listener: () => void): this;
	off(type: NavigationEventTypes.BACK_TO_QUERY, listener: () => void): this;

	fire(type: NavigationEventTypes.NAME_CHANGED, navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void): this;
	on(type: NavigationEventTypes.NAME_CHANGED, listener: (navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void) => void): this;
	off(type: NavigationEventTypes.NAME_CHANGED, listener: (navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void) => void): this;

	fire(type: NavigationEventTypes.SAVE_NAVIGATION, navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void): this;
	on(type: NavigationEventTypes.SAVE_NAVIGATION, listener: (navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void) => void): this;
	off(type: NavigationEventTypes.SAVE_NAVIGATION, listener: (navigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void) => void): this;

	fire(type: NavigationEventTypes.NAVIGATION_SAVED, navigation: Navigation): this;
	on(type: NavigationEventTypes.NAVIGATION_SAVED, listener: (navigation: Navigation) => void): this;
	off(type: NavigationEventTypes.NAVIGATION_SAVED, listener: (navigation: Navigation) => void): this;

	fire(type: NavigationEventTypes.ASK_INDICATORS, onData: (indicators: Array<Indicator>) => void): this;
	on(type: NavigationEventTypes.ASK_INDICATORS, listener: (onData: (indicators: Array<Indicator>) => void) => void): this;
	off(type: NavigationEventTypes.ASK_INDICATORS, listener: (onData: (indicators: Array<Indicator>) => void) => void): this;
}