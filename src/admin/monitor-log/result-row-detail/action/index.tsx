import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL } from '../../../../basic-widgets/constants';
import { TooltipAlignment } from '../../../../basic-widgets/types';
import { MonitorLogAction } from '../../../../services/admin/logs';
import { PipelineStageUnitAction } from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { Topic } from '../../../../services/tuples/topic-types';
import { ExpandToggleButton, TitleExecutionLabel, TitleLabel, TitleNameLabel } from '../widgets';
import { ActionSectionTitle, DetailProcessActionBody, DetailProcessActionContainer } from './widgets';

export const DetailProcessAction = (props: {
	action: PipelineStageUnitAction;
	stageIndex: number;
	unitIndex: number;
	actionIndex: number;
	log: MonitorLogAction;
	topicsMap: Map<string, Topic>;
}) => {
	const { action, stageIndex, unitIndex, actionIndex, log } = props;

	const [ expanded, setExpanded ] = useState(true);

	const onExpandToggleClicked = () => setExpanded(!expanded);

	return <DetailProcessActionContainer>
		<ActionSectionTitle>
			<TitleLabel>
				<TitleNameLabel># {stageIndex}.{unitIndex}.{actionIndex} Action</TitleNameLabel>
				<TitleExecutionLabel>uid: {log.uid}</TitleExecutionLabel>
			</TitleLabel>
			<TitleLabel>
				<TitleNameLabel>Spent</TitleNameLabel>
				<TitleExecutionLabel>{log.completeTime || 0} ms</TitleExecutionLabel>
			</TitleLabel>
			<ExpandToggleButton
				tooltip={{ label: expanded ? 'Collapse' : 'Expand', alignment: TooltipAlignment.RIGHT, offsetX: 8 }}
				onClick={onExpandToggleClicked}>
				<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_PANEL : ICON_EXPAND_PANEL}/>
			</ExpandToggleButton>
		</ActionSectionTitle>
		<DetailProcessActionBody>

		</DetailProcessActionBody>
	</DetailProcessActionContainer>;
};