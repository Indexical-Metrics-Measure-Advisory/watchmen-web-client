import {QueryTupleForHolder} from '@/services/data/tuples/tuple-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {RefObject, useEffect, useState} from 'react';
import {BASE_HEIGHT, ICON_LOADING} from '../../basic/constants';
import {useTupleEventBus} from '../tuple-event-bus';
import {TupleEventTypes, TupleState} from '../tuple-event-bus-types';
import {TupleItemCandidate} from './tuple-item-candidate';
import {useTupleItemPickerEventBus} from './tuple-item-picker-event-bus';
import {PickerSearchState, TupleItemPickerEventTypes} from './tuple-item-picker-event-bus-types';
import {TupleItemPickerDropdown, TupleItemPickerDropdownReminder, TupleItemPickerDropdownState} from './widgets';

interface State<QTH extends QueryTupleForHolder> {
	state: PickerSearchState;
	candidates: Array<QTH>;
}

export const TupleItemCandidates = <QTH extends QueryTupleForHolder>(props: {
	containerRef: RefObject<HTMLDivElement>;
	inputRef: RefObject<HTMLInputElement>;
	getIdOfCandidate: (candidate: QTH) => string;
	getNameOfCandidate: (candidate: QTH) => string;
	isCandidateHold: (candidate: QTH) => boolean;
	codes: Array<QTH>;
	addHold: (candidate: QTH) => void;
	removeHold: (candidate: QTH) => void;
}) => {
	const {
		containerRef, inputRef,
		getIdOfCandidate, getNameOfCandidate, isCandidateHold,
		codes, addHold, removeHold
	} = props;

	const {fire} = useTupleEventBus();
	const {on, off, fire: fireInItem} = useTupleItemPickerEventBus();
	const [onSearch, setOnSearch] = useState(false);
	const [searchState, setSearchState] = useState<State<QTH>>({
		state: PickerSearchState.DONE,
		candidates: []
	});
	const [dropdownState, setDropdownState] = useState<TupleItemPickerDropdownState>({
		visible: false,
		atBottom: true,
		left: 0, minWidth: 0
	});
	useEffect(() => {
		const onSearchStateChange = (state: PickerSearchState, candidates: Array<QTH>) => {
			setSearchState({state, candidates});
		};
		const onSearchStart = () => {
			setOnSearch(true);
			setSearchState({state: PickerSearchState.READY, candidates: []});
		};
		const onSearchDone = () => setOnSearch(false);
		on(TupleItemPickerEventTypes.CHANGE_SEARCH_STATE, onSearchStateChange);
		on(TupleItemPickerEventTypes.SEARCH_STARTED, onSearchStart);
		on(TupleItemPickerEventTypes.SEARCH_DONE, onSearchDone);
		return () => {
			off(TupleItemPickerEventTypes.CHANGE_SEARCH_STATE, onSearchStateChange);
			off(TupleItemPickerEventTypes.SEARCH_STARTED, onSearchStart);
			off(TupleItemPickerEventTypes.SEARCH_DONE, onSearchDone);
		};
	}, [on, off]);
	// compute dropdown position when first rendering, and on scroll
	useEffect(() => {
		const computeDropdown = (onScroll?: boolean) => {
			if (!onSearch || !inputRef.current || !containerRef.current) {
				// hide
				if (dropdownState.visible) {
					setDropdownState({...dropdownState, visible: false});
				}
				return;
			}

			const {top, left, height} = inputRef.current.getBoundingClientRect();
			// input is on animation when switch to search, use container width instead
			const {width} = containerRef.current.getBoundingClientRect();
			let atBottom = dropdownState.atBottom;
			if (!dropdownState.visible || onScroll) {
				// currently shown, don't change position.
				atBottom = top + height + Math.max(Math.min(searchState.candidates.length, 8), 1) * BASE_HEIGHT + 1 < window.innerHeight;
			}
			if (atBottom) {
				setDropdownState({visible: true, atBottom, top: top + height - 1, left, minWidth: width});
			} else {
				setDropdownState({
					visible: true,
					atBottom,
					bottom: window.innerHeight - top - 1,
					left,
					minWidth: width
				});
			}
		};
		computeDropdown();

		const onScroll = () => computeDropdown(true);
		window.addEventListener('scroll', onScroll, true);
		return () => {
			window.removeEventListener('scroll', onScroll, true);
		};

		// any change will lead repainting
		// eslint-disable-next-line
	}, [onSearch, containerRef, inputRef]);

	const onAddHold = (code: QTH) => {
		if (!codes.includes(code)) {
			codes.push(code);
		}
		addHold(code);
		fireInItem(TupleItemPickerEventTypes.ITEM_ADDED);
		fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
	};
	const onRemoveHold = (code: QTH) => {
		const index = codes.findIndex(c => c === code);
		if (index !== -1) {
			codes.splice(index, 1);
		}
		removeHold(code);
		fireInItem(TupleItemPickerEventTypes.ITEM_REMOVED);
		fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
	};

	let dropdownContent;
	switch (true) {
		case searchState.state === PickerSearchState.READY:
			// ready to search
			dropdownContent =
				<TupleItemPickerDropdownReminder>Give search text first...</TupleItemPickerDropdownReminder>;
			break;
		case searchState.state === PickerSearchState.SEARCHING:
			// in searching
			dropdownContent = <TupleItemPickerDropdownReminder>
				<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
				<span>Searching...</span>
			</TupleItemPickerDropdownReminder>;
			break;
		case searchState.state === PickerSearchState.DONE && searchState.candidates.length === 0:
			// searched, but nothing found
			dropdownContent = <TupleItemPickerDropdownReminder>No matched.</TupleItemPickerDropdownReminder>;
			break;
		default:
			// searched, items found
			dropdownContent = searchState.candidates.map(candidate => {
				return <TupleItemCandidate key={getIdOfCandidate(candidate)}
				                           candidate={candidate}
				                           getNameOfCandidate={getNameOfCandidate} isCandidateHold={isCandidateHold}
				                           addHold={onAddHold} removeHold={onRemoveHold}/>;
			});
	}

	return <TupleItemPickerDropdown {...dropdownState}>
		{dropdownContent}
	</TupleItemPickerDropdown>;
};
