import {IndicatorAggregateArithmetic} from '../../tuples/indicator-types';
import {Navigation, NavigationTimeRangeType} from '../../tuples/navigation-types';
import {getCurrentTime} from '../../utils';
import {INDICATOR_ORDER_PREMIUM_ID} from './mock-data-indicators';

export const NAVIGATION_PREMIUM_ID = '1';

export const NavPremium: Navigation = {
	navigationId: NAVIGATION_PREMIUM_ID,
	name: 'Premium',
	indicators: [{
		name: '',
		indicatorId: INDICATOR_ORDER_PREMIUM_ID,
		criteria: [],
		aggregateArithmetics: IndicatorAggregateArithmetic.SUM
	}],
	timeRangeType: NavigationTimeRangeType.YEAR,
	timeRangeYear: `${new Date().getFullYear() - 1}`,
	compareWithPreviousTimeRange: true,
	description: 'Premium Navigation',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

export const DemoNavigations = [NavPremium];
export const DemoQueryNavigations = DemoNavigations;