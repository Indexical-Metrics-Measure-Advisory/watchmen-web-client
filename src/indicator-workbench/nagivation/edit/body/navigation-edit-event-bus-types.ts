import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';

export enum NavigationEditEventTypes {
	REPAINT = 'repaint',

	INDICATOR_ADDED = 'add-indicator'
}

export interface NavigationEditEventBus {
	fire(type: NavigationEditEventTypes.REPAINT): this;
	on(type: NavigationEditEventTypes.REPAINT, listener: () => void): this;
	off(type: NavigationEditEventTypes.REPAINT, listener: () => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_ADDED, navigtion: Navigation, navigationIndicator: NavigationIndicator, indicator: Indicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_ADDED, listener: (navigtion: Navigation, navigationIndicator: NavigationIndicator, indicator: Indicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_ADDED, listener: (navigtion: Navigation, navigationIndicator: NavigationIndicator, indicator: Indicator) => void): this;
}