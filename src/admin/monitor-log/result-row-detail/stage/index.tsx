import {MonitorLogStage, MonitorLogUnit} from '@/services/data/admin/logs';
import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {PipelineStageUnit, PipelineStageUnitId} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {v4} from 'uuid';
import {DetailProcessUnit} from '../unit';
import {ExpandToggleButton, TitleExecutionLabel, TitleLabel, TitleNameLabel} from '../widgets';
import {DetailProcessStageContainer, StageSectionTitle} from './widgets';

type UnitLogs = { units: Array<JSX.Element>; index: number; lastUnitId?: PipelineStageUnitId };

export const DetailProcessStage = (props: {
	stage: PipelineStage;
	stageIndex: number;
	log: MonitorLogStage;
	topicsMap: Map<string, Topic>;
}) => {
	const {stage, stageIndex, log, topicsMap} = props;

	const [expanded, setExpanded] = useState(false);

	const onExpandToggleClicked = () => setExpanded(!expanded);

	const stageExecution = log.conditionResult ?? true;

	return <DetailProcessStageContainer>
		<StageSectionTitle>
			<TitleLabel>
				<TitleNameLabel># {stageIndex}. Stage Execution</TitleNameLabel>
				<TitleExecutionLabel data-ignored={!stageExecution}>{`${stageExecution}`}</TitleExecutionLabel>
				<TitleNameLabel>[{log.name || stage.name || 'Noname Stage'}]</TitleNameLabel>
			</TitleLabel>
			<ExpandToggleButton
				tooltip={{label: expanded ? 'Collapse' : 'Expand', alignment: TooltipAlignment.RIGHT, offsetX: 8}}
				onClick={onExpandToggleClicked}>
				<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_PANEL : ICON_EXPAND_PANEL}/>
			</ExpandToggleButton>
		</StageSectionTitle>
		{expanded
			? (log.units || []).reduce((logs, log: MonitorLogUnit) => {
				// eslint-disable-next-line
				if (logs.lastUnitId != null && logs.lastUnitId != log.unitId) {
					// move to next unit
					logs.index = logs.index + 1;
				}
				const unit: PipelineStageUnit = (stage.units || [])[logs.index] || {};
				logs.lastUnitId = log.unitId;
				logs.units.push(<DetailProcessUnit unit={unit}
				                                   stageIndex={stageIndex} unitIndex={logs.index + 1}
				                                   log={log}
				                                   topicsMap={topicsMap}
				                                   key={v4()}/>);
				return logs;
			}, {units: [], index: 0} as UnitLogs).units
			: null}
	</DetailProcessStageContainer>;
};