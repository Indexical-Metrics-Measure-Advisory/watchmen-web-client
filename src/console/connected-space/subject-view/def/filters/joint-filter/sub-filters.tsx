import { v4 } from 'uuid';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import {
	Subject,
	SubjectDataSetFilter,
	SubjectDataSetFilterJoint
} from '../../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { useFilterEventBus } from '../filter-event-bus';
import { FilterEventTypes } from '../filter-event-bus-types';
import { FilterEdit } from './filter-edit';

export const SubFilters = (props: {
	subject: Subject;
	joint: SubjectDataSetFilterJoint
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const { subject, joint, availableTopics, pickedTopics } = props;

	const { fire } = useFilterEventBus();
	const forceUpdate = useForceUpdate();

	// when sub filter removed, fire this event
	const onRemove = (filter: SubjectDataSetFilter) => () => {
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
			return <FilterEdit subject={subject} filter={filter}
			                   parentJoint={joint} onRemoveMe={onRemove(filter)}
			                   notifyChangeToParent={notifyChangeToParent}
			                   availableTopics={availableTopics} pickedTopics={pickedTopics}
			                   key={v4()}/>;
		})}
	</>;
};