import {PipelineRunStatus} from '../types';
import {CellButton, StatusLabel} from '../widgets';
import {ButtonInk} from '@/basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_PLAY} from '@/basic-widgets/constants';
import React from 'react';

export const PipelineRunStatusCell = (props: {
	status: PipelineRunStatus;
	onStart: () => void;
}) => {
	const {status, onStart} = props;

	switch (status) {
		case PipelineRunStatus.READY:
			return <CellButton ink={ButtonInk.PRIMARY} onClick={onStart}>
				<FontAwesomeIcon icon={ICON_PLAY}/>
			</CellButton>;
		case PipelineRunStatus.WAIT:
			return <StatusLabel>Wait</StatusLabel>;
		case PipelineRunStatus.RUNNING:
			return <StatusLabel ink={ButtonInk.PRIMARY}>Running</StatusLabel>;
		case PipelineRunStatus.IGNORED:
			return <StatusLabel ink={ButtonInk.WARN}>Ignored</StatusLabel>;
		case PipelineRunStatus.DONE:
			return <StatusLabel ink={ButtonInk.SUCCESS}>Done</StatusLabel>;
		case PipelineRunStatus.FAIL:
			return <StatusLabel ink={ButtonInk.DANGER}>Failed</StatusLabel>;
	}
};
