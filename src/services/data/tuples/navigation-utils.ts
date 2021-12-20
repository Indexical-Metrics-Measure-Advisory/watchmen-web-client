import {
	NavigationIndicatorCriteria,
	NavigationIndicatorOnBucket,
	NavigationIndicatorOnExpression
} from './navigation-types';

export const isNavigationIndicatorCriteriaOnBucket = (criteria: NavigationIndicatorCriteria): criteria is NavigationIndicatorOnBucket => {
	return (criteria as any).bucketId != null;
};

export const isNavigationIndicatorCriteriaOnExpression = (criteria: NavigationIndicatorCriteria): criteria is NavigationIndicatorOnExpression => {
	return (criteria as any).operator != null;
};