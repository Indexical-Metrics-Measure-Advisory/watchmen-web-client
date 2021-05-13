import {CellButton, RunTableBodyCell, RunTableBodyRow, StageElementType} from './widgets';
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
			return <span/>;
		case StageRunStatus.RUNNING:
			return <span>Running</span>;
		case StageRunStatus.IGNORED:
			return <span>Ignored</span>;
		case StageRunStatus.DONE:
			return <span>Done</span>;
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