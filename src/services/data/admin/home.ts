import {Apis, get} from '../apis';
import {fetchMockAdminDashboard} from '../mock/admin/mock-home';
import {ConnectedSpace} from '../tuples/connected-space-types';
import {Dashboard} from '../tuples/dashboard-types';
import {isMockService} from '../utils';

export interface AdminDashboard {
	dashboard?: Dashboard;
	connectedSpaces: Array<ConnectedSpace>;
}

export const fetchAdminDashboard = async (): Promise<AdminDashboard> => {
	if (isMockService()) {
		return await fetchMockAdminDashboard();
	} else {
		const {dashboard, connectedSpaces} = await get({api: Apis.DASHBOARD_FOR_ADMIN});
		const reportIds = dashboard ? ((dashboard as Dashboard).reports || []).map(r => r.reportId) : [];
		if (connectedSpaces) {
			(connectedSpaces as Array<ConnectedSpace>).forEach(connectedSpace => {
				connectedSpace.subjects = (connectedSpace.subjects || []).filter(subject => {
					// eslint-disable-next-line
					subject.reports = (subject.reports || []).filter(r => reportIds.some(reportId => reportId == r.reportId));
					return subject.reports.length !== 0;
				});
			});
		}

		return {
			dashboard,
			connectedSpaces: (connectedSpaces || []).filter((connectedSpace: ConnectedSpace) => {
				return connectedSpace.subjects && connectedSpace.subjects.length !== 0;
			})
		};
	}
};
