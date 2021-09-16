import React, {useEffect, useState} from 'react';
import {LandscapeA3, LandscapeA4, PortraitA3, PortraitA4} from '@/basic-widgets/print-page-size';
import {Dashboard} from '@/services/tuples/dashboard-types';
import {useDashboardEventBus} from '../../dashboard-event-bus';
import {DashboardEventTypes} from '../../dashboard-event-bus-types';

export const PagePrintSize = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {on, off} = useDashboardEventBus();
	const [showPageSize, setShowPageSize] = useState(false);
	useEffect(() => {
		on(DashboardEventTypes.TOGGLE_PRINT_PAGE_SIZE, setShowPageSize);
		return () => {
			off(DashboardEventTypes.TOGGLE_PRINT_PAGE_SIZE, setShowPageSize);
		};
	}, [on, off]);
	useEffect(() => {
		setShowPageSize(false);
	}, [dashboard]);

	if (!showPageSize) {
		return null;
	}

	return <>
		<PortraitA4/>
		<LandscapeA4/>
		<PortraitA3/>
		<LandscapeA3/>
	</>;
};