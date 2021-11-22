import {MonitorLogUnit} from '@/services/data/admin/logs';
import {PipelineStageUnitAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {v4} from 'uuid';
import {DetailProcessAction} from '../action';
import {ExpandToggleButton, SectionTitle, TitleExecutionLabel, TitleLabel, TitleNameLabel} from '../widgets';
import {DetailProcessUnitContainer} from './widgets';

export const DetailProcessUnit = (props: {
	unit: PipelineStageUnit;
	stageIndex: number;
	unitIndex: number;
	log: MonitorLogUnit;
	topicsMap: Map<string, Topic>;
}) => {
	const {unit, stageIndex, unitIndex, log, topicsMap} = props;

	const [expanded, setExpanded] = useState(false);

	const onExpandToggleClicked = () => setExpanded(!expanded);

	const unitExecution = log.conditionResult ?? true;

	return <DetailProcessUnitContainer>
		<SectionTitle>
			<TitleLabel>
				<TitleNameLabel># {stageIndex}.{unitIndex}. Unit Execution</TitleNameLabel>
				<TitleExecutionLabel data-ignored={!unitExecution}>{`${unitExecution}`}</TitleExecutionLabel>
			</TitleLabel>
			<ExpandToggleButton
				tooltip={{label: expanded ? 'Collapse' : 'Expand', alignment: TooltipAlignment.RIGHT, offsetX: 8}}
				onClick={onExpandToggleClicked}>
				<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_PANEL : ICON_EXPAND_PANEL}/>
			</ExpandToggleButton>
		</SectionTitle>
		{expanded
			? (log.actions || []).map((actionLog, actionIndex) => {
				const action: PipelineStageUnitAction = (unit.do || [])[actionIndex] || {};
				return <DetailProcessAction action={action}
				                            stageIndex={stageIndex} unitIndex={unitIndex} actionIndex={actionIndex + 1}
				                            log={actionLog}
				                            topicsMap={topicsMap}
				                            key={action.actionId || v4()}/>;
			})
			: null}
	</DetailProcessUnitContainer>;
};