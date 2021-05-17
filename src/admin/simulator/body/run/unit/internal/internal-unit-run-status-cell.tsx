import {UnitRunStatus} from '../../types';
import {CellButton, StatusLabel} from '../../widgets';
import {ButtonInk} from '../../../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../../../basic-widgets/constants';
import React from 'react';

export const InternalUnitRunStatusCell = (props: {
	status: UnitRunStatus;
}) => {
	const {status} = props;

	switch (status) {
		case UnitRunStatus.READY:
			return <StatusLabel/>;
		case UnitRunStatus.RUNNING:
			return <StatusLabel>Running</StatusLabel>;
		case UnitRunStatus.IGNORED:
			return <StatusLabel>Ignored</StatusLabel>;
		case UnitRunStatus.DONE:
			return <StatusLabel>Done</StatusLabel>;
		case UnitRunStatus.FAIL:
			return <CellButton ink={ButtonInk.DANGER}>
				<FontAwesomeIcon icon={ICON_SEARCH}/>
			</CellButton>;
	}
};
