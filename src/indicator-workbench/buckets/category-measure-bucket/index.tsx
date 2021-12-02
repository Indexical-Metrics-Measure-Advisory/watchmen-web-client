import {Bucket, CategoryMeasureBucket} from '@/services/data/tuples/bucket-types';
import {defendCategoryMeasureBucket, isCategoryMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {PropOf} from '@/services/types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {MeasureMethodEditor} from '../measure-method';
import {useBucketDefend} from '../use-bucket-defend';
import {CategorySegments} from './category-segments';

type MeasureMethodOfValueMeasureBucket = PropOf<CategoryMeasureBucket, 'measure'>;

const MeasureMethods: Record<MeasureMethodOfValueMeasureBucket, string> = {
	[MeasureMethod.CONTINENT]: Lang.INDICATOR.MEASURE_METHOD.CONTINENT,
	[MeasureMethod.REGION]: Lang.INDICATOR.MEASURE_METHOD.REGION,
	[MeasureMethod.COUNTRY]: Lang.INDICATOR.MEASURE_METHOD.COUNTRY,
	[MeasureMethod.PROVINCE]: Lang.INDICATOR.MEASURE_METHOD.PROVINCE,
	[MeasureMethod.CITY]: Lang.INDICATOR.MEASURE_METHOD.CITY,
	[MeasureMethod.DISTRICT]: Lang.INDICATOR.MEASURE_METHOD.DISTRICT,
	[MeasureMethod.RESIDENCE_TYPE]: Lang.INDICATOR.MEASURE_METHOD.RESIDENCE_TYPE,
	[MeasureMethod.GENDER]: Lang.INDICATOR.MEASURE_METHOD.GENDER,
	[MeasureMethod.OCCUPATION]: Lang.INDICATOR.MEASURE_METHOD.OCCUPATION,
	[MeasureMethod.RELIGION]: Lang.INDICATOR.MEASURE_METHOD.RELIGION,
	[MeasureMethod.NATIONALITY]: Lang.INDICATOR.MEASURE_METHOD.NATIONALITY,
	[MeasureMethod.BIZ_TRADE]: Lang.INDICATOR.MEASURE_METHOD.BIZ_TRADE,
	[MeasureMethod.BOOLEAN]: Lang.INDICATOR.MEASURE_METHOD.BOOLEAN
};
const MeasureMethodOptions: Array<DropdownOption> = Object.keys(MeasureMethods).map(type => {
	return {
		value: type,
		label: MeasureMethods[type as MeasureMethodOfValueMeasureBucket]
	};
});
export const CategoryMeasureBucketEditor = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	const typeCheck = useBucketDefend<CategoryMeasureBucket>(bucket, defendCategoryMeasureBucket, isCategoryMeasureBucket);

	if (!typeCheck) {
		return null;
	}

	return <>
		<MeasureMethodEditor bucket={bucket} methods={MeasureMethodOptions}/>
		<CategorySegments bucket={bucket}/>
	</>;
};
