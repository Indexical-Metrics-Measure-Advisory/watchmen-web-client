import React, {useEffect} from 'react';
import {TopFilterEdit} from './top-filter-edit';
import {FiltersEditContainer} from './widgets';
import {Report} from '@/services/tuples/report-types';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {useForceUpdate} from '@/basic-widgets/utils';
import {Subject} from '@/services/tuples/subject-types';

export const FiltersEdit = (props: { subject: Subject; report: Report; }) => {
	const {subject, report} = props;

	const {on, off} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ReportEditEventTypes.FILTER_ADDED, forceUpdate);
		on(ReportEditEventTypes.FILTER_REMOVED, forceUpdate);
		return () => {
			off(ReportEditEventTypes.FILTER_ADDED, forceUpdate);
			off(ReportEditEventTypes.FILTER_REMOVED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	return <FiltersEditContainer>
		<TopFilterEdit filter={report.filters!} subject={subject} report={report}/>
	</FiltersEditContainer>;
};