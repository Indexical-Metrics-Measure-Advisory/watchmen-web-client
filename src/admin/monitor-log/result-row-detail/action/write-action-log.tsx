import {isWriteLog, MonitorLogAction} from '@/services/data/admin/logs';
import {
	PipelineStageUnitAction,
	WriteTopicActionType
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {
	isWriteFactorAction,
	isWriteTopicAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {
	WriteFactorAction,
	WriteTopicAction
} from '@/services/data/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {isMockService} from '@/services/data/utils';
import {ImpactRows} from './impact-rows';
import {toDisplayBy, toDisplayValue} from './utils';
import {BodyLabel, BodyValue, ObjectValue} from './widgets';

const redressAction = (action: any): WriteTopicAction => {
	return (isMockService()
		? {
			type: WriteTopicActionType.WRITE_FACTOR,
			variableName: 'z',
			...action
		}
		: action) as WriteTopicAction;
};

export const WriteActionLog = (props: {
	action: PipelineStageUnitAction;
	log: MonitorLogAction,
	topicsMap: Map<string, Topic>
}) => {
	const {log, topicsMap} = props;
	let {action} = props;
	action = redressAction(action);

	if (!isWriteLog(log) || !isWriteTopicAction(action)) {
		return null;
	}

	const {value, by} = log;
	const displayValue = toDisplayValue(value);
	const displayBy = toDisplayBy(by);

	let target;
	const topic = topicsMap.get(action.topicId);
	target = topic?.name || '?';
	if (isWriteFactorAction(action)) {
		// eslint-disable-next-line
		const factor = topic?.factors.find(factor => factor.factorId == (action as WriteFactorAction).factorId);
		target += `.${factor?.label || factor?.name || '?'}`;
	}
	const valueIsObject = displayValue.startsWith('[') || displayValue.startsWith('{');
	const byIsObject = displayBy.startsWith('[') || displayBy.startsWith('{');

	return <>
		<ImpactRows log={log}/>
		<BodyLabel>Write To</BodyLabel>
		<BodyValue>{target}</BodyValue>
		<BodyLabel>Write Content</BodyLabel>
		{valueIsObject
			? <ObjectValue value={displayValue} readOnly={true}/>
			: <BodyValue>{displayValue}</BodyValue>}
		<BodyLabel>Matched By</BodyLabel>
		{byIsObject
			? <ObjectValue value={displayBy} readOnly={true}/>
			: <BodyValue>{by}</BodyValue>}
	</>;
};