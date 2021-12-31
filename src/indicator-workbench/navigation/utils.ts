import {Indicator, IndicatorAggregateArithmetic} from '@/services/data/tuples/indicator-types';
import {
	MANUAL_COMPUTE_NAVIGATION_INDICATOR_ID,
	ManualComputeNavigationIndicator,
	Navigation,
	NavigationIndicator,
	NavigationTimeRangeType
} from '@/services/data/tuples/navigation-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {base64Encode} from '@/services/utils';
import {getCurrentLanguage} from '@/widgets/langs';

export const createNavigation = (name?: string): Navigation => {
	const navigationId = generateUuid();
	return {
		navigationId,
		name: name || `${getCurrentLanguage().PLAIN.NEW_NAVIGATION_NAME} ${base64Encode(navigationId).substring(0, 12)}`,
		indicators: [],
		timeRangeType: NavigationTimeRangeType.YEAR,
		timeRangeYear: `${new Date().getFullYear() - 1}`,
		compareWithPreviousTimeRange: false,
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

const generateVariableName = (navigation: Navigation, navigationIndicator: NavigationIndicator) => {
	if (navigation.indicators.length === 0) {
		navigationIndicator.variableName = 'v1';
	} else {
		const max = navigation.indicators.map(({variableName = 'v0'}) => {
			return Number(variableName.replace('v', ''));
		}).reduce((max, index) => {
			return Math.max(max, index);
		}, 0);
		navigationIndicator.variableName = `v${max + 1}`;
	}
};
export const createNavigationIndicator = (navigation: Navigation, indicator: Indicator): NavigationIndicator => {
	const navigationIndicator: NavigationIndicator = {
		indicatorId: indicator.indicatorId,
		name: '',
		criteria: [],
		aggregateArithmetic: IndicatorAggregateArithmetic.SUM
	};
	if (navigation.indicators == null) {
		navigation.indicators = [];
	}
	generateVariableName(navigation, navigationIndicator);
	navigation.indicators.push(navigationIndicator);
	return navigationIndicator;
};

export const createNavigationManualComputeIndicator = (navigation: Navigation): ManualComputeNavigationIndicator => {
	const navigationIndicator: ManualComputeNavigationIndicator = {
		indicatorId: MANUAL_COMPUTE_NAVIGATION_INDICATOR_ID,
		name: '',
		criteria: [],
		aggregateArithmetic: IndicatorAggregateArithmetic.MAX
	};
	if (navigation.indicators == null) {
		navigation.indicators = [];
	}
	generateVariableName(navigation, navigationIndicator);
	navigation.indicators.push(navigationIndicator);
	return navigationIndicator;
};