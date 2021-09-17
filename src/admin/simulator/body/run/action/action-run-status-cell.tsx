import {ButtonInk} from '@/widgets/basic/types';
import React from 'react';
import {ActionRunStatus} from '../types';
import {StatusLabel} from '../widgets';

export const ActionRunStatusCell = (props: {
	status: ActionRunStatus;
}) => {
	const {status} = props;

	switch (status) {
		case ActionRunStatus.READY:
			return <StatusLabel/>;
		case ActionRunStatus.RUNNING:
			return <StatusLabel ink={ButtonInk.PRIMARY}>Running</StatusLabel>;
		case ActionRunStatus.DONE:
			return <StatusLabel ink={ButtonInk.SUCCESS}>Done</StatusLabel>;
		case ActionRunStatus.FAIL:
			return <StatusLabel ink={ButtonInk.DANGER}>Failed</StatusLabel>;
	}
};
