import { ChartType } from '../tuples/chart-types';
import { ParameterJointType } from '../tuples/factor-calculator-types';
import { Subject } from '../tuples/subject-types';
import { getCurrentTime } from '../utils';

export interface SharedSubject {
	subject: Subject;
}

export const fetchSharedSubject = async (subjectId: string): Promise<SharedSubject> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				subject: {
					subjectId: '1',
					name: 'Sales Statistics',
					reports: [ {
						reportId: '1',
						name: '',
						indicators: [],
						dimensions: [],
						rect: { x: 64, y: 64, width: 480, height: 300 },
						chart: {
							type: ChartType.COUNT
						},
						lastVisitTime: getCurrentTime(),
						createTime: getCurrentTime(),
						lastModifyTime: getCurrentTime()
					} ],
					dataset: {
						filters: { jointType: ParameterJointType.AND, filters: [] },
						columns: [],
						joins: []
					},
					lastVisitTime: getCurrentTime(),
					createTime: getCurrentTime(),
					lastModifyTime: getCurrentTime()
				} as Subject
			});
		}, 500);
	});
};