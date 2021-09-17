import {isCopyToMemoryLog, MonitorLogAction} from '@/services/data/admin/logs';
import {
	PipelineStageUnitAction,
	SystemActionType
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isCopyToMemoryAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {CopyToMemoryAction} from '@/services/data/tuples/pipeline-stage-unit-action/system-actions-types';
import {isMockService} from '@/services/data/utils';
import {BodyLabel, BodyValue} from './widgets';

const redressAction = (action: any): CopyToMemoryAction => {
	return (isMockService()
		? {
			type: SystemActionType.COPY_TO_MEMORY,
			variableName: 'x',
			...action
		}
		: action) as CopyToMemoryAction;
};

export const CopyToMemoryLog = (props: {
	action: PipelineStageUnitAction;
	log: MonitorLogAction
}) => {
	const {log} = props;
	let {action} = props;
	action = redressAction(action);

	if (!isCopyToMemoryLog(log) || !isCopyToMemoryAction(action)) {
		return null;
	}

	const {value} = log;
	let displayValue;
	if (value === void 0) {
		displayValue = 'Not be logged';
	} else if (value == null) {
		displayValue = 'null';
	} else {
		displayValue = `${value}`;
	}

	return <>
		<BodyLabel>{action.variableName} ↢</BodyLabel>
		<BodyValue>{displayValue}</BodyValue>
	</>;
};