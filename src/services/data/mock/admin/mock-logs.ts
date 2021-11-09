import dayjs from 'dayjs';
import {MonitorLogCriteria, MonitorLogRow, MonitorLogsDataPage, MonitorLogStatus} from '../../admin/logs';
import {generateUuid} from '../../tuples/utils';

export const fetchMockMonitorLogs = async (options: {
	criteria: MonitorLogCriteria;
	pageNumber?: number;
	pageSize?: number;
}): Promise<MonitorLogsDataPage> => {
	const {pageNumber, pageSize} = options;
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				data: new Array(100).fill(1).map(() => {
					return {
						uid: generateUuid(),
						traceId: generateUuid(),
						pipelineId: '1',
						topicId: '1',
						status: MonitorLogStatus.DONE,
						startTime: dayjs().format('YYYY/MM/DD HH:mm:ss.SSS'),
						completeTime: '' + Math.round(Math.random() * 1000)
					} as MonitorLogRow;
				}),
				pageCount: 2,
				itemCount: 101,
				pageNumber,
				pageSize
			} as MonitorLogsDataPage);
		}, 500);
	});
};
