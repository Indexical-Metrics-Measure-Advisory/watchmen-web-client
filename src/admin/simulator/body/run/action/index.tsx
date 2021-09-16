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
import {ButtonInk} from '@/basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '@/basic-widgets/constants';
import {useDoRunAction} from './use-do-run-action';
import {findRuntimeData} from './utils';
import {TopicsData} from '../../state/types';
import {EventTypes} from '@/events/types';
import {DataDialog} from '../data-dialog';
import {useEventBus} from '@/events/event-bus';
import {isActionCompleted} from '../utils';

export const ActionRun = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	unitContext: UnitRuntimeContext;
	internalUnitContext: InternalUnitRuntimeContext;
	context: ActionRuntimeContext;
}) => {
	const {pipelineContext, stageContext, unitContext, internalUnitContext, context} = props;

	const {fire: fireGlobal} = useEventBus();
	const [message, setMessage] = useState('');
	useRunAction(pipelineContext, stageContext, unitContext, internalUnitContext, context);
	useDoRunAction(pipelineContext, stageContext, unitContext, internalUnitContext, context, setMessage);
	useCompleted(pipelineContext, stageContext, unitContext, internalUnitContext, context, setMessage);

	const onDataClicked = async () => {
		const {actionRuntimeId} = context;

		let data = await findRuntimeData(actionRuntimeId!);
		const beforeData = data!.dataBefore as TopicsData;
		const afterData = data!.dataAfter as TopicsData;

		fireGlobal(EventTypes.SHOW_DIALOG,
			<DataDialog title="Data of Action Run"
			            beforeData={beforeData} afterData={afterData}
			            allTopics={pipelineContext.allTopics}/>,
			{
				marginTop: '5vh',
				marginLeft: '10%',
				width: '80%',
				height: '90vh'
			});
	};

	return <>
		<RunTableBodyRow>
			<RunTableBodyCell><ActionElementType>a</ActionElementType>{getActionType(context.action)}</RunTableBodyCell>
			<RunTableBodyCell>
				<ActionRunStatusCell status={context.status}/>
			</RunTableBodyCell>
			<RunTableBodyCell>
				{isActionCompleted(context)
					? <CellButton ink={ButtonInk.SUCCESS} onClick={onDataClicked}>
						<FontAwesomeIcon icon={ICON_SEARCH}/>
					</CellButton>
					: '-'
				}
			</RunTableBodyCell>
			<RunTableBodyCell>{message}</RunTableBodyCell>
		</RunTableBodyRow>
	</>;
};