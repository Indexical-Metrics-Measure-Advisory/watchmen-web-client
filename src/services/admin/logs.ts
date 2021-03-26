import { fetchMockMonitorLogs } from '../mock/admin/mock-logs';
import {
	PipelineStageUnitActionType,
	ReadTopicActionType,
	SystemActionType,
	WriteTopicActionType
} from '../tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { isMockService } from '../utils';

export interface MonitorLogCriteria {
	topicId?: string;
	pipelineId?: string;
	startDate?: string;
	endDate?: string;
}

export enum MonitorLogStatus {
	DONE = 'done',
	ERROR = 'error'
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

export interface ReadAction {
	type: ReadTopicActionType;
	value?: any;
	by: FindBy;
}

export interface WriteAction {
	type: WriteTopicActionType;
	value?: any;
	by?: FindBy;
}

export interface AlarmAction {
	type: SystemActionType.ALARM;
	conditionResult: boolean;
	value?: any
}

export interface CopyToMemoryAction {
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
	stages: Array<MonitorLogStage>
}

export type MonitorLogs = Array<MonitorLogRow>

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
		// REMOTE use real api
		return await fetchMockMonitorLogs(options);
	}
};
