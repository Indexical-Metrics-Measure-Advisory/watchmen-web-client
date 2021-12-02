import {Bucket, NumericValueMeasureBucket} from '@/services/data/tuples/bucket-types';
import {defendNumericValueMeasureBucket, isNumericValueMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {PropOf} from '@/services/types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {MeasureMethodEditor} from '../measure-method';
import {NumericSegmentHolderEditor} from '../numeric-segments-holder';
import {useBucketDefend} from '../use-bucket-defend';

type MeasureMethodOfValueMeasureBucket = PropOf<NumericValueMeasureBucket, 'measure'>;

const MeasureMethods: Record<MeasureMethodOfValueMeasureBucket, string> = {
	[MeasureMethod.FLOOR]: Lang.INDICATOR.MEASURE_METHOD.FLOOR,
	[MeasureMethod.RESIDENTIAL_AREA]: Lang.INDICATOR.MEASURE_METHOD.RESIDENTIAL_AREA,
	[MeasureMethod.AGE]: Lang.INDICATOR.MEASURE_METHOD.AGE,
	[MeasureMethod.BIZ_SCALE]: Lang.INDICATOR.MEASURE_METHOD.BIZ_SCALE
};
const MeasureMethodOptions: Array<DropdownOption> = Object.keys(MeasureMethods).map(type => {
	return {
		value: type,
		label: MeasureMethods[type as MeasureMethodOfValueMeasureBucket]
	};
});
export const NumericValueMeasureBucketEditor = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	const typeCheck = useBucketDefend<NumericValueMeasureBucket>(bucket, defendNumericValueMeasureBucket, isNumericValueMeasureBucket);

	if (!typeCheck) {
		return null;
	}

	return <>
		<MeasureMethodEditor bucket={bucket} methods={MeasureMethodOptions}/>
		<NumericSegmentHolderEditor holder={bucket}/>
	</>;
};
