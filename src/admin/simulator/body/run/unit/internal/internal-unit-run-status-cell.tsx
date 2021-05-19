import {UnitRunStatus} from '../../types';
import {StatusLabel} from '../../widgets';
import {ButtonInk} from '../../../../../../basic-widgets/types';
import React from 'react';

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
