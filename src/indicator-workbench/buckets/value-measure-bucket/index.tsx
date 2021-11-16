import {Bucket, NumericValueMeasureBucket} from '@/services/data/tuples/bucket-types';
import {defendNumericValueSegmentsHolder, isNumericValueMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {PropOf} from '@/services/types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import React, {useEffect} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {MeasureMethodEditor} from '../measure-method';
import {SegmentHolderEditor} from '../segments-holder';

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
		label: () => {
			return {node: MeasureMethods[type as MeasureMethodOfValueMeasureBucket], label: type};
		},
		key: type
	};
});
export const NumericValueMeasureBucketEditor = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	const {on, off} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTypeChanged = (aBucket: Bucket) => {
			if (aBucket !== bucket) {
				return;
			}
			defendNumericValueSegmentsHolder(bucket as NumericValueMeasureBucket);
			forceUpdate();
		};
		on(BucketEventTypes.BUCKET_TYPE_CHANGED, onTypeChanged);
		return () => {
			off(BucketEventTypes.BUCKET_TYPE_CHANGED, onTypeChanged);
		};
	}, [on, off, forceUpdate, bucket]);

	if (!isNumericValueMeasureBucket(bucket)) {
		return null;
	}

	return <>
		<MeasureMethodEditor bucket={bucket} methods={MeasureMethodOptions}/>
		<SegmentHolderEditor holder={bucket}/>
	</>;
};
