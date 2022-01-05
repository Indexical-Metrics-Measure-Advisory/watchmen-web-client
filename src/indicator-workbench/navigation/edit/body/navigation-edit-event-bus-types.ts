import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator, NavigationIndicatorCriteria} from '@/services/data/tuples/navigation-types';
import {CalculatedIndicatorValues, IndicatorValues} from './types';

export enum NavigationEditEventTypes {
	REPAINT = 'repaint',
	EXPAND_NAME = 'expand-name',
	NAME_EXPANDED = 'name-expanded',
	EXPAND_CRITERIA = 'expand-criteria',
	CRITERIA_EXPANDED = 'criteria-expanded',
	EXPAND_CALCULATION = 'expand-calculation',
	CALCULATION_EXPANDED = 'calculation-expanded',

	TIME_RANGE_CHANGED = 'time-range-changed',

	INDICATOR_ADDED = 'indicator-added',
	COMPUTE_INDICATOR_ADDED = 'compute-indicator-added',
	INDICATOR_REMOVED = 'indicator-removed',
	INDICATOR_NAME_CHANGED = 'indicator-name-changed',

	INDICATOR_CRITERIA_ADDED = 'indicator-criteria-added',
	INDICATOR_CRITERIA_CHANGED = 'indicator-criteria-changed',
	INDICATOR_CRITERIA_FACTOR_CHANGED = 'indicator-criteria-factor-changed',
	INDICATOR_CRITERIA_ARITHMETIC_CHANGED = 'indicator-criteria-arithmetic-changed',
	INDICATOR_CRITERIA_REMOVED = 'indicator-criteria-removed',
	INDICATOR_AGGREGATION_CHANGED = 'indicator-aggregation-changed',
	INDICATOR_FORMULA_CHANGED = 'indicator-formula-changed',
	INDICATOR_SCORE_INCLUDE_CHANGED = 'indicator-score-included-changed',

	VALUES_CHANGED = 'values-changed',
	VALUES_CALCULATED = 'values-calculated',
	ASK_CALCULATED_VALUES = 'ask-calculated-values'
}

export interface NavigationEditEventBus {
	fire(type: NavigationEditEventTypes.REPAINT): this;
	on(type: NavigationEditEventTypes.REPAINT, listener: () => void): this;
	off(type: NavigationEditEventTypes.REPAINT, listener: () => void): this;

	fire(type: NavigationEditEventTypes.EXPAND_NAME, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.EXPAND_NAME, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.EXPAND_NAME, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.NAME_EXPANDED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.NAME_EXPANDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.NAME_EXPANDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.EXPAND_CRITERIA, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.EXPAND_CRITERIA, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.EXPAND_CRITERIA, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.CRITERIA_EXPANDED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.CRITERIA_EXPANDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.CRITERIA_EXPANDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.EXPAND_CALCULATION, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.EXPAND_CALCULATION, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.EXPAND_CALCULATION, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.CALCULATION_EXPANDED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.CALCULATION_EXPANDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.CALCULATION_EXPANDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.TIME_RANGE_CHANGED, navigation: Navigation): this;
	on(type: NavigationEditEventTypes.TIME_RANGE_CHANGED, listener: (navigation: Navigation) => void): this;
	off(type: NavigationEditEventTypes.TIME_RANGE_CHANGED, listener: (navigation: Navigation) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_ADDED, navigation: Navigation, navigationIndicator: NavigationIndicator, indicator: Indicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_ADDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, indicator: Indicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_ADDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, indicator: Indicator) => void): this;

	fire(type: NavigationEditEventTypes.COMPUTE_INDICATOR_ADDED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.COMPUTE_INDICATOR_ADDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.COMPUTE_INDICATOR_ADDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_REMOVED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_REMOVED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_REMOVED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_NAME_CHANGED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_NAME_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_NAME_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_CRITERIA_FACTOR_CHANGED, navigation: Navigation, navigationIndicator: NavigationIndicator, criteria: NavigationIndicatorCriteria): this;
	on(type: NavigationEditEventTypes.INDICATOR_CRITERIA_FACTOR_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, criteria: NavigationIndicatorCriteria) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_CRITERIA_FACTOR_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, criteria: NavigationIndicatorCriteria) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_CRITERIA_ARITHMETIC_CHANGED, navigation: Navigation, navigationIndicator: NavigationIndicator, criteria: NavigationIndicatorCriteria): this;
	on(type: NavigationEditEventTypes.INDICATOR_CRITERIA_ARITHMETIC_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, criteria: NavigationIndicatorCriteria) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_CRITERIA_ARITHMETIC_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, criteria: NavigationIndicatorCriteria) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_AGGREGATION_CHANGED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_AGGREGATION_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_AGGREGATION_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.INDICATOR_SCORE_INCLUDE_CHANGED, navigation: Navigation, navigationIndicator: NavigationIndicator): this;
	on(type: NavigationEditEventTypes.INDICATOR_SCORE_INCLUDE_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;
	off(type: NavigationEditEventTypes.INDICATOR_SCORE_INCLUDE_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator) => void): this;

	fire(type: NavigationEditEventTypes.VALUES_CHANGED, navigation: Navigation, navigationIndicator: NavigationIndicator, values: IndicatorValues): this;
	on(type: NavigationEditEventTypes.VALUES_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, values: IndicatorValues) => void): this;
	off(type: NavigationEditEventTypes.VALUES_CHANGED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, values: IndicatorValues) => void): this;

	fire(type: NavigationEditEventTypes.VALUES_CALCULATED, navigation: Navigation, navigationIndicator: NavigationIndicator, values: CalculatedIndicatorValues): this;
	on(type: NavigationEditEventTypes.VALUES_CALCULATED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, values: CalculatedIndicatorValues) => void): this;
	off(type: NavigationEditEventTypes.VALUES_CALCULATED, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, values: CalculatedIndicatorValues) => void): this;

	fire(type: NavigationEditEventTypes.ASK_CALCULATED_VALUES, navigation: Navigation, navigationIndicator: NavigationIndicator, onData: (values: CalculatedIndicatorValues) => void): this;
	on(type: NavigationEditEventTypes.ASK_CALCULATED_VALUES, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, onData: (values: CalculatedIndicatorValues) => void) => void): this;
	off(type: NavigationEditEventTypes.ASK_CALCULATED_VALUES, listener: (navigation: Navigation, navigationIndicator: NavigationIndicator, onData: (values: CalculatedIndicatorValues) => void) => void): this;
}