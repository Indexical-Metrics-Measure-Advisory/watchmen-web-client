import {ActionElementType, CellButton, RunTableBodyCell, RunTableBodyRow} from './widgets';
import React from 'react';
import {ActionRuntimeContext, RunStatus} from './types';
import {ButtonInk} from '../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../basic-widgets/constants';
import {getActionType} from '../../utils';

const ActionRunStatusCell = (props: {
	status: RunStatus;
}) => {
	const {status} = props;

	switch (status) {
		case RunStatus.READY:
			return <span/>;
		case RunStatus.WAIT:
			return <span>Wait</span>;
		case RunStatus.RUNNING:
			return <span>Running</span>;
		case RunStatus.DONE:
			return <span>Done</span>;
		case RunStatus.FAIL:
			return <CellButton ink={ButtonInk.DANGER}>
				<FontAwesomeIcon icon={ICON_SEARCH}/>
			</CellButton>;
	}
};

export const ActionRun = (props: {
	context: ActionRuntimeContext;
}) => {
	const {context} = props;

	return <>
		<RunTableBodyRow>
			<RunTableBodyCell><ActionElementType>a</ActionElementType>{getActionType(context.action)}</RunTableBodyCell>
			<RunTableBodyCell>
				<ActionRunStatusCell status={context.status}/>
			</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
		</RunTableBodyRow>
	</>;
};