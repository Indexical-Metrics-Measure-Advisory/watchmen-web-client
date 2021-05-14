import {StageRunStatus} from '../types';
import {CellButton, StatusLabel} from '../widgets';
import {ButtonInk} from '../../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../../basic-widgets/constants';
import React from 'react';

export const StageRunStatusCell = (props: {
	status: StageRunStatus;
}) => {
	const {status} = props;

	switch (status) {
		case StageRunStatus.READY:
			return <StatusLabel/>;
		case StageRunStatus.RUNNING:
			return <StatusLabel>Running</StatusLabel>;
		case StageRunStatus.IGNORED:
			return <StatusLabel>Ignored</StatusLabel>;
		case StageRunStatus.DONE:
			return <StatusLabel>Done</StatusLabel>;
		case StageRunStatus.FAIL:
			return <CellButton ink={ButtonInk.DANGER}>
				<FontAwesomeIcon icon={ICON_SEARCH}/>
			</CellButton>;
	}
};
