import {saveTokenIntoSession} from '../account';
import {Apis, get} from '../apis';
import {fetchMockSharedDashboard} from '../mock/share/mock-dashboard';
import {ConnectedSpace} from '../tuples/connected-space-types';
import {Dashboard, DashboardId} from '../tuples/dashboard-types';
import {Token} from '../types';
import {isMockService} from '../utils';

export interface SharedDashboard {
	dashboard: Dashboard;
	connectedSpaces: Array<ConnectedSpace>;
}

export const fetchSharedDashboard = async (dashboardId: DashboardId, token: Token): Promise<SharedDashboard> => {
	if (isMockService()) {
		return await fetchMockSharedDashboard(dashboardId, token);
	} else {
		const {dashboard, connectedSpaces} = await get({
			api: Apis.DASHBOARD_SHARE_GET,
			search: {dashboardId, token},
			auth: false
		});
		saveTokenIntoSession(token);
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
