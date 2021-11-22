import {Apis, post} from '../apis';
import {fetchMockMonitorLogs} from '../mock/admin/mock-logs';
import {PipelineStageId} from '../tuples/pipeline-stage-types';
import {
	PipelineStageUnitActionId,
	PipelineStageUnitActionType,
	ReadTopicActionType,
	SystemActionType,
	WriteTopicActionType
} from '../tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnitId} from '../tuples/pipeline-stage-unit-types';
import {PipelineId} from '../tuples/pipeline-types';
import {TopicId} from '../tuples/topic-types';
import {DateTime} from '../types';
import {isMockService} from '../utils';

export interface MonitorLogCriteria {
	topicId?: TopicId;
	pipelineId?: PipelineId;
	startDate?: string;
	endDate?: string;
	status?: MonitorLogStatus;
	traceId?: string;
}

export enum MonitorLogStatus {
	DONE = 'DONE',
	ERROR = 'ERROR',
}

export type MonitorLogActionId = string;

export interface MonitorLogAction {
	uid: MonitorLogActionId;
	actionId: PipelineStageUnitActionId;
	type: PipelineStageUnitActionType;
	status: MonitorLogStatus;
	completeTime: DateTime;
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

export interface WriteToExternalAction extends MonitorLogAction {
	type: SystemActionType.WRITE_TO_EXTERNAL;
	value?: any;
}

export interface MonitorLogUnit {
	unitId: PipelineStageUnitId;
	name: string;
	conditionResult: boolean;
	actions: Array<MonitorLogAction>;
}

export interface MonitorLogStage {
	stageId: PipelineStageId;
	name: string;
	conditionResult: boolean;
	units: Array<MonitorLogUnit>;
}

export interface MonitorLogRow {
	uid: string;
	traceId: string;
	pipelineId: PipelineId;
	topicId: TopicId;
	status: MonitorLogStatus;
	startTime: DateTime;
	completeTime: DateTime;
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
export const isWriteToExternalLog = (log: MonitorLogAction): log is WriteToExternalAction => {
	return log.type === SystemActionType.WRITE_TO_EXTERNAL;
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
