import {QueryTupleForHolder, TupleHolder} from '@/services/data/tuples/tuple-types';
import React from 'react';
import {TupleItemExists} from './tuple-item-exists';
import {TupleItemOperators} from './tuple-item-operators';
import {TupleItemPickerContainer} from './widgets';

export const TupleItemPickerInternal = <TH extends TupleHolder, QTH extends QueryTupleForHolder>(props: {
	actionLabel: string;
	holder: TH;
	codes: Array<QTH>;
	isHolding: (holder: TH) => boolean;
	getHoldIds: (holder: TH) => Array<string>;
	getNameOfHold: (holdId: string, codes: Array<QTH>) => string;
	listCandidates: (searchText: string) => Promise<Array<QTH>>;
	getIdOfCandidate: (candidate: QTH) => string;
	getNameOfCandidate: (candidate: QTH) => string;
	isCandidateHold: (candidate: QTH) => boolean;
	removeHold: (holdId: string | QTH) => void;
	addHold: (hold: QTH) => void;
}) => {
	const {
		actionLabel, holder, codes,
		isHolding, getHoldIds, getNameOfHold,
		listCandidates, getIdOfCandidate, getNameOfCandidate, isCandidateHold,
		removeHold, addHold
	} = props;

	return <TupleItemPickerContainer>
		<TupleItemOperators {...{
			actionLabel,
			holder,
			codes,
			isHolding,
			listCandidates,
			getIdOfCandidate,
			getNameOfCandidate,
			isCandidateHold,
			removeHold,
			addHold
		}}/>
		<TupleItemExists {...{holder, codes, getHoldIds, getNameOfHold, removeHold}}/>
	</TupleItemPickerContainer>;
};

