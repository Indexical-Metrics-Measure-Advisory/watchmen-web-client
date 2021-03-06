import {Apis, post} from '../apis';
import {fetchMockMonitorLogs} from '../mock/admin/mock-logs';
import {
	PipelineStageUnitActionType,
	ReadTopicActionType,
	SystemActionType,
	WriteTopicActionType
} from '../tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isMockService} from '../utils';

export interface MonitorLogCriteria {
	topicId?: string;
	pipelineId?: string;
	startDate?: string;
	endDate?: string;
	status?: MonitorLogStatus;
}

export enum MonitorLogStatus {
	DONE = 'DONE',
	ERROR = 'ERROR',
}

export interface MonitorLogAction {
	uid: string;
	type: PipelineStageUnitActionType;
	status: MonitorLogStatus;
	completeTime: string;
	error?: string;
	insertCount: number;
	updateCount: number;
}

export type FindBy = any;

export interface ReadAction extends MonitorLogAction {
	type: ReadTopicActionType;
	value?: any;
	by: FindBy;
}

export interface WriteAction extends MonitorLogAction {
	type: WriteTopicActionType;
	value?: any;
	by?: FindBy;
}

export interface AlarmAction extends MonitorLogAction {
	type: SystemActionType.ALARM;
	conditionResult: boolean;
	value?: any;
}

export interface CopyToMemoryAction extends MonitorLogAction {
	type: SystemActionType.COPY_TO_MEMORY;
	value?: any;
}

export interface MonitorLogUnit {
	conditionResult: boolean;
	actions: Array<MonitorLogAction>;
}

export interface MonitorLogStage {
	conditionResult: boolean;
	units: Array<MonitorLogUnit>;
}

export interface MonitorLogRow {
	uid: string;
	pipelineId: string;
	topicId: string;
	status: MonitorLogStatus;
	startTime: string;
	completeTime: string;
	oldValue: any;
	newValue: any;
	conditionResult: boolean;
	stages: Array<MonitorLogStage>;
	error?: string;
}

export type MonitorLogs = Array<MonitorLogRow>;

export interface MonitorLogsDataPage {
	data: MonitorLogs;
	itemCount: number;
	pageNumber: number;
	pageSize: number;
	pageCount: number;
}

export const fetchMonitorLogs = async (options: {
	criteria: MonitorLogCriteria;
	pageNumber?: number;
	pageSize?: number;
}): Promise<MonitorLogsDataPage> => {
	if (isMockService()) {
		return await fetchMockMonitorLogs(options);
	} else {
		return post({
			api: Apis.QUERY_LOG,
			data: {
				criteria: options.criteria,
				pagination: {pageNumber: options.pageNumber, pageSize: options.pageSize}
			}
		});
	}
};

export const isAlarmLog = (log: MonitorLogAction): log is AlarmAction => {
	return log.type === SystemActionType.ALARM;
};
export const isCopyToMemoryLog = (log: MonitorLogAction): log is CopyToMemoryAction => {
	return log.type === SystemActionType.COPY_TO_MEMORY;
};
export const isReadLog = (log: MonitorLogAction): log is ReadAction => {
	return (
		ReadTopicActionType.EXISTS === log.type ||
		ReadTopicActionType.READ_ROW === log.type ||
		ReadTopicActionType.READ_FACTOR === log.type
	);
};
export const isWriteLog = (log: MonitorLogAction): log is WriteAction => {
	return (
		WriteTopicActionType.WRITE_FACTOR === log.type ||
		WriteTopicActionType.INSERT_ROW === log.type ||
		WriteTopicActionType.MERGE_ROW === log.type ||
		WriteTopicActionType.INSERT_OR_MERGE_ROW === log.type
	);
};
