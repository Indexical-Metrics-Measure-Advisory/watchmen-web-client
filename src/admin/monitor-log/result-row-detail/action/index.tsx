import {MonitorLogAction, MonitorLogStatus} from '@/services/data/admin/logs';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_COLLAPSE_PANEL, ICON_EXPAND_PANEL} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {ExpandToggleButton, TitleExecutionLabel, TitleLabel, TitleNameLabel} from '../widgets';
import {AlarmLog} from './alarm-log';
import {CopyToMemoryLog} from './copy-to-memory-log';
import {ReadActionLog} from './read-action-log';
import {
	ActionError,
	ActionSectionTitle,
	ActionStatus,
	ActionType,
	BodyLabel,
	DetailProcessActionBody,
	DetailProcessActionContainer
} from './widgets';
import {WriteActionLog} from './write-action-log';
import {WriteToExternalLog} from './write-to-external-log';

export const DetailProcessAction = (props: {
	action: PipelineStageUnitAction;
	stageIndex: number;
	unitIndex: number;
	actionIndex: number;
	log: MonitorLogAction;
	topicsMap: Map<string, Topic>;
}) => {
	const {action, stageIndex, unitIndex, actionIndex, log, topicsMap} = props;

	const [expanded, setExpanded] = useState(true);

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
				tooltip={{label: expanded ? 'Collapse' : 'Expand', alignment: TooltipAlignment.RIGHT, offsetX: 8}}
				onClick={onExpandToggleClicked}>
				<FontAwesomeIcon icon={expanded ? ICON_COLLAPSE_PANEL : ICON_EXPAND_PANEL}/>
			</ExpandToggleButton>
		</ActionSectionTitle>
		{expanded
			? <DetailProcessActionBody>
				<BodyLabel>Type:</BodyLabel>
				<ActionType>{action.type || log.type}</ActionType>
				<BodyLabel>Status:</BodyLabel>
				<ActionStatus>{log.status || 'done'}</ActionStatus>
				{log.status === MonitorLogStatus.ERROR
					? <>
						<BodyLabel>Error:</BodyLabel>
						<ActionError value={log.error} readOnly={true}/>
					</>
					: null}
				{log.status !== MonitorLogStatus.ERROR
					? <>
						<AlarmLog log={log}/>
						<CopyToMemoryLog action={action} log={log}/>
						<WriteToExternalLog action={action} log={log}/>
						<ReadActionLog action={action} log={log}/>
						<WriteActionLog action={action} log={log} topicsMap={topicsMap}/>
					</>
					: null}
			</DetailProcessActionBody>
			: null}
	</DetailProcessActionContainer>;
};