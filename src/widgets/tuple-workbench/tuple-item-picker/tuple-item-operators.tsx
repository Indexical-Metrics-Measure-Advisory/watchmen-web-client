import {QueryTupleForHolder, TupleHolder} from '@/services/data/tuples/tuple-types';
import React, {useRef} from 'react';
import {useCollapseFixedThing} from '../../basic/utils';
import {TupleItemCandidates} from './tuple-item-candidates';
import {TupleItemOperatorsButton} from './tuple-item-operators-button';
import {TupleItemOperatorsSearch} from './tuple-item-operators-search';
import {useTupleItemPickerEventBus} from './tuple-item-picker-event-bus';
import {TupleItemPickerEventTypes} from './tuple-item-picker-event-bus-types';
import {TupleItemOperatorsContainer} from './widgets';

export const TupleItemOperators = <TH extends TupleHolder, QTH extends QueryTupleForHolder>(props: {
	actionLabel: string;
	holder: TH;
	codes: Array<QTH>;
	isHolding: (holder: TH) => boolean;
	listCandidates: (searchText: string) => Promise<Array<QTH>>;
	getIdOfCandidate: (candidate: QTH) => string;
	getNameOfCandidate: (candidate: QTH) => string;
	isCandidateHold: (candidate: QTH) => boolean;
	removeHold: (holdId: string | QTH) => void;
	addHold: (hold: QTH) => void;
}) => {
	const {
		actionLabel, holder, codes,
		isHolding,
		listCandidates, getIdOfCandidate, getNameOfCandidate, isCandidateHold,
		removeHold, addHold
	} = props;

	const {fire} = useTupleItemPickerEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	useCollapseFixedThing({containerRef, hide: () => fire(TupleItemPickerEventTypes.SEARCH_DONE)});

	return <TupleItemOperatorsContainer ref={containerRef}>
		<TupleItemOperatorsSearch listCandidates={listCandidates} ref={inputRef}/>
		<TupleItemOperatorsButton actionLabel={actionLabel} holder={holder} isHolding={isHolding} inputRef={inputRef}/>
		<TupleItemCandidates {...{
			containerRef, inputRef,
			getIdOfCandidate, getNameOfCandidate, isCandidateHold,
			codes, addHold, removeHold
		}}/>
	</TupleItemOperatorsContainer>;
};