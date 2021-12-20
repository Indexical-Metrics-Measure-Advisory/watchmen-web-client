import {
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