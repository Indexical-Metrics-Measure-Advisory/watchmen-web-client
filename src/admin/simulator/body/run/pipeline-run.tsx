import {CellButton, PipelineElementType, RunTableBodyCell, RunTablePipelineRow, StatusLabel} from './widgets';
import React from 'react';
import {PipelineRunStatus, PipelineRuntimeContext} from './types';
import {getPipelineName} from '../../utils';
import {ButtonInk} from '../../../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_PLAY, ICON_SEARCH} from '../../../../basic-widgets/constants';
import {StageRun} from './stage-run';
import {TopicsData} from '../state/types';

const PipelineRunStatusCell = (props: {
	status: PipelineRunStatus;
}) => {
	const {status} = props;

	switch (status) {
		case PipelineRunStatus.READY:
			return <CellButton ink={ButtonInk.PRIMARY}>
				<FontAwesomeIcon icon={ICON_PLAY}/>
			</CellButton>;
		case PipelineRunStatus.WAIT:
			return <StatusLabel>Wait</StatusLabel>;
		case PipelineRunStatus.RUNNING:
			return <StatusLabel>Running</StatusLabel>;
		case PipelineRunStatus.IGNORED:
			return <StatusLabel>Ignored</StatusLabel>;
		case PipelineRunStatus.DONE:
			return <StatusLabel>Done</StatusLabel>;
		case PipelineRunStatus.FAIL:
			return <CellButton ink={ButtonInk.DANGER}>
				<FontAwesomeIcon icon={ICON_SEARCH}/>
			</CellButton>;
	}
};
export const PipelineRun = (props: {
	context: PipelineRuntimeContext;
}) => {
	const {context} = props;

	const onTriggerDataClicked = () => {
		const data = Object.keys(context.allData).reduce((data, topicId) => {
			// eslint-disable-next-line
			if (topicId == context.topic.topicId) {
				data[topicId] = [context.triggerData];
			} else {
				data[topicId] = context.allData[topicId];
			}
			return data;
		}, {} as TopicsData);
		console.log(data);
	};

	return <>
		<RunTablePipelineRow>
			<RunTableBodyCell><PipelineElementType>p</PipelineElementType>{getPipelineName(context.pipeline)}
			</RunTableBodyCell>
			<RunTableBodyCell>
				<PipelineRunStatusCell status={context.status}/>
			</RunTableBodyCell>
			<RunTableBodyCell>
				<CellButton ink={ButtonInk.SUCCESS} onClick={onTriggerDataClicked}>
					<FontAwesomeIcon icon={ICON_SEARCH}/>
				</CellButton>
			</RunTableBodyCell>
			<RunTableBodyCell>-</RunTableBodyCell>
			<RunTableBodyCell/>
		</RunTablePipelineRow>
		{context.stages.map(context => <StageRun context={context} key={context.stage.stageId}/>)}
	</>;
};