import {CellButton, RunTableBodyCell, RunTableBodyRow, StageElementType, StatusLabel} from './widgets';
import React from 'react';
import {StageRunStatus, StageRuntimeContext} from './types';
import {getStageName} from '../../utils';
import {ButtonInk} from '../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../basic-widgets/constants';
import {UnitRun} from './unit-run';

const StageRunStatusCell = (props: {
	status: StageRunStatus;
}) => {
	const {status} = props;

	switch (status) {
		case StageRunStatus.READY:
			return <StatusLabel/>;
		case StageRunStatus.RUNNING:
			return <StatusLabel>Running</StatusLabel>;
		case StageRunStatus.IGNORED:
			return <StatusLabel>Ignored</StatusLabel>;
		case StageRunStatus.DONE:
			return <StatusLabel>Done</StatusLabel>;
		case StageRunStatus.FAIL:
			return <CellButton ink={ButtonInk.DANGER}>
				<FontAwesomeIcon icon={ICON_SEARCH}/>
			</CellButton>;
	}
};

export const StageRun = (props: {
	context: StageRuntimeContext;
}) => {
	const {context} = props;

	return <>
		<RunTableBodyRow>
			<RunTableBodyCell><StageElementType>s</StageElementType>{getStageName(context.stage)}</RunTableBodyCell>
			<RunTableBodyCell>
				<StageRunStatusCell status={context.status}/>
			</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
		</RunTableBodyRow>
		{context.units.map(context => <UnitRun context={context} key={context.unit.unitId}/>)}
	</>;
};