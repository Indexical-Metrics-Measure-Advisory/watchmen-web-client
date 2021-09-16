import React, {useState} from 'react';
import {InternalUnitRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../../types';
import {CellButton, RunTableBodyCell, RunTableBodyRow, UnitElementType} from '../../widgets';
import {InternalUnitRunStatusCell} from './internal-unit-run-status-cell';
import {getUnitName} from '../../../../utils';
import {useRunInternalUnit} from './use-run-internal-unit';
import {useCompleted} from './use-completed';
import {useConditionCheck} from './use-condition-check';
import {useRunActions} from './use-run-actions';
import {isInternalUnitCompleted} from '../../utils';
import {ButtonInk} from '@/basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '@/basic-widgets/constants';
import {findRuntimeData} from './utils';
import {TopicsData} from '../../../state/types';
import {EventTypes} from '@/events/types';
import {DataDialog} from '../../data-dialog';
import {useEventBus} from '@/events/event-bus';

export const InternalUnitRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	stageContext: StageRuntimeContext;
	unitContext: UnitRuntimeContext;
	context: InternalUnitRuntimeContext;
}) => {
	const {pipelineContext, stageContext, unitContext, context} = props;

	const {fire: fireGlobal} = useEventBus();
	const [message, setMessage] = useState('');
	useRunInternalUnit(pipelineContext, stageContext, unitContext, context);
	useCompleted(pipelineContext, stageContext, unitContext, context, setMessage);
	useConditionCheck(pipelineContext, stageContext, unitContext, context, setMessage);
	useRunActions(pipelineContext, stageContext, unitContext, context, setMessage);

	const onDataClicked = async () => {
		const {internalUnitRuntimeId} = context;

		let data = await findRuntimeData(internalUnitRuntimeId!);
		const beforeData = data!.dataBefore as TopicsData;
		const afterData = data!.dataAfter as TopicsData;

		fireGlobal(EventTypes.SHOW_DIALOG,
			<DataDialog title="Data of Unit Run"
			            beforeData={beforeData} afterData={afterData}
			            allTopics={pipelineContext.allTopics}/>,
			{
				marginTop: '5vh',
				marginLeft: '10%',
				width: '80%',
				height: '90vh'
			});
	};

	return <RunTableBodyRow>
		<RunTableBodyCell><UnitElementType>u</UnitElementType>{getUnitName(context.unit)}</RunTableBodyCell>
		<RunTableBodyCell>
			<InternalUnitRunStatusCell status={context.status}/>
		</RunTableBodyCell>
		<RunTableBodyCell>
			{isInternalUnitCompleted(context)
				? <CellButton ink={ButtonInk.SUCCESS} onClick={onDataClicked}>
					<FontAwesomeIcon icon={ICON_SEARCH}/>
				</CellButton>
				: '-'
			}
		</RunTableBodyCell>
		<RunTableBodyCell>{message}</RunTableBodyCell>
	</RunTableBodyRow>;
};