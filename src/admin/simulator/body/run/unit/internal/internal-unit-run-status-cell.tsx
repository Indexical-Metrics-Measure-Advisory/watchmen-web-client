import {ButtonInk} from '@/widgets/basic/types';
import React from 'react';
import {UnitRunStatus} from '../../types';
import {StatusLabel} from '../../widgets';

export const InternalUnitRunStatusCell = (props: {
	status: UnitRunStatus;
}) => {
	const {status} = props;

	switch (status) {
		case UnitRunStatus.READY:
			return <StatusLabel/>;
		case UnitRunStatus.RUNNING:
			return <StatusLabel ink={ButtonInk.PRIMARY}>Running</StatusLabel>;
		case UnitRunStatus.IGNORED:
			return <StatusLabel ink={ButtonInk.WARN}>Ignored</StatusLabel>;
		case UnitRunStatus.DONE:
			return <StatusLabel ink={ButtonInk.SUCCESS}>Done</StatusLabel>;
		case UnitRunStatus.FAIL:
			return <StatusLabel ink={ButtonInk.DANGER}>Failed</StatusLabel>;
	}
};
