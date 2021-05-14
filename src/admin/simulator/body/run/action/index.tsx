import {ActionElementType, RunTableBodyCell, RunTableBodyRow} from '../widgets';
import React, {useState} from 'react';
import {ActionRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {getActionType} from '../../../utils';
import {ActionRunStatusCell} from './action-run-status-cell';
import {useRunAction} from './use-run-action';
import {useCompleted} from './use-completed';

export const ActionRun = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	unitContext: UnitRuntimeContext;
	context: ActionRuntimeContext;
}) => {
	const {pipelineContext, stageContext, unitContext, context} = props;

	const [message, setMessage] = useState('');
	useRunAction(pipelineContext, stageContext, unitContext, context);
	useCompleted(pipelineContext, stageContext, unitContext, context, setMessage);

	return <>
		<RunTableBodyRow>
			<RunTableBodyCell><ActionElementType>a</ActionElementType>{getActionType(context.action)}</RunTableBodyCell>
			<RunTableBodyCell>
				<ActionRunStatusCell status={context.status}/>
			</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>{message}</RunTableBodyCell>
		</RunTableBodyRow>
	</>;
};