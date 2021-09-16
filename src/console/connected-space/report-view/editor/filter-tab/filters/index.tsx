import React, {useEffect} from 'react';
import {FiltersEdit} from './filters-edit';
import {FiltersContainer} from './widgets';
import {Report} from '@/services/tuples/report-types';
import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {Subject} from '@/services/tuples/subject-types';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {useForceUpdate} from '@/basic-widgets/utils';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';

export const Filters = (props: { connectedSpace: ConnectedSpace; subject: Subject; report: Report; }) => {
	const {subject, report} = props;

	const {on, off} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ReportEditEventTypes.FILTER_CREATED, forceUpdate);
		on(ReportEditEventTypes.FILTER_DESTROYED, forceUpdate);
		return () => {
			off(ReportEditEventTypes.FILTER_CREATED, forceUpdate);
			off(ReportEditEventTypes.FILTER_DESTROYED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	if (!report.filters || !report.filters.filters || report.filters.filters.length === 0) {
		return null;
	}

	return <FiltersContainer>
		<FiltersEdit subject={subject} report={report}/>
	</FiltersContainer>;
};