import React, {useState} from 'react';
import {InternalUnitRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../../types';
import {RunTableBodyCell, RunTableBodyRow, UnitElementType} from '../../widgets';
import {InternalUnitRunStatusCell} from './internal-unit-run-status-cell';
import {getUnitName} from '../../../../utils';
import {useRunInternalUnit} from './use-run-internal-unit';
import {useCompleted} from './use-completed';
import {useConditionCheck} from './use-condition-check';
import {useRunActions} from './use-run-actions';

export const InternalUnitRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	unitContext: UnitRuntimeContext;
	context: InternalUnitRuntimeContext;
}) => {
	const {pipelineContext, stageContext, unitContext, context} = props;

	const [message, setMessage] = useState('');
	useRunInternalUnit(pipelineContext, stageContext, unitContext, context);
	useCompleted(pipelineContext, stageContext, unitContext, context, setMessage);
	useConditionCheck(pipelineContext, stageContext, unitContext, context, setMessage);
	useRunActions(pipelineContext, stageContext, unitContext, context, setMessage);

	return <RunTableBodyRow>
		<RunTableBodyCell><UnitElementType>u</UnitElementType>{getUnitName(context.unit)}</RunTableBodyCell>
		<RunTableBodyCell>
			<InternalUnitRunStatusCell status={context.status}/>
		</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell>{message}</RunTableBodyCell>
	</RunTableBodyRow>;
};