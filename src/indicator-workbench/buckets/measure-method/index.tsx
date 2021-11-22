import {MeasureBucket} from '@/services/data/tuples/bucket-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {TuplePropertyDropdown, TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import {TuplePropertyQuestionMark} from '@/widgets/tuple-workbench/tuple-property-question-mark';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {useFixProperty} from '../use-fix-property';

export const MeasureMethodEditor = (props: { bucket: MeasureBucket; methods: Array<DropdownOption> }) => {
	const {bucket, methods} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	const canChangeMethod = useFixProperty(bucket);

	const onMeasureMethodChange = (option: DropdownOption) => {
		bucket.measure = option.value as MeasureMethod;
		fire(BucketEventTypes.BUCKET_MEASURE_METHOD_CHANGED, bucket);
		forceUpdate();
	};

	const label = () => {
		const option = methods.find(method => method.value === bucket.measure);
		if (!option) {
			return null;
		}
		let label;
		if (typeof option.label === 'function') {
			label = option.label(option);
		} else {
			label = option.label;
		}
		if (typeof label === 'string') {
			return label;
		} else {
			return label.node;
		}
	};

	return <>
		<TuplePropertyLabel>
			<span>{Lang.INDICATOR_WORKBENCH.BUCKET.MEASURE_METHOD_LABEL}</span>
			<TuplePropertyQuestionMark>
				{Lang.INDICATOR_WORKBENCH.BUCKET.MEASURE_METHOD_IS_FIXED_ONCE_SAVE}
			</TuplePropertyQuestionMark>
		</TuplePropertyLabel>
		{canChangeMethod
			? <TuplePropertyDropdown value={bucket.measure}
			                         options={methods}
			                         onChange={onMeasureMethodChange}/>
			: <TuplePropertyLabel>
				{label()}
			</TuplePropertyLabel>}
	</>;
};
