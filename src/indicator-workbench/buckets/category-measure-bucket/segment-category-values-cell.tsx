import {CategorySegment, CategorySegmentsHolder} from '@/services/data/tuples/bucket-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ChangeEvent, useState} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentPropInput} from '../segments/widgets';
import {NoSegmentValueDefined, SegmentValue, SegmentValueCellContainer, SegmentValues} from './widgets';

export const SegmentCategoryValuesCell = (props: { holder: CategorySegmentsHolder, segment: CategorySegment }) => {
	const {holder, segment} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useBucketEventBus();
	const [value, setValue] = useState('');

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
		} else {
			add(categoryValue);
		}
	};
	const onKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return;
		}
		tryToAddValue();
	};
	const onConfirmClicked = () => tryToAddValue();

	const values = segment.value.filter(v => !!v.trim())
		.sort((a, b) => a.localeCompare(b, void 0, {sensitivity: 'base', numeric: true, caseFirst: 'lower'}));

	return <SegmentValueCellContainer>
		<SegmentPropInput value={value}
		                  onChange={onValueChange} onKeyPress={onKeyPressed}
		                  placeholder={Lang.PLAIN.BUCKET_CATEGORY_SEGMENT_VALUE_PLACEHOLDER}/>
		<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>
			<span>{Lang.ACTIONS.CONFIRM}</span>
		</Button>
		<SegmentValues>
			{values.length === 0
				?
				<NoSegmentValueDefined>{Lang.INDICATOR_WORKBENCH.BUCKET.NO_SEGMENT_VALUE_DEFINED}</NoSegmentValueDefined>
				: values.map(value => {
					return <SegmentValue key={value}>
						<span>{value}</span>
						<span><FontAwesomeIcon icon={ICON_DELETE}/></span>
					</SegmentValue>;
				})}
		</SegmentValues>
	</SegmentValueCellContainer>;
};