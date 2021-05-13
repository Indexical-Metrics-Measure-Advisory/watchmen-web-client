import {CellButton, RunTableBodyCell, RunTableBodyRow, StatusLabel, UnitElementType} from './widgets';
import React from 'react';
import {UnitRunStatus, UnitRuntimeContext} from './types';
import {ButtonInk} from '../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../basic-widgets/constants';
import {getUnitName} from '../../utils';
import {ActionRun} from './action-run';

const UnitRunStatusCell = (props: {
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

export const UnitRun = (props: {
	context: UnitRuntimeContext;
}) => {
	const {context} = props;

	return <>
		<RunTableBodyRow>
			<RunTableBodyCell><UnitElementType>u</UnitElementType>{getUnitName(context.unit)}</RunTableBodyCell>
			<RunTableBodyCell>
				<UnitRunStatusCell status={context.status}/>
			</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
		</RunTableBodyRow>
		{context.actions.map(context => <ActionRun context={context} key={context.action.actionId}/>)}
	</>;
};