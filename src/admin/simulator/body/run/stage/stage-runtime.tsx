import {PipelineRuntimeContext, StageRuntimeContext} from '../types';
import {CellButton, RunTableBodyCell, RunTableBodyRow, StageElementType} from '../widgets';
import {getStageName} from '../../../utils';
import React, {useState} from 'react';
import {StageRunStatusCell} from './stage-run-status-cell';
import {useRunStage} from './use-run-stage';
import {useCompleted} from './use-completed';
import {useConditionCheck} from './use-condition-check';
import {useRunUnits} from './use-run-units';
import {ButtonInk} from '../../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../../basic-widgets/constants';
import {isStageCompleted, isStageStarted} from '../utils';

export const StageRuntime = (props: {
	pipelineContext: PipelineRuntimeContext;
	context: StageRuntimeContext;
}) => {
	const {pipelineContext, context} = props;

	const [message, setMessage] = useState('');
	useRunStage(pipelineContext, context);
	useCompleted(pipelineContext, context, setMessage);
	useConditionCheck(pipelineContext, context, setMessage);
	useRunUnits(pipelineContext, context, setMessage);

	return <RunTableBodyRow>
		<RunTableBodyCell><StageElementType>s</StageElementType>{getStageName(context.stage)}</RunTableBodyCell>
		<RunTableBodyCell>
			<StageRunStatusCell status={context.status}/>
		</RunTableBodyCell>
		<RunTableBodyCell>
			{isStageStarted(context)
				? <CellButton ink={ButtonInk.SUCCESS}>
					<FontAwesomeIcon icon={ICON_SEARCH}/>
				</CellButton>
				: '-'
			}
		</RunTableBodyCell>
		<RunTableBodyCell>
			{isStageCompleted(context)
				? <CellButton ink={ButtonInk.SUCCESS}>
					<FontAwesomeIcon icon={ICON_SEARCH}/>
				</CellButton>
				: '-'
			}
		</RunTableBodyCell>
		<RunTableBodyCell>-</RunTableBodyCell>
		<RunTableBodyCell>{message}</RunTableBodyCell>
	</RunTableBodyRow>;
};