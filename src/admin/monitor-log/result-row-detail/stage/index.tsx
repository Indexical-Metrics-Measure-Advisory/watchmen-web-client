import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {v4} from 'uuid';
import {ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL} from '../../../../basic-widgets/constants';
import {TooltipAlignment} from '../../../../basic-widgets/types';
import {MonitorLogStage} from '../../../../services/admin/logs';
import {PipelineStage} from '../../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '../../../../services/tuples/pipeline-stage-unit-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {DetailProcessUnit} from '../unit';
import {ExpandToggleButton, SectionTitle, TitleExecutionLabel, TitleLabel, TitleNameLabel} from '../widgets';
import {DetailProcessStageContainer} from './widgets';

export const DetailProcessStage = (props: {
	stage: PipelineStage;
	stageIndex: number;
	log: MonitorLogStage;
	topicsMap: Map<string, Topic>;
}) => {
	const {stage, stageIndex, log, topicsMap} = props;

	const [expanded, setExpanded] = useState(false);

	const onExpandToggleClicked = () => setExpanded(!expanded);

	const stageExecution = log.conditionResult || true;

	return <DetailProcessStageContainer>
		<SectionTitle>
			<TitleLabel>
				<TitleNameLabel># {stageIndex}. Stage Execution</TitleNameLabel>
				<TitleExecutionLabel data-ignored={!stageExecution}>{`${stageExecution}`}</TitleExecutionLabel>
			</TitleLabel>
			<ExpandToggleButton
				tooltip={{label: expanded ? 'Collapse' : 'Expand', alignment: TooltipAlignment.RIGHT, offsetX: 8}}
				onClick={onExpandToggleClicked}>
				<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_PANEL : ICON_EXPAND_PANEL}/>
			</ExpandToggleButton>
		</SectionTitle>
		{expanded
			? (log.units || []).map((unitLog, unitIndex) => {
				const unit: PipelineStageUnit = (stage.units || [])[unitIndex] || {};
				return <DetailProcessUnit unit={unit}
				                          stageIndex={stageIndex} unitIndex={unitIndex + 1}
				                          log={unitLog}
				                          topicsMap={topicsMap}
				                          key={unit.unitId || v4()}/>;
			})
			: null}
	</DetailProcessStageContainer>;
};