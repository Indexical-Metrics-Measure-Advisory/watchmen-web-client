import { isWriteLog, MonitorLogAction } from '../../../../services/admin/logs';
import {
	PipelineStageUnitAction,
	WriteTopicActionType
} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {
	isWriteFactorAction,
	isWriteTopicAction
} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {
	WriteFactorAction,
	WriteTopicAction
} from '../../../../services/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import { Topic } from '../../../../services/tuples/topic-types';
import { isMockService } from '../../../../services/utils';
import { ImpactRows } from './impact-rows';
import { BodyLabel, BodyValue, ObjectValue } from './widgets';

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
	const { log, topicsMap } = props;
	let { action } = props;
	action = redressAction(action);

	if (!isWriteLog(log) || !isWriteTopicAction(action)) {
		return null;
	}

	const { value, by } = log;
	let displayValue;
	if (value === void 0) {
		displayValue = 'Not be logged';
	} else if (value == null) {
		displayValue = 'null';
	} else {
		displayValue = JSON.stringify(value, null, 2);
	}

	let target;
	const topic = topicsMap.get(action.topicId);
	target = topic?.name || '?';
	if (isWriteFactorAction(action)) {
		// eslint-disable-next-line
		const factor = topic?.factors.find(factor => factor.factorId == (action as WriteFactorAction).factorId);
		target += `.${factor?.label || factor?.name || '?'}`;
	}
	const isObject = displayValue.startsWith('[') || displayValue.startsWith('{');

	return <>
		<ImpactRows log={log}/>
		<BodyLabel>Write To</BodyLabel>
		<BodyValue>{target}</BodyValue>
		<BodyLabel>Write Content</BodyLabel>
		{isObject
			? <ObjectValue value={displayValue} readOnly={true}/>
			: <BodyValue>{displayValue}</BodyValue>}
		<BodyLabel>Matched By</BodyLabel>
		<BodyValue>{by || 'No be logged'}</BodyValue>
	</>;
};