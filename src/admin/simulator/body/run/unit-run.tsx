import {CellButton, RunTableBodyCell, RunTableBodyRow, UnitElementType} from './widgets';
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
			return <span/>;
		case UnitRunStatus.RUNNING:
			return <span>Running</span>;
		case UnitRunStatus.IGNORED:
			return <span>Ignored</span>;
		case UnitRunStatus.DONE:
			return <span>Done</span>;
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