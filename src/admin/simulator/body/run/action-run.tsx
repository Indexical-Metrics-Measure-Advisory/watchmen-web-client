import {ActionElementType, CellButton, RunTableBodyCell, RunTableBodyRow} from './widgets';
import React from 'react';
import {ActionRunStatus, ActionRuntimeContext} from './types';
import {ButtonInk} from '../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../basic-widgets/constants';
import {getActionType} from '../../utils';

const ActionRunStatusCell = (props: {
	status: ActionRunStatus;
}) => {
	const {status} = props;

	switch (status) {
		case ActionRunStatus.READY:
			return <span/>;
		case ActionRunStatus.RUNNING:
			return <span>Running</span>;
		case ActionRunStatus.DONE:
			return <span>Done</span>;
		case ActionRunStatus.FAIL:
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