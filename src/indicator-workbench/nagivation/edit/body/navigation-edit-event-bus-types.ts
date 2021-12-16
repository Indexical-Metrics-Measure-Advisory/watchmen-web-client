export enum NavigationEditEventTypes {
	REPAINT = 'repaint',
}

export interface NavigationEditEventBus {
	fire(type: NavigationEditEventTypes.REPAINT): this;
	on(type: NavigationEditEventTypes.REPAINT, listener: () => void): this;
	off(type: NavigationEditEventTypes.REPAINT, listener: () => void): this;
}