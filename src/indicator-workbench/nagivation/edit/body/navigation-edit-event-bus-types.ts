export enum NavigationEditEventTypes {
	EXPAND_MORE_INDICATORS = 'expand-more-indicators',
	COLLAPSE_MORE_INDICATORS = 'collapse-more-indicators'
}

export interface NavigationEditEventBus {
	fire(type: NavigationEditEventTypes.EXPAND_MORE_INDICATORS): this;
	on(type: NavigationEditEventTypes.EXPAND_MORE_INDICATORS, listener: () => void): this;
	off(type: NavigationEditEventTypes.EXPAND_MORE_INDICATORS, listener: () => void): this;

	fire(type: NavigationEditEventTypes.COLLAPSE_MORE_INDICATORS): this;
	on(type: NavigationEditEventTypes.COLLAPSE_MORE_INDICATORS, listener: () => void): this;
	off(type: NavigationEditEventTypes.COLLAPSE_MORE_INDICATORS, listener: () => void): this;
}