import {CellButton, RunTableBodyCell, RunTableBodyRow, UnitElementType} from './widgets';
import React from 'react';
import {RunStatus, UnitRuntimeContext} from './types';
import {ButtonInk} from '../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../basic-widgets/constants';
import {getUnitName} from '../../utils';

const UnitRunStatusCell = (props: {
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
	</>;
};