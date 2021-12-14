import {Navigation} from '@/services/data/tuples/navigation-types';

export enum NavigationEventTypes {
	NAVIGATION_PICKED = 'navigation-picked'
}

export interface NavigationEventBus {
	fire(type: NavigationEventTypes.NAVIGATION_PICKED, navigation: Navigation): this;
	on(type: NavigationEventTypes.NAVIGATION_PICKED, listener: (navigation: Navigation) => void): this;
	off(type: NavigationEventTypes.NAVIGATION_PICKED, listener: (navigation: Navigation) => void): this;
}