import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {base64Encode} from '@/services/utils';
import {getCurrentLanguage} from '@/widgets/langs';

export const createNavigation = (name?: string): Navigation => {
	const navigationId = generateUuid();
	return {
		navigationId,
		name: name || `${getCurrentLanguage().PLAIN.NEW_NAVIGATION_NAME} ${base64Encode(navigationId).substr(0, 12)}`,
		indicators: [],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

export const createNavigationIndicator = (navigation: Navigation, indicator: Indicator): NavigationIndicator => {
	const navigationIndicator: NavigationIndicator = {indicatorId: indicator.indicatorId, criteria: []};
	if (navigation.indicators == null) {
		navigation.indicators = [];
	}
	navigation.indicators.push(navigationIndicator);
	return navigationIndicator;
};