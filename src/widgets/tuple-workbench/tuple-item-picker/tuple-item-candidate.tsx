import {QueryTupleForHolder} from '@/services/data/tuples/tuple-types';
import React from 'react';
import {ICON_SELECTED} from '../../basic/constants';
import {useForceUpdate} from '../../basic/utils';
import {TupleItemPickerDropdownCandidate, TupleItemPickerDropdownCandidateIcon} from './widgets';

export const TupleItemCandidate = <QTH extends QueryTupleForHolder>(props: {
	candidate: QTH;
	getNameOfCandidate: (hold: QTH) => string;
	isCandidateHold: (candidate: QTH) => boolean;
	addHold: (candidate: QTH) => void;
	removeHold: (candidate: QTH) => void;
}) => {
	const {candidate, getNameOfCandidate, isCandidateHold, addHold, removeHold} = props;

	const forceUpdate = useForceUpdate();

	const picked = isCandidateHold(candidate);
	const onClicked = () => {
		if (picked) {
			removeHold(candidate);
		} else {
			addHold(candidate);
		}
		forceUpdate();
	};

	return <TupleItemPickerDropdownCandidate onClick={onClicked}>
		<TupleItemPickerDropdownCandidateIcon icon={ICON_SELECTED} data-checked={picked}/>
		<span>{getNameOfCandidate(candidate)}</span>
	</TupleItemPickerDropdownCandidate>;
};
