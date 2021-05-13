import {CellButton, PipelineElementType, RunTableBodyCell, RunTableBodyRow} from './widgets';
import React from 'react';
import {PipelineRuntimeContext, RunStatus} from './types';
import {getPipelineName} from '../../utils';
import {ButtonInk} from '../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_PLAY, ICON_SEARCH} from '../../../../basic-widgets/constants';
import {StageRun} from './stage-run';

const PipelineRunStatusCell = (props: {
	status: RunStatus;
}) => {
	const {status} = props;

	switch (status) {
		case RunStatus.READY:
			return <CellButton ink={ButtonInk.PRIMARY}>
				<FontAwesomeIcon icon={ICON_PLAY}/>
			</CellButton>;
		case RunStatus.WAIT:
			return <span>Wait</span>;
		case RunStatus.RUNNING:
			return <span>Running</span>;
		case RunStatus.DONE:
			return <span>Done</span>;
		case RunStatus.FAIL:
			return <CellButton ink={ButtonInk.DANGER}>
				<FontAwesomeIcon icon={ICON_SEARCH}/>
			</CellButton>;
	}
};
export const PipelineRun = (props: {
	context: PipelineRuntimeContext;
}) => {
	const {context} = props;

	return <>
		<RunTableBodyRow>
			<RunTableBodyCell><PipelineElementType>p</PipelineElementType>{getPipelineName(context.pipeline)}
			</RunTableBodyCell>
			<RunTableBodyCell>
				<PipelineRunStatusCell status={context.status}/>
			</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
		</RunTableBodyRow>
		{context.stages.map(context => <StageRun context={context} key={context.stage.stageId}/>)}
	</>;
};