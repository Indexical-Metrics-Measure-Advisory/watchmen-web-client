import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import React, {useEffect} from 'react';
import {useDashboardEventBus} from '../../dashboard-event-bus';
import {DashboardEventTypes} from '../../dashboard-event-bus-types';
import {DashboardNoData} from './widgets';

export const NoReportOrParagraph = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {on, off, fire} = useDashboardEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onChange = () => forceUpdate();
		on(DashboardEventTypes.REPORT_ADDED, onChange);
		on(DashboardEventTypes.REPORT_REMOVED, onChange);
		return () => {
			off(DashboardEventTypes.REPORT_ADDED, onChange);
			off(DashboardEventTypes.REPORT_REMOVED, onChange);
		};
	}, [forceUpdate, on, off, fire, dashboard]);

	const reports = dashboard.reports || [];
	const paragraphs = dashboard.paragraphs || [];

	if (reports.length !== 0 || paragraphs.length !== 0) {
		return null;
	}

	return <DashboardNoData><span>{Lang.CONSOLE.DASHBOARD.NO_REPORT}</span></DashboardNoData>;
};