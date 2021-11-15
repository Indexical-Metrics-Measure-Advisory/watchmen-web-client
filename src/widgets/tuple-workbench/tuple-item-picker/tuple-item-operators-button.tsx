import {TupleHolder} from '@/services/data/tuples/tuple-types';
import React, {RefObject, useEffect, useState} from 'react';
import {ICON_ADD, ICON_DISCARD, ICON_EDIT} from '../../basic/constants';
import {ButtonInk} from '../../basic/types';
import {useTupleItemPickerEventBus} from './tuple-item-picker-event-bus';
import {TupleItemPickerEventTypes} from './tuple-item-picker-event-bus-types';
import {TupleItemPickerButton, TupleItemPickerButtonIcon, TupleItemPickerButtonLabel} from './widgets';

export const TupleItemOperatorsButton = <TH extends TupleHolder>(props: {
	actionLabel: string;
	holder: TH;
	isHolding: (holder: TH) => boolean;
	inputRef: RefObject<HTMLInputElement>;
}) => {
	const {actionLabel, holder, isHolding, inputRef} = props;

	const {on, off, fire} = useTupleItemPickerEventBus();
	const [onSearch, setOnSearch] = useState(false);
	useEffect(() => {
		const onSearchStart = () => {
			// clear search text, start a new journey
			inputRef.current && inputRef.current.focus();
			setOnSearch(true);
		};
		const onSearchDone = () => {
			inputRef.current && inputRef.current.blur();
			setOnSearch(false);
		};
		on(TupleItemPickerEventTypes.SEARCH_STARTED, onSearchStart);
		on(TupleItemPickerEventTypes.SEARCH_DONE, onSearchDone);
		return () => {
			off(TupleItemPickerEventTypes.SEARCH_STARTED, onSearchStart);
			off(TupleItemPickerEventTypes.SEARCH_DONE, onSearchDone);
		};
	}, [inputRef, on, off]);

	const onStartClicked = () => {
		if (!onSearch) {
			fire(TupleItemPickerEventTypes.SEARCH_STARTED);
		} else {
			fire(TupleItemPickerEventTypes.SEARCH_DONE);
		}
	};

	const hasItems = isHolding(holder);

	return <TupleItemPickerButton asClose={onSearch} ink={ButtonInk.PRIMARY} onClick={onStartClicked}>
		<TupleItemPickerButtonIcon icon={onSearch ? ICON_DISCARD : (hasItems ? ICON_EDIT : ICON_ADD)}
		                           data-standalone={!onSearch}/>
		<TupleItemPickerButtonLabel visible={!onSearch}>{actionLabel}</TupleItemPickerButtonLabel>
	</TupleItemPickerButton>;

};