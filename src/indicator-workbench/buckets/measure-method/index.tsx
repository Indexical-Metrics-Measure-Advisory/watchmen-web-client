import {MeasureBucket} from '@/services/data/tuples/bucket-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {TuplePropertyDropdown, TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';

export const MeasureMethodEditor = (props: { bucket: MeasureBucket; methods: Array<DropdownOption> }) => {
	const {bucket, methods} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();

	const onMeasureMethodChange = (option: DropdownOption) => {
		bucket.measure = option.value as MeasureMethod;
		fire(BucketEventTypes.BUCKET_MEASURE_METHOD_CHANGED, bucket);
		forceUpdate();
	};

	return <>
		<TuplePropertyLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.MEASURE_METHOD_LABEL}</TuplePropertyLabel>
		<TuplePropertyDropdown value={bucket.measure}
		                       options={methods}
		                       onChange={onMeasureMethodChange}/>
	</>;
};
