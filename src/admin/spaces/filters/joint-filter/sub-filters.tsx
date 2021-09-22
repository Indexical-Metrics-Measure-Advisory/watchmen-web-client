import {ParameterCondition, ParameterJoint} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {v4} from 'uuid';
import {useFilterEventBus} from '../filter-event-bus';
import {FilterEventTypes} from '../filter-event-bus-types';
import {FilterEdit} from './filter-edit';

export const SubFilters = (props: {
	topic: Topic;
	joint: ParameterJoint;
}) => {
	const {joint, topic} = props;

	const {fire} = useFilterEventBus();
	const forceUpdate = useForceUpdate();

	// when sub filter removed, fire this event
	const onRemove = (filter: ParameterCondition) => () => {
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
			return <FilterEdit topic={topic} filter={filter}
			                   parentJoint={joint} onRemoveMe={onRemove(filter)}
			                   notifyChangeToParent={notifyChangeToParent}
			                   key={v4()}/>;
		})}
	</>;
};