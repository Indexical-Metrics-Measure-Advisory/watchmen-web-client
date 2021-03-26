import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { v4 } from 'uuid';
import { ICON_CLOSE } from '../../../basic-widgets/constants';
import { ButtonInk } from '../../../basic-widgets/types';
import { MonitorLogRow } from '../../../services/admin/logs';
import { PipelineStage } from '../../../services/tuples/pipeline-stage-types';
import { Pipeline } from '../../../services/tuples/pipeline-types';
import { Topic } from '../../../services/tuples/topic-types';
import { isMockService } from '../../../services/utils';
import demoData from './pipeline.json';
import { DetailProcessStage } from './stage';
import {
	CloseButton,
	DetailProcessContainer,
	SectionTitle,
	Title,
	TitleExecutionLabel,
	TitleLabel,
	TitleNameLabel
} from './widgets';

const getStages = () => isMockService() ? demoData.stages : [];

export const DetailProcess = (props: {
	row: MonitorLogRow;
	pipeline: Pipeline;
	topicsMap: Map<string, Topic>;
	onClose: () => void;
}) => {
	const { row, pipeline, topicsMap, onClose } = props;

	const pipelineExecution = row.conditionResult || true;
	return <DetailProcessContainer>
		<Title>
			<span>Process Logs</span>
			<CloseButton ink={ButtonInk.PRIMARY} onClick={onClose}>
				<FontAwesomeIcon icon={ICON_CLOSE}/>
				<span>Close</span>
			</CloseButton>
		</Title>
		<SectionTitle>
			<TitleLabel>
				<TitleNameLabel>Pipeline Execution:</TitleNameLabel>
				<TitleExecutionLabel data-ignored={!pipelineExecution}>{`${pipelineExecution}`}</TitleExecutionLabel>
			</TitleLabel>
			<TitleLabel>
				<TitleNameLabel>Spent:</TitleNameLabel>
				<TitleExecutionLabel>{row.completeTime} ms</TitleExecutionLabel>
			</TitleLabel>
		</SectionTitle>
		{(row.stages || getStages()).map((stageLog, stageIndex) => {
			const stage: PipelineStage = (pipeline.stages || [])[stageIndex];
			return <DetailProcessStage stage={stage} stageIndex={stageIndex + 1}
			                           log={stageLog}
			                           topicsMap={topicsMap}
			                           key={stage.stageId || v4()}/>;
		})}
	</DetailProcessContainer>;
};