import {EnumMeasureBucket} from '@/services/data/tuples/bucket-types';
import {EnumId} from '@/services/data/tuples/enum-types';
import {QueryEnum} from '@/services/data/tuples/query-enum-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {TuplePropertyDropdown, TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import {TuplePropertyQuestionMark} from '@/widgets/tuple-workbench/tuple-property-question-mark';
import React, {useEffect, useState} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {useFixProperty} from '../use-fix-property';

export const EnumEditor = (props: { bucket: EnumMeasureBucket }) => {
	const {bucket} = props;

	const {fire: fireTuple} = useTupleEventBus();
	const {fire} = useBucketEventBus();
	const [enums, setEnums] = useState<Array<QueryEnum>>([]);
	const forceUpdate = useForceUpdate();
	const canChangeEnum = useFixProperty(bucket);
	useEffect(() => {
		fireTuple(TupleEventTypes.ASK_ENUMS, (enums: Array<QueryEnum>) => {
			setEnums(enums);
		});
	}, [fireTuple]);

	const onEnumChange = (option: DropdownOption) => {
		bucket.enumId = option.value as EnumId;
		fire(BucketEventTypes.BUCKET_ENUM_CHANGED, bucket);
		forceUpdate();
	};

	const options = enums.map(enumeration => {
		return {value: enumeration.enumId, label: enumeration.name};
	});

	return <>
		<TuplePropertyLabel>
			<span>{Lang.INDICATOR_WORKBENCH.BUCKET.ENUM_LABEL}</span>
			<TuplePropertyQuestionMark>
				{Lang.INDICATOR_WORKBENCH.BUCKET.ENUM_IS_FIXED_ONCE_SAVE}
			</TuplePropertyQuestionMark>
		</TuplePropertyLabel>
		{canChangeEnum
			? <TuplePropertyDropdown value={bucket.enumId}
			                         options={options}
			                         onChange={onEnumChange}/>
			: <TuplePropertyLabel>
				{options.find(option => {
					// eslint-disable-next-line
					return bucket.enumId == option.value;
				})?.label ?? 'Noname Enumeration'}
			</TuplePropertyLabel>}
	</>;
};
