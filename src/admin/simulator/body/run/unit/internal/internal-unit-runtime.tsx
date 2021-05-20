import React, {useState} from 'react';
import {InternalUnitRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../../types';
import {CellButton, RunTableBodyCell, RunTableBodyRow, UnitElementType} from '../../widgets';
import {InternalUnitRunStatusCell} from './internal-unit-run-status-cell';
import {getUnitName} from '../../../../utils';
import {useRunInternalUnit} from './use-run-internal-unit';
import {useCompleted} from './use-completed';
import {useConditionCheck} from './use-condition-check';
import {useRunActions} from './use-run-actions';
import {isInternalUnitStarted} from '../../utils';
import {ButtonInk} from '../../../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SEARCH} from '../../../../../../basic-widgets/constants';

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
		<RunTableBodyCell>
			{isInternalUnitStarted(context)
				? <CellButton ink={ButtonInk.SUCCESS}>
					<FontAwesomeIcon icon={ICON_SEARCH}/>
				</CellButton>
				: '-'
			}
		</RunTableBodyCell>
		<RunTableBodyCell>{message}</RunTableBodyCell>
	</RunTableBodyRow>;
};