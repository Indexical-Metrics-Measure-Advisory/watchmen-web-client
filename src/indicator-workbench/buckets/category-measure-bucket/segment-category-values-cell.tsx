import {CategorySegment, CategorySegmentsHolder, OtherCategorySegmentValue} from '@/services/data/tuples/bucket-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentPropInput} from '../segments/widgets';
import {useCategorySegmentValue} from './use-category-segment-value';
import {NoSegmentValueDefined, SegmentValue, SegmentValueCellContainer, SegmentValues} from './widgets';

export const SegmentCategoryValuesCell = (props: { holder: CategorySegmentsHolder, segment: CategorySegment }) => {
	const {holder, segment} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useBucketEventBus();
	const [value, setValue] = useState('');
	const onRemoveValue = useCategorySegmentValue(holder, segment);

	const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};
	const tryToAddValue = () => {
		if (value.trim().length === 0) {
			return;
		}

		const add = (value: string) => {
			segment.value.push(value);
			setValue('');
			fire(BucketEventTypes.CATEGORY_SEGMENT_VALUE_ADDED, holder, segment, value);
			fire(BucketEventTypes.SEGMENT_CHANGED, holder, segment);
		};

		const categoryValue = value.trim();
		if (segment.value.includes(categoryValue)) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{Lang.INDICATOR_WORKBENCH.BUCKET.DUPLICATE_CATEGORY_SEGMENT_VALUE}
			</AlertLabel>);
			return;
		} else if (segment.value.some(v => v.toUpperCase() === categoryValue.toUpperCase())) {
			fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
				Lang.INDICATOR_WORKBENCH.BUCKET.DUPLICATE_CATEGORY_SEGMENT_VALUE_CASE_IGNORED,
				() => {
					add(categoryValue);
					fireGlobal(EventTypes.HIDE_DIALOG);
				},
				() => fireGlobal(EventTypes.HIDE_DIALOG));
			return;
		} else if (categoryValue === OtherCategorySegmentValue && segment.value.length !== 0) {
			fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
				{Lang.INDICATOR_WORKBENCH.BUCKET.OTHERS_IS_EXCLUSIVE_ON_CATEGORY_SEGMENT}
			</AlertLabel>);
			return;
		} else {
			add(categoryValue);
		}
	};
	const onKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return;
		}
		tryToAddValue();
	};
	const onConfirmClicked = () => tryToAddValue();

	const values = segment.value.filter(v => !!v.trim());
	const hasOthers = values.includes(OtherCategorySegmentValue);

	return <SegmentValueCellContainer canAdd={!hasOthers}>
		<SegmentValues>
			{values.length === 0
				?
				<NoSegmentValueDefined>{Lang.INDICATOR_WORKBENCH.BUCKET.NO_SEGMENT_VALUE_DEFINED}</NoSegmentValueDefined>
				: values.map(value => {
					const isOthers = value === OtherCategorySegmentValue;
					return <SegmentValue isOthers={isOthers} key={value}>
						<span>{value}</span>
						{isOthers
							? null
							: <span onClick={onRemoveValue(value)}>
								<FontAwesomeIcon icon={ICON_DELETE}/>
						</span>}
					</SegmentValue>;
				})}
		</SegmentValues>
		{hasOthers
			? null
			: <>
				<SegmentPropInput value={value}
				                  onChange={onValueChange} onKeyPress={onKeyPressed}
				                  placeholder={Lang.PLAIN.BUCKET_CATEGORY_SEGMENT_VALUE_PLACEHOLDER}/>
				<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>
					<span>{Lang.ACTIONS.CONFIRM}</span>
				</Button>
			</>}
	</SegmentValueCellContainer>;
};