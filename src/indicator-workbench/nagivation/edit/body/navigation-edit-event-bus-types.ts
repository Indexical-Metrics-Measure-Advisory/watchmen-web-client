import {NavigationBlockRect} from './types';

export enum NavigationEditEventTypes {
	ASK_ROOT_RECT = 'navigation-picked',

	EXPAND_MORE_INDICATORS = 'expand-more-indicators',
	COLLAPSE_MORE_INDICATORS = 'collapse-more-indicators'
}

export interface NavigationEditEventBus {
	fire(type: NavigationEditEventTypes.ASK_ROOT_RECT, onData: (rect: NavigationBlockRect) => void): this;
	on(type: NavigationEditEventTypes.ASK_ROOT_RECT, listener: (onData: (rect: NavigationBlockRect) => void) => void): this;
	off(type: NavigationEditEventTypes.ASK_ROOT_RECT, listener: (onData: (rect: NavigationBlockRect) => void) => void): this;

	fire(type: NavigationEditEventTypes.EXPAND_MORE_INDICATORS): this;
	on(type: NavigationEditEventTypes.EXPAND_MORE_INDICATORS, listener: () => void): this;
	off(type: NavigationEditEventTypes.EXPAND_MORE_INDICATORS, listener: () => void): this;

	fire(type: NavigationEditEventTypes.COLLAPSE_MORE_INDICATORS): this;
	on(type: NavigationEditEventTypes.COLLAPSE_MORE_INDICATORS, listener: () => void): this;
	off(type: NavigationEditEventTypes.COLLAPSE_MORE_INDICATORS, listener: () => void): this;
}