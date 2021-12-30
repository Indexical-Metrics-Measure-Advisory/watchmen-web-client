import {IndicatorAggregateArithmetic} from '../../tuples/indicator-types';
import {Navigation, NavigationIndicatorCriteriaOnBucket, NavigationTimeRangeType} from '../../tuples/navigation-types';
import {getCurrentTime} from '../../utils';
import {BUCKET_CITIES_ID} from './mock-data-buckets';
import {INDICATOR_ORDER_PREMIUM_ID} from './mock-data-indicators';

export const NAVIGATION_PREMIUM_ID = '1';

export const NavPremium: Navigation = {
	navigationId: NAVIGATION_PREMIUM_ID,
	name: 'Premium',
	indicators: [{
		name: '',
		indicatorId: INDICATOR_ORDER_PREMIUM_ID,
		criteria: [
			{
				factorId: '209',
				bucketId: BUCKET_CITIES_ID,
				bucketSegmentName: 'NY'
			} as NavigationIndicatorCriteriaOnBucket
		],
		formula: 'interpolation(r, 0.1, 10, 0.8, 20)',
		aggregateArithmetic: IndicatorAggregateArithmetic.SUM
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