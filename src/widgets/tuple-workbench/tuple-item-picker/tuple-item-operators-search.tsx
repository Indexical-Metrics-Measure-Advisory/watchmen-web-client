import {QueryTupleForHolder} from '@/services/data/tuples/tuple-types';
import React, {ChangeEvent, ForwardedRef, forwardRef, useEffect, useState} from 'react';
import {useTupleItemPickerEventBus} from './tuple-item-picker-event-bus';
import {
	PickerDropdownPosition,
	PickerSearchState,
	TupleItemPickerEventTypes
} from './tuple-item-picker-event-bus-types';
import {TupleItemPickerSearchInput} from './widgets';

export const TupleItemOperatorsSearch = forwardRef(<QTH extends QueryTupleForHolder>(props: {
	listCandidates: (searchText: string) => Promise<Array<QTH>>;
}, inputRef: ForwardedRef<HTMLInputElement>) => {
	const {listCandidates} = props;

	const {on, off, fire} = useTupleItemPickerEventBus();
	const [onSearch, setOnSearch] = useState(false);
	const [dropdownPosition, setDropdownPosition] = useState<PickerDropdownPosition>(PickerDropdownPosition.BOTTOM);
	const [searchText, setSearchText] = useState('');
	const [searchHandle, setSearchHandle] = useState<number | null>(null);
	useEffect(() => {
		const onSearchStarted = () => {
			setSearchText('');
			setOnSearch(true);
		};
		const onSearchDone = () => setOnSearch(false);
		on(TupleItemPickerEventTypes.SEARCH_STARTED, onSearchStarted);
		on(TupleItemPickerEventTypes.SEARCH_DONE, onSearchDone);
		on(TupleItemPickerEventTypes.CHANGE_DROPDOWN_POSITION, setDropdownPosition);
		return () => {
			off(TupleItemPickerEventTypes.SEARCH_STARTED, onSearchStarted);
			off(TupleItemPickerEventTypes.SEARCH_DONE, onSearchDone);
			off(TupleItemPickerEventTypes.CHANGE_DROPDOWN_POSITION, setDropdownPosition);
		};
	}, [on, off]);

	const onSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		if (searchHandle) {
			window.clearTimeout(searchHandle);
		}

		if (value.trim().length === 0) {
			fire(TupleItemPickerEventTypes.CHANGE_SEARCH_STATE, PickerSearchState.READY, []);
			// no more search needed
			setSearchHandle(null);
		} else {
			fire(TupleItemPickerEventTypes.CHANGE_SEARCH_STATE, PickerSearchState.SEARCHING, []);
			setSearchHandle(window.setTimeout(async () => {
				setSearchHandle(null);
				try {
					const candidates = await listCandidates(value.trim());
					fire(TupleItemPickerEventTypes.CHANGE_SEARCH_STATE, PickerSearchState.DONE, candidates);
				} catch (e: any) {
					// ignore
					fire(TupleItemPickerEventTypes.CHANGE_SEARCH_STATE, PickerSearchState.DONE, []);
				}
			}, 300));
		}

		// update search input
		setSearchText(value);
	};

	return <TupleItemPickerSearchInput ref={inputRef}
	                                   placeholder="Search by Name..." tabIndex={onSearch ? (void 0) : -1}
	                                   value={searchText} onChange={onSearchTextChange}
	                                   visible={onSearch} dropdownPosition={dropdownPosition}/>;

});