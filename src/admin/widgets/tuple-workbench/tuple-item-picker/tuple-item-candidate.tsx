import React from 'react';
import {ICON_SELECTED} from '../../../../basic-widgets/constants';
import {useForceUpdate} from '../../../../basic-widgets/utils';
import {QueryTupleForHolder} from '../../../../services/tuples/tuple-types';
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
