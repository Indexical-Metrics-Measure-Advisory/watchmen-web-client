import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {TopFilterEdit} from './top-filter-edit';
import {FiltersEditContainer} from './widgets';

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