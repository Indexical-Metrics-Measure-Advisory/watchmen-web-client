import {isReadLog, MonitorLogAction} from '@/services/admin/logs';
import {
	PipelineStageUnitAction,
	ReadTopicActionType
} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isReadTopicAction} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {ReadRowAction, ReadTopicAction} from '@/services/tuples/pipeline-stage-unit-action/read-topic-actions-types';
import {isMockService} from '@/services/utils';
import {BodyLabel, BodyValue, ObjectValue} from './widgets';

const redressAction = (action: any): ReadTopicAction => {
	return (isMockService()
		? {
			type: ReadTopicActionType.READ_ROW,
			variableName: 'y',
			...action
		}
		: action) as ReadRowAction;
};

export const ReadActionLog = (props: {
	action: PipelineStageUnitAction;
	log: MonitorLogAction
}) => {
	const {log} = props;
	let {action} = props;
	action = redressAction(action);

	if (!isReadLog(log) || !isReadTopicAction(action)) {
		return null;
	}

	const {value, by} = log;
	let displayValue;
	if (value === void 0) {
		displayValue = 'Not be logged';
	} else if (value == null) {
		displayValue = 'null';
	} else {
		displayValue = JSON.stringify(value, null, 2);
	}

	const isObject = displayValue.startsWith('[') || displayValue.startsWith('{');

	return <>
		<BodyLabel>{action.variableName} ↢</BodyLabel>
		{isObject
			? <ObjectValue value={displayValue} readOnly={true}/>
			: <BodyValue>{displayValue}</BodyValue>}
		<BodyLabel>Matched By</BodyLabel>
		<BodyValue>{by || 'No be logged'}</BodyValue>
	</>;
};