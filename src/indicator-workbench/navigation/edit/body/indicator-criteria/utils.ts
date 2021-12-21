import {Bucket, BucketId} from '@/services/data/tuples/bucket-types';
import {
	isCategoryMeasureBucket,
	isEnumMeasureBucket,
	isNumericValueMeasureBucket
} from '@/services/data/tuples/bucket-utils';
import {Factor} from '@/services/data/tuples/factor-types';
import {Indicator, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {
	NavigationIndicatorCriteria,
	NavigationIndicatorCriteriaOperator
} from '@/services/data/tuples/navigation-types';
import {
	isNavigationIndicatorCriteriaOnBucket,
	isNavigationIndicatorCriteriaOnExpression
} from '@/services/data/tuples/navigation-utils';
import {isNotNull} from '@/services/data/utils';
import {Lang} from '@/widgets/langs';
import {IndicatorCriteriaDefData} from '../types';

export const findAvailableBuckets = (criteria: NavigationIndicatorCriteria, indicator: Indicator, defData: IndicatorCriteriaDefData): Array<Bucket> => {
	// eslint-disable-next-line
	if (criteria.factorId == indicator.factorId) {
		return (indicator.valueBuckets || []).map(bucketId => {
			// eslint-disable-next-line
			return (defData.valueBuckets || []).find(bucket => bucket.bucketId == bucketId);
		}).filter(isNotNull);
	}

	// eslint-disable-next-line
	const factor = (defData.topic?.factors || []).find(factor => factor.factorId == criteria.factorId);
	if (factor == null) {
		return [];
	}

	return tryToTransformToMeasures(factor).map(measure => {
		if (factor.enumId != null) {
			// eslint-disable-next-line
			return (defData.measureBuckets || []).filter(isEnumMeasureBucket).filter(bucket => bucket.enumId == factor.enumId);
		} else {
			return (defData.measureBuckets || []).filter(bucket => {
				return (isCategoryMeasureBucket(bucket) && bucket.measure === measure)
					|| (isNumericValueMeasureBucket(bucket) && bucket.measure === measure);
			});
		}
	}).flat();
};

export const buildValueBucketOptions = (criteria: NavigationIndicatorCriteria, indicator: Indicator, defData: IndicatorCriteriaDefData) => {
	return findAvailableBuckets(criteria, indicator, defData).map(bucket => {
		return {
			value: bucket.bucketId,
			label: bucket.name || 'Noname Bucket'
		};
	});
};

export const getCriteriaArithmetic = (criteria: NavigationIndicatorCriteria): BucketId | NavigationIndicatorCriteriaOperator | undefined => {
	if (isNavigationIndicatorCriteriaOnBucket(criteria)) {
		return criteria.bucketId;
	} else if (isNavigationIndicatorCriteriaOnExpression(criteria)) {
		return criteria.operator;
	}
	return (void 0);
};

export const isCriteriaArithmeticVisible = (criteria: NavigationIndicatorCriteria): boolean => {
	return criteria.factorId != null;
};

export const isCriteriaValueVisible = (criteria: NavigationIndicatorCriteria): boolean => {
	return isCriteriaArithmeticVisible(criteria)
		&& ((isNavigationIndicatorCriteriaOnBucket(criteria) && criteria.bucketId != null)
			|| (isNavigationIndicatorCriteriaOnExpression(criteria) && criteria.operator != null));
};

export const showInputForValue = (criteria: NavigationIndicatorCriteria): boolean => {
	return !isNavigationIndicatorCriteriaOnBucket(criteria);
};

export const getAvailableTimeRange = (factor?: Factor): { year: boolean; month: boolean } => {
	const measures = factor == null ? [] : tryToTransformToMeasures(factor);
	return {
		year: measures.includes(MeasureMethod.YEAR),
		month: measures.includes(MeasureMethod.MONTH)
	};
};

export const getTimeRangePlaceholder = (year: boolean, month: boolean): string | undefined => {
	if (year && month) {
		return Lang.PLAIN.NAVIGATION_CRITERIA_TIME_RANGE_YEAR_MONTH;
	} else if (year) {
		return Lang.PLAIN.NAVIGATION_CRITERIA_TIME_RANGE_YEAR;
	} else if (month) {
		return Lang.PLAIN.NAVIGATION_CRITERIA_TIME_RANGE_MONTH;
	} else {
		return (void 0);
	}
};
