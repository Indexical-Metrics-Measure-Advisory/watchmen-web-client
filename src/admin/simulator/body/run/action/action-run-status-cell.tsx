import {ActionRunStatus} from '../types';
import {CellButton, StatusLabel} from '../widgets';
import {ButtonInk} from '../../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../../basic-widgets/constants';
import React from 'react';

export const ActionRunStatusCell = (props: {
	status: ActionRunStatus;
}) => {
	const {status} = props;

	switch (status) {
		case ActionRunStatus.READY:
			return <StatusLabel/>;
		case ActionRunStatus.RUNNING:
			return <StatusLabel>Running</StatusLabel>;
		case ActionRunStatus.DONE:
			return <StatusLabel>Done</StatusLabel>;
		case ActionRunStatus.FAIL:
			return <CellButton ink={ButtonInk.DANGER}>
				<FontAwesomeIcon icon={ICON_SEARCH}/>
			</CellButton>;
	}
};
