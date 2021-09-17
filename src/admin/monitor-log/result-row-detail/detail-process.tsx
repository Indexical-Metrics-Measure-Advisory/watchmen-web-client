import {MonitorLogRow, MonitorLogStatus} from '@/services/data/admin/logs';
import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {isMockService} from '@/services/data/utils';
import {DwarfButton} from '@/widgets/basic/button';
import {ButtonInk} from '@/widgets/basic/types';
import React, {useEffect, useRef, useState} from 'react';
import {v4} from 'uuid';
import demoData from './pipeline.json';
import {DetailProcessStage} from './stage';
import {
	CloseButton,
	DetailProcessBody,
	DetailProcessContainer,
	ErrorLabel,
	ErrorPart,
	ErrorStack,
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
	const {row, pipeline, topicsMap, onClose} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const [fullScreen, setFullScreen] = useState(false);
	useEffect(() => {
		window.document.addEventListener('fullscreenchange', () => {
			if (!window.document.fullscreenElement) {
				setFullScreen(false);
			}
		});
	}, [setFullScreen]);

	const onFullScreenClicked = () => {
		if (fullScreen) {
			window.document.exitFullscreen();
		} else {
			containerRef.current?.requestFullscreen();
			setFullScreen(true);
		}
	};

	const pipelineExecution = row.conditionResult || true;

	return <DetailProcessContainer ref={containerRef}>
		<Title>
			<span>Process Logs</span>
		</Title>
		<Title>
			<DwarfButton ink={ButtonInk.PRIMARY} onClick={onFullScreenClicked}>
				<span>{fullScreen ? 'Quit Full Screen' : 'Full Screen'}</span>
			</DwarfButton>
			<CloseButton ink={ButtonInk.PRIMARY} onClick={onClose}>
				<span>Close</span>
			</CloseButton>
		</Title>
		<DetailProcessBody fullScreen={fullScreen}>
			<SectionTitle>
				<TitleLabel>
					<TitleNameLabel>Pipeline Execution:</TitleNameLabel>
					<TitleExecutionLabel data-ignored={!pipelineExecution}>
						{`${pipelineExecution}`}
					</TitleExecutionLabel>
				</TitleLabel>
				<TitleLabel>
					<TitleNameLabel>Spent:</TitleNameLabel>
					<TitleExecutionLabel>{row.completeTime} ms</TitleExecutionLabel>
				</TitleLabel>
			</SectionTitle>
			{(row.stages || getStages()).map((stageLog, stageIndex) => {
				const stage: PipelineStage = (pipeline.stages || [])[stageIndex] || {};
				return <DetailProcessStage stage={stage} stageIndex={stageIndex + 1}
				                           log={stageLog}
				                           topicsMap={topicsMap}
				                           key={stage.stageId || v4()}/>;
			})}
			{row.status === MonitorLogStatus.ERROR
				? <ErrorPart>
					<ErrorLabel>Error on Pipeline</ErrorLabel>
					<ErrorStack value={row.error || 'No error stack captured.'} readOnly={true}/>
				</ErrorPart>
				: null}
		</DetailProcessBody>
	</DetailProcessContainer>;
};