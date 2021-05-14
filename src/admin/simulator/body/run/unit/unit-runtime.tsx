import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {RunTableBodyCell, RunTableBodyRow, UnitElementType} from '../widgets';
import {getUnitName} from '../../../utils';
import React, {useState} from 'react';
import {UnitRunStatusCell} from './unit-run-status-cell';
import {useRunUnit} from './use-run-unit';
import {useCompleted} from './use-completed';
import {useConditionCheck} from './use-condition-check';
import {useRunActions} from './use-run-actions';

export const UnitRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	context: UnitRuntimeContext;
}) => {
	const {pipelineContext, stageContext, context} = props;

	const [message, setMessage] = useState('');
	useRunUnit(pipelineContext, stageContext, context);
	useCompleted(pipelineContext, stageContext, context, setMessage);
	useConditionCheck(pipelineContext, stageContext, context, setMessage);
	useRunActions(pipelineContext, stageContext, context, setMessage);

	return <RunTableBodyRow>
		<RunTableBodyCell><UnitElementType>u</UnitElementType>{getUnitName(context.unit)}</RunTableBodyCell>
		<RunTableBodyCell>
			<UnitRunStatusCell status={context.status}/>
		</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell>{message}</RunTableBodyCell>
	</RunTableBodyRow>;
};