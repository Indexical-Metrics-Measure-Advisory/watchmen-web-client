import {AdminDashboard} from '../../admin/home';
import {ChartType} from '../../tuples/chart-types';
import {ConnectedSpace} from '../../tuples/connected-space-types';
import {Dashboard} from '../../tuples/dashboard-types';
import {ConstantParameter, ParameterJointType, ParameterKind} from '../../tuples/factor-calculator-types';
import {ReportIndicatorArithmetic} from '../../tuples/report-types';
import {getCurrentTime} from '../../utils';

export const fetchMockAdminDashboard = async (): Promise<AdminDashboard> => {
	return new Promise<AdminDashboard>((resolve) => {
		setTimeout(() => {
			resolve({
				dashboard: {
					dashboardId: '1',
					name: 'Sales Statistics',
					reports: [
						{
							reportId: '1',
							rect: {x: 32, y: 32, width: 480, height: 300}
						}
					],
					lastVisitTime: getCurrentTime(),
					createTime: getCurrentTime(),
					lastModified: getCurrentTime()
				} as Dashboard,
				connectedSpaces: [
					{
						connectId: '',
						name: '',
						spaceId: '',
						subjects: [{
							subjectId: '',
							name: '',
							reports: [
								{
									reportId: '1',
									name: '',
									indicators: [{
										columnId: '1',
										name: 'Column 1',
										arithmetic: ReportIndicatorArithmetic.COUNT
									}],
									dimensions: [],
									funnels: [],
									rect: {x: 320, y: 320, width: 480, height: 300},
									chart: {
										type: ChartType.COUNT
									},
									lastVisitTime: getCurrentTime(),
									createTime: getCurrentTime(),
									lastModified: getCurrentTime()
								}
							],
							dataset: {
								filters: {jointType: ParameterJointType.AND, filters: []},
								columns: [{
									columnId: '1',
									parameter: {kind: ParameterKind.CONSTANT, value: '1'} as ConstantParameter,
									alias: 'Column 1'
								}],
								joins: []
							},
							lastVisitTime: getCurrentTime(),
							lastModified: getCurrentTime(),
							createTime: getCurrentTime()
						}],
						isTemplate: false,
						lastVisitTime: getCurrentTime(),
						lastModified: getCurrentTime(),
						createTime: getCurrentTime()
					} as ConnectedSpace
				]
			});
		}, 500);
	});
};
