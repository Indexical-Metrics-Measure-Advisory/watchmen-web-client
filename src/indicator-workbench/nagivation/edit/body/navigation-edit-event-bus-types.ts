import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';

export enum NavigationEditEventTypes {
	REPAINT = 'repaint',
	EXPAND_CRITERIA = 'expand-criteria',
	CRITERIA_EXPANDED = 'criteria-expanded',

	TIME_RANGE_CHANGED = 'time-range-changed',
	INDICATOR_ADDED = 'indicator-added',
	INDICATOR_CRITERIA_ADDED = 'indicator-criteria-added',
	INDICATOR_CRITERIA_CHANGED = 'indicator-criteria-changed',
	INDICATOR_CRITERIA_REMOVED = 'indicator-criteria-removed'
}

export interface NavigationEditEventBus {
	fire(type: NavigationEditEventTypes.REPAINT): this;
	on(type: NavigationEditEventTypes.REPAINT, listener: () => void): this;
	off(type: NavigationEditEventTypes.REPAINT, listener: () => void): this;

	fire(type: NavigationEditEventTypes.EXPAND_CRITERIA, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.EXPAND_CRITERIA, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.EXPAND_CRITERIA, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.CRITERIA_EXPANDED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.CRITERIA_EXPANDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.CRITERIA_EXPANDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.TIME_RANGE_CHANGED, navigation: Navigation): this;
	on(type: NavigationEditEventTypes.TIME_RANGE_CHANGED, listener: (navigation: Navigation) => void): this;
	off(type: NavigationEditEventTypes.TIME_RANGE_CHANGED, listener: (navigation: Navigation) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_ADDED, navigation: Navigation, navigationIndicator: NavigationIndicator, indicator: Indicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_ADDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, indicator: Indicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_ADDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, indicator: Indicator) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
}