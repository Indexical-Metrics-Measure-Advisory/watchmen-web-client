import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {FiltersEdit} from './filters-edit';
import {FiltersContainer} from './widgets';

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