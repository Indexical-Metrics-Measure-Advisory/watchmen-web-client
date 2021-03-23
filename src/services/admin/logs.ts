import { fetchMockMonitorLogs } from '../mock/admin/mock-logs';
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

export interface MonitorLogRow {
	uid: string;
	pipelineId: string;
	topicId: string;
	status: MonitorLogStatus;
	startTime: string;
	completeTime: string;
	oldValue: any;
	newValue: any;
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
