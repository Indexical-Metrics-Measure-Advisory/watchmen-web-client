import {isReadLog, MonitorLogAction} from '@/services/data/admin/logs';
import {
	PipelineStageUnitAction,
	ReadTopicActionType
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isReadTopicAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {
	ReadRowAction,
	ReadTopicAction
} from '@/services/data/tuples/pipeline-stage-unit-action/read-topic-actions-types';
import {isMockService} from '@/services/data/utils';
import {toDisplayBy, toDisplayValue} from './utils';
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
	const displayValue = toDisplayValue(value);
	const displayBy = toDisplayBy(by);

	const valueIsObject = displayValue.startsWith('[') || displayValue.startsWith('{');
	const byIsObject = displayBy.startsWith('[') || displayBy.startsWith('{');

	return <>
		<BodyLabel>{action.variableName} ↢</BodyLabel>
		{valueIsObject
			? <ObjectValue value={displayValue} readOnly={true}/>
			: <BodyValue>{displayValue}</BodyValue>}
		<BodyLabel>Matched By</BodyLabel>
		{byIsObject
			? <ObjectValue value={displayBy} readOnly={true}/>
			: <BodyValue>{by}</BodyValue>}
	</>;
};