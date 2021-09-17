import {ICON_SEARCH} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {getStageName} from '../../../utils';
import {TopicsData} from '../../state/types';
import {DataDialog} from '../data-dialog';
import {PipelineRuntimeContext, StageRuntimeContext} from '../types';
import {isStageCompleted} from '../utils';
import {CellButton, RunTableBodyCell, RunTableBodyRow, StageElementType} from '../widgets';
import {StageRunStatusCell} from './stage-run-status-cell';
import {useCompleted} from './use-completed';
import {useConditionCheck} from './use-condition-check';
import {useRunStage} from './use-run-stage';
import {useRunUnits} from './use-run-units';
import {findRuntimeData} from './utils';

export const StageRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	context: StageRuntimeContext;
}) => {
	const {pipelineContext, context} = props;

	const {fire: fireGlobal} = useEventBus();
	const [message, setMessage] = useState('');
	useRunStage(pipelineContext, context);
	useCompleted(pipelineContext, context, setMessage);
	useConditionCheck(pipelineContext, context, setMessage);
	useRunUnits(pipelineContext, context, setMessage);

	const onDataClicked = async () => {
		const {stageRuntimeId} = context;

		let data = await findRuntimeData(stageRuntimeId!);
		const beforeData = data!.dataBefore as TopicsData;
		const afterData = data!.dataAfter as TopicsData;

		fireGlobal(EventTypes.SHOW_DIALOG,
			<DataDialog title="Data of Stage Run"
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
		<RunTableBodyCell><StageElementType>s</StageElementType>{getStageName(context.stage)}</RunTableBodyCell>
		<RunTableBodyCell>
			<StageRunStatusCell status={context.status}/>
		</RunTableBodyCell>
		<RunTableBodyCell>
			{isStageCompleted(context)
				? <CellButton ink={ButtonInk.SUCCESS} onClick={onDataClicked}>
					<FontAwesomeIcon icon={ICON_SEARCH}/>
				</CellButton>
				: '-'
			}
		</RunTableBodyCell>
		<RunTableBodyCell>{message}</RunTableBodyCell>
	</RunTableBodyRow>;
};