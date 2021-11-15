import {QueryTupleForHolder, TupleHolder} from '@/services/data/tuples/tuple-types';
import React from 'react';
import {TupleItemPickerEventBusProvider} from './tuple-item-picker-event-bus';
import {TupleItemPickerInternal} from './tuple-item-picker-internal';

export const TupleItemPicker = <TH extends TupleHolder, QTH extends QueryTupleForHolder>(props: {
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
	return < TupleItemPickerEventBusProvider>
		<TupleItemPickerInternal {...props}/>
	</TupleItemPickerEventBusProvider>;
};
