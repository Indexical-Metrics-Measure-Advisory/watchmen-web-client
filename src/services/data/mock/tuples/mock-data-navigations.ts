import {Navigation, NavigationTimeRangeType} from '../../tuples/navigation-types';
import {getCurrentTime} from '../../utils';
import {INDICATOR_ORDER_PREMIUM_ID} from './mock-data-indicators';

export const NAVIGATION_PREMIUM_ID = '1';

export const NavPremium: Navigation = {
	navigationId: NAVIGATION_PREMIUM_ID,
	name: 'Premium',
	indicators: new Array(20).fill({indicatorId: INDICATOR_ORDER_PREMIUM_ID}),
	timeRangeType: NavigationTimeRangeType.YEAR,
	timeRange: `${new Date().getFullYear() - 1}`,
	compareWithPreviousTimeRange: true,
	description: 'Premium Navigation',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

export const DemoNavigations = [NavPremium];
export const DemoQueryNavigations = DemoNavigations;