import {ButtonInk} from '@/widgets/basic/types';
import React from 'react';
import {StageRunStatus} from '../types';
import {StatusLabel} from '../widgets';

export const StageRunStatusCell = (props: {
	status: StageRunStatus;
}) => {
	const {status} = props;

	switch (status) {
		case StageRunStatus.READY:
			return <StatusLabel/>;
		case StageRunStatus.RUNNING:
			return <StatusLabel ink={ButtonInk.PRIMARY}>Running</StatusLabel>;
		case StageRunStatus.IGNORED:
			return <StatusLabel ink={ButtonInk.WARN}>Ignored</StatusLabel>;
		case StageRunStatus.DONE:
			return <StatusLabel ink={ButtonInk.SUCCESS}>Done</StatusLabel>;
		case StageRunStatus.FAIL:
			return <StatusLabel ink={ButtonInk.DANGER}>Failed</StatusLabel>;
	}
};
