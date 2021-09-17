import {Report, ReportFilter, ReportFilterJoint} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React, {useEffect} from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {FilterEventBusProvider, useFilterEventBus} from './filter-event-bus';
import {FilterEventTypes} from './filter-event-bus-types';
import {JointEdit} from './joint-filter/joint-edit';

const TopFilter = (props: { subject: Subject; report: Report; joint: ReportFilterJoint }) => {
	const {subject, report, joint} = props;

	const {fire: fireDef} = useReportEditEventBus();
	const {on, off} = useFilterEventBus();
	useEffect(() => {
		// catch event from the top level joint
		// delegate to subject definition
		const onJointChanged = () => {
			fireDef(ReportEditEventTypes.FILTER_CHANGED, report, joint);
		};
		const onExpressionChanged = () => {
			fireDef(ReportEditEventTypes.FILTER_CHANGED, report, joint);
		};
		const onFilterAdded = (subFilter: ReportFilter) => {
			fireDef(ReportEditEventTypes.FILTER_ADDED, report, subFilter);
		};
		const onFilterRemoved = (subFilter: ReportFilter) => {
			fireDef(ReportEditEventTypes.FILTER_REMOVED, report, subFilter);
			if (!report.filters || !report.filters.filters || report.filters.filters.length === 0) {
				delete report.filters;
				fireDef(ReportEditEventTypes.FILTER_DESTROYED, report);
			}
		};

		on(FilterEventTypes.JOINT_TYPE_CHANGED, onJointChanged);
		on(FilterEventTypes.FILTER_ADDED, onFilterAdded);
		on(FilterEventTypes.FILTER_REMOVED, onFilterRemoved);
		on(FilterEventTypes.CONTENT_CHANGED, onExpressionChanged);
		return () => {
			off(FilterEventTypes.JOINT_TYPE_CHANGED, onJointChanged);
			off(FilterEventTypes.FILTER_ADDED, onFilterAdded);
			off(FilterEventTypes.FILTER_REMOVED, onFilterRemoved);
			off(FilterEventTypes.CONTENT_CHANGED, onExpressionChanged);
		};
	}, [on, off, fireDef, joint, report]);

	return <JointEdit joint={joint} subject={subject} report={report}/>;
};

export const TopFilterEdit = (props: { subject: Subject; report: Report; filter: ReportFilterJoint; }) => {
	const {subject, report, filter} = props;

	return <FilterEventBusProvider>
		<TopFilter joint={filter} subject={subject} report={report}/>
	</FilterEventBusProvider>;
};