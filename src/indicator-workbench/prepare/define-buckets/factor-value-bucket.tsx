import {Indicator, NumericValueBucket, RangeBucketValueIncluding} from '@/services/data/tuples/indicator-types';
import {Button} from '@/widgets/basic/button';
import {Dropdown} from '@/widgets/basic/dropdown';
import {Input} from '@/widgets/basic/input';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {ChangeEvent} from 'react';
import {useBucketsEventBus} from './buckets-event-bus';
import {BucketsEventTypes} from './buckets-event-bus-types';
import {FactorValueBucketContainer, FactorValueBucketIndexLabel, Label} from './widgets';

export const FactorValueBucket = (props: { indicator: Indicator; bucket: NumericValueBucket }) => {
	const {indicator, bucket} = props;

	const {fire} = useBucketsEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		bucket.name = value;
	};
	const onDeleteClicked = () => {
		const index = indicator.valueBuckets!.indexOf(bucket);
		indicator.valueBuckets!.splice(index, 1);
		fire(BucketsEventTypes.VALUE_BUCKET_DELETED);
	};
	const onIncludingChange = (option: DropdownOption) => {
		bucket.include = option.value as RangeBucketValueIncluding;
		forceUpdate();
	};

	const includingOptions: Array<DropdownOption> = [
		{
			value: RangeBucketValueIncluding.INCLUDE_MIN,
			key: 'include min',
			label: Lang.INDICATOR_WORKBENCH.BUCKET.RANGE_INCLUDE_MIN
		},
		{
			value: RangeBucketValueIncluding.INCLUDE_MAX,
			key: 'include max',
			label: Lang.INDICATOR_WORKBENCH.BUCKET.RANGE_INCLUDE_MAX
		}
	];

	// TODO min/max values table

	return <FactorValueBucketContainer>
		<FactorValueBucketIndexLabel/>
		<Label>{Lang.INDICATOR_WORKBENCH.PREPARE.BUCKET_NAME}</Label>
		<Input value={bucket.name || ''} onChange={onNameChanged}/>
		<Button ink={ButtonInk.DANGER} onClick={onDeleteClicked}>{Lang.ACTIONS.DELETE}</Button>
		<Label>{Lang.INDICATOR_WORKBENCH.BUCKET.RANGE_INCLUDING}</Label>
		<Dropdown value={bucket.include ?? RangeBucketValueIncluding.INCLUDE_MIN} options={includingOptions}
		          onChange={onIncludingChange}/>
	</FactorValueBucketContainer>;
};
