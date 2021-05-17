import {ActionElementType, CellButton, RunTableBodyCell, RunTableBodyRow} from '../widgets';
import React, {useState} from 'react';
import {
	ActionRuntimeContext,
	InternalUnitRuntimeContext,
	PipelineRuntimeContext,
	StageRuntimeContext,
	UnitRuntimeContext
} from '../types';
import {getActionType} from '../../../utils';
import {ActionRunStatusCell} from './action-run-status-cell';
import {useRunAction} from './use-run-action';
import {useCompleted} from './use-completed';
import {isActionCompleted, isActionStarted} from '../utils';
import {ButtonInk} from '../../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../../basic-widgets/constants';

export const ActionRun = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	unitContext: UnitRuntimeContext;
	internalUnitContext: InternalUnitRuntimeContext;
	context: ActionRuntimeContext;
}) => {
	const {pipelineContext, stageContext, unitContext, internalUnitContext, context} = props;

	const [message, setMessage] = useState('');
	useRunAction(pipelineContext, stageContext, unitContext, internalUnitContext, context);
	useCompleted(pipelineContext, stageContext, unitContext, internalUnitContext, context, setMessage);

	return <>
		<RunTableBodyRow>
			<RunTableBodyCell><ActionElementType>a</ActionElementType>{getActionType(context.action)}</RunTableBodyCell>
			<RunTableBodyCell>
				<ActionRunStatusCell status={context.status}/>
			</RunTableBodyCell>
			<RunTableBodyCell>
				{isActionStarted(context)
					? <CellButton ink={ButtonInk.SUCCESS}>
						<FontAwesomeIcon icon={ICON_SEARCH}/>
					</CellButton>
					: '-'
				}
			</RunTableBodyCell>
			<RunTableBodyCell>
				{isActionCompleted(context)
					? <CellButton ink={ButtonInk.SUCCESS}>
						<FontAwesomeIcon icon={ICON_SEARCH}/>
					</CellButton>
					: '-'
				}
			</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>{message}</RunTableBodyCell>
		</RunTableBodyRow>
	</>;
};