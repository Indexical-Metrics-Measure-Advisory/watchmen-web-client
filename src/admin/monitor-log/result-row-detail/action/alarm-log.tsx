import {isAlarmLog, MonitorLogAction} from '@/services/data/admin/logs';
import {BodyLabel, BodyValue} from './widgets';

export const AlarmLog = (props: { log: MonitorLogAction }) => {
	const {log} = props;

	if (!isAlarmLog(log)) {
		return null;
	}

	const {conditionResult = true, value} = log;
	let displayValue;
	if (value === void 0) {
		displayValue = 'Not be logged';
	} else if (value == null) {
		displayValue = 'null';
	} else {
		displayValue = `${value}`;
	}

	return <>
		<BodyLabel>Alarmed</BodyLabel>
		<BodyValue emphasis={true}>{`${conditionResult}`}</BodyValue>
		{conditionResult
			? <>
				<BodyLabel>Value</BodyLabel>
				<BodyValue>{displayValue}</BodyValue>
			</>
			: null}
	</>;
};