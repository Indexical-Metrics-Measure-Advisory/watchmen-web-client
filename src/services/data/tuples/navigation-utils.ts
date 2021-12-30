import {
	MANUAL_COMPUTE_NAVIGATION_INDICATOR_ID,
	ManualComputeNavigationIndicator,
	NavigationIndicator,
	NavigationIndicatorCriteria,
	NavigationIndicatorCriteriaOnBucket,
	NavigationIndicatorCriteriaOnExpression
} from './navigation-types';

export const isNavigationIndicatorCriteriaOnBucket = (criteria: NavigationIndicatorCriteria): criteria is NavigationIndicatorCriteriaOnBucket => {
	return (criteria as any).bucketId != null;
};

export const isNavigationIndicatorCriteriaOnExpression = (criteria: NavigationIndicatorCriteria): criteria is NavigationIndicatorCriteriaOnExpression => {
	return (criteria as any).operator != null;
};

export const isManualComputeNavigationIndicator = (navigationIndicator: NavigationIndicator): navigationIndicator is ManualComputeNavigationIndicator => {
	// eslint-disable-next-line
	return navigationIndicator.indicatorId == MANUAL_COMPUTE_NAVIGATION_INDICATOR_ID;
};