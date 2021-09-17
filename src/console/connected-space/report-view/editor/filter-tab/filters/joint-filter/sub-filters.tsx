import {Report, ReportFilter, ReportFilterJoint} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {v4} from 'uuid';
import {useFilterEventBus} from '../filter-event-bus';
import {FilterEventTypes} from '../filter-event-bus-types';
import {FilterEdit} from './filter-edit';

export const SubFilters = (props: {
	subject: Subject;
	report: Report;
	joint: ReportFilterJoint
}) => {
	const {subject, report, joint} = props;

	const {fire} = useFilterEventBus();
	const forceUpdate = useForceUpdate();

	// when sub filter removed, fire this event
	const onRemove = (filter: ReportFilter) => () => {
		forceUpdate();
		// delegate to parent
		fire(FilterEventTypes.FILTER_REMOVED, filter);
	};
	// when sub filter changed, fire this event
	const notifyChangeToParent = () => {
		// delegate to parent
		fire(FilterEventTypes.CONTENT_CHANGED, joint);
	};

	return <>
		{joint.filters.map(filter => {
			return <FilterEdit subject={subject} report={report} filter={filter}
			                   parentJoint={joint} onRemoveMe={onRemove(filter)}
			                   notifyChangeToParent={notifyChangeToParent}
			                   key={v4()}/>;
		})}
	</>;
};