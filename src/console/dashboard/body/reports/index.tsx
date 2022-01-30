import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Report} from '@/services/data/tuples/report-types';
import React, {useEffect, useState} from 'react';
import {cloneReport} from '../utils';
import {Controllers} from './controllers';
import {Funnels} from './funnels';
import {Palette} from './palette';

export const Reports = (props: {
	connectedSpaces: Array<ConnectedSpace>;
	dashboard: Dashboard;
	transient: boolean;
	removable: boolean;
}) => {
	const {connectedSpaces, dashboard, transient, removable} = props;

	// cloned reports, position and rect are replaced by dashboard data
	const [displayReports, setDisplayReports] = useState<Array<Report>>([]);
	useEffect(() => {
		const reportDefs = connectedSpaces.reduce((map, connectedSpace) => {
			connectedSpace.subjects.forEach(subject => (subject.reports || []).forEach(report => map.set(report.reportId, report)));
			return map;
		}, new Map<string, Report>());
		const displayReports = (dashboard.reports || []).map(dashboardReport => {
			const report = reportDefs.get(dashboardReport.reportId);
			if (report != null) {
				return {
					// serialize & deserialize for void change the stored funnels data in report definition
					...cloneReport(report),
					rect: dashboardReport.rect
				};
			} else {
				return null;
			}
		}).filter(x => !!x) as Array<Report>;
		setDisplayReports(displayReports);
	}, [connectedSpaces, dashboard.reports]);

	return <>
		<Palette dashboard={dashboard} reports={displayReports} removable={removable}/>
		<Funnels connectedSpaces={connectedSpaces} dashboard={dashboard} reports={displayReports}
		         transient={transient}/>
		<Controllers dashboard={dashboard} reports={displayReports} transient={transient}/>
	</>;
};