import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {RunTableBodyCell, RunTableBodyRow, UnitElementType} from '../widgets';
import {getUnitName} from '../../../utils';
import React from 'react';
import {UnitRunStatusCell} from './unit-run-status-cell';

export const UnitRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	context: UnitRuntimeContext;
}) => {
	const {context} = props;

	return <RunTableBodyRow>
		<RunTableBodyCell><UnitElementType>u</UnitElementType>{getUnitName(context.unit)}</RunTableBodyCell>
		<RunTableBodyCell>
			<UnitRunStatusCell status={context.status}/>
		</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
	</RunTableBodyRow>;
};