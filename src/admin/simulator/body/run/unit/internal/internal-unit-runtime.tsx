import {ICON_SEARCH} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {getUnitName} from '../../../../utils';
import {TopicsData} from '../../../state/types';
import {DataDialog} from '../../data-dialog';
import {InternalUnitRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../../types';
import {isInternalUnitCompleted} from '../../utils';
import {CellButton, RunTableBodyCell, RunTableBodyRow, UnitElementType} from '../../widgets';
import {InternalUnitRunStatusCell} from './internal-unit-run-status-cell';
import {useCompleted} from './use-completed';
import {useConditionCheck} from './use-condition-check';
import {useRunActions} from './use-run-actions';
import {useRunInternalUnit} from './use-run-internal-unit';
import {findRuntimeData} from './utils';

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