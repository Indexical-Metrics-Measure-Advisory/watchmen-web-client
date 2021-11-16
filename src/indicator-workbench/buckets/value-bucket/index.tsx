import {NumericValueBucket, RangeBucketValueIncluding} from '@/services/data/tuples/bucket-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {ChangeEvent} from 'react';

export const ValueBucket = (props: { bucket: NumericValueBucket }) => {
	const {bucket} = props;

	const forceUpdate = useForceUpdate();

	const onNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		bucket.name = value;
	};
	const onDeleteClicked = () => {
		// TODO
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

	return <>
	</>;
};
